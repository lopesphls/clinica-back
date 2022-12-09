import { Body, Controller, Get, Res } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async allUsers(@Res() res: Response) {
    try {
      const users = await this.userService.allUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.json(error);
    }
  }

  @Post('create/patient')
  public async createPatient(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      return await this.userService.createdPatient(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Post('create/doctor')
  public async createDoctor(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      return await this.userService.createdDoctor(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
