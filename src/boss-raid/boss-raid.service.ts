import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { IsNull, Repository } from 'typeorm';
import { EndBossRaidDto } from './dto/end-boss-raid';
import { EnterBossRaidDto } from './dto/enter-boss-raid.dto';
import { BossRaidEntity } from './entities/boss-raid.entity';

@Injectable()
export class BossRaidService {
  constructor(
    @InjectRepository(BossRaidEntity)
    private bossRaidRepository: Repository<BossRaidEntity>,
    private userService: UserService,
  ) {}
  public async enter(enterBossRaidDto: EnterBossRaidDto) {
    const user = await this.userService.userLookUp(enterBossRaidDto.userId);
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const isExistEnterUser = await this.bossRaidRepository.findOne({
      where: { endTime: IsNull() },
    });

    if (isExistEnterUser) return { isEntered: false };

    const data = this.bossRaidRepository.create({
      user,
      level: enterBossRaidDto.level,
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
}
