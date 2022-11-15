import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async create() {
    const user = this.userRepository.create();
    await this.userRepository.save(user);
    return user.id;
  }

  public async userLookUp(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['bossRaid'],
    });
    if (!user) throw new BadRequestException('존재하지 않는 유저 입니다.');
    return user;
  }

  public async userTotalScore(id: number, totalScore: number) {
    await this.userRepository.update(id, { totalScore });
  }
}
