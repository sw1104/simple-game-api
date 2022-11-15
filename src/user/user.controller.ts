import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create() {
    const data = await this.userService.create();
    return { userId: data };
  }

  @Get('/:id')
  public async lookUp(@Param('id') id: number) {
    const data = await this.userService.userLookUp(id);
    return { data };
  }
}
