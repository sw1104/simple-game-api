import { Controller, Post, Body, Get } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { EnterBossRaidDto } from './dto/enter-boss-raid.dto';

@Controller('bossRaid')
export class BossRaidController {
  constructor(private readonly bossRaidService: BossRaidService) {}

  @Post('/enter')
  public async enter(@Body() enterBossRaidDto: EnterBossRaidDto) {
    return await this.bossRaidService.enter(enterBossRaidDto);
  }

  @Get()
  public async getStatus() {
    return await this.bossRaidService.getStatus();
  }
}
