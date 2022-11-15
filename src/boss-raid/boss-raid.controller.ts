import { Controller, Post, Body, Get, ParseIntPipe } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { EndBossRaidDto } from './dto/end-boss-raid';
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

  @Post('/end')
  public async end(@Body() endBossRaidDto: EndBossRaidDto) {
    return await this.bossRaidService.end(endBossRaidDto);
  }

  @Get('/topRankerList')
  public async ranking(@Body('userId', ParseIntPipe) userId: number) {
    return await this.bossRaidService.ranking(userId);
  }
}
