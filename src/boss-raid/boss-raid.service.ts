import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { IsNull, Repository } from 'typeorm';
import { EndBossRaidDto } from './dto/end-boss-raid';
import { EnterBossRaidDto } from './dto/enter-boss-raid.dto';
import { BossRaidEntity } from './entities/boss-raid.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { RankingInfo } from './interface/ranking-info.interface';

@Injectable()
export class BossRaidService {
  constructor(
    @InjectRepository(BossRaidEntity)
    private bossRaidRepository: Repository<BossRaidEntity>,
    private userService: UserService,
    private httpService: HttpService,
    @InjectRedis() private redis: Redis,
  ) {}
  public async enter(enterBossRaidDto: EnterBossRaidDto) {
    const user = await this.userService.userLookUp(enterBossRaidDto.userId);
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const isExistEnterUser = await this.bossRaidRepository.findOne({
      where: { endTime: IsNull() },
    });

    if (isExistEnterUser) return { isEntered: false };
    const nowTime = new Date();
    const data = this.bossRaidRepository.create({
      user,
      level: enterBossRaidDto.level,
      enterTime: nowTime,
    });

    await this.bossRaidRepository.save(data);

    return { isEntered: true, raidRecordId: data.user.id };
  }

  public async getStatus() {
    const raidEnterUser = await this.bossRaidRepository.findOne({
      where: { endTime: IsNull() },
      relations: ['user'],
    });
    if (!raidEnterUser) return { canEnter: true };

    return { canEnter: false, enteredUserId: raidEnterUser.user.id };
  }

  public async end(endBossRaidDto: EndBossRaidDto) {
    const raidEnterUser = await this.bossRaidRepository.findOne({
      where: { id: endBossRaidDto.raidRecordId, endTime: IsNull() },
      relations: ['user'],
    });

    if (!raidEnterUser)
      throw new BadRequestException('레이드 중인 유저가 아닙니다.');

    const bossData = await firstValueFrom(
      this.httpService.get(
        'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
      ),
    );

    const raidLimitTime = bossData.data.bossRaids[0].bossRaidLimitSeconds;
    const raidLevels = bossData.data.bossRaids[0].levels;
    const score = raidLevels[raidEnterUser.level]['score'];
    const totalScore = raidEnterUser.user.totalScore + score;

    const enterTime = raidEnterUser.enterTime;
    const nowTime = new Date();
    const time = (nowTime.getTime() - enterTime.getTime()) / 1000;

    if (time >= raidLimitTime) {
      await this.bossRaidRepository.update(endBossRaidDto.raidRecordId, {
        endTime: nowTime,
      });
      return { message: '시간 종료' };
    } else {
      await this.bossRaidRepository.update(endBossRaidDto.raidRecordId, {
        score: score,
        endTime: nowTime,
      });
      await this.userService.userTotalScore(raidEnterUser.user.id, totalScore);
      await this.redis.zadd('ranking', totalScore, raidEnterUser.user.id);
    }
  }

  public async ranking(userId: number) {
    const user = await this.userService.userLookUp(userId);
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const rankData = await this.redis.zrevrange('ranking', 0, -1, 'WITHSCORES');

    const myRanking = {
      ranking: await this.redis.zrevrank('ranking', userId),
      userId,
      totalScore: Number(await this.redis.zscore('ranking', userId)),
    };
    const topRanking = [];
    for (let i = 0; i < rankData.length; i++) {
      if (i % 2 === 0) {
        const rankingInfo: RankingInfo = {
          ranking: Math.floor(i / 2),
          userId: parseInt(rankData[i]),
          totalScore: 0,
        };
        topRanking.push(rankingInfo);
      } else {
        topRanking[Math.floor(i / 2)].totalScore = Number(rankData[i]);
      }
    }
    return { topRankerInfoList: topRanking, myRankingInfo: myRanking };
  }
}
