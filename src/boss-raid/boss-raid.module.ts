import { Module } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { BossRaidController } from './boss-raid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidEntity } from './entities/boss-raid.entity';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TypeOrmModule.forFeature([BossRaidEntity]), UserModule, HttpModule],
  controllers: [BossRaidController],
  providers: [BossRaidService],
})
export class BossRaidModule {}
