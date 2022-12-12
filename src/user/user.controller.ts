import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntities } from './entities/user.entities';
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

  @Get(':id')
  public async User(@Param() id: IUserEntities, @Res() res: Response) {
    try {
      const users = await this.userService.userId(id);
      return res.status(200).json(users);
    } catch (error) {
      return res.json(error);
    }
  }

  @Post('create/patient')
  public async createPatient(
    @Body() user: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const patient = await this.userService.createdPatient(user);

      return res.status(201).json(patient);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Post('create/doctor')
  public async createDoctor(
    @Body() doctor: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const createDoctor = await this.userService.createdDoctor(doctor);

      return res.status(201).json(createDoctor);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Put('edit/:id')
  public async updateUser(
    @Param() { id }: UpdateUserDto,
    @Body() { email, password }: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updatedUser({
        id,
        email,
        password,
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  @Delete('delete/:id')
  public async deleteUser(@Param() id: IUserEntities) {
    try {
      const user = await this.userService.deletedUser(id);
      return user;
    } catch (error) {
      return error;
    }
  }
}
