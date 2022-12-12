import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DoctorModule } from 'src/doctor/doctor.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DoctorModule],
  controllers: [UserController],
  providers: [UserRepository, UserService, PrismaClient],
})
export class UserModule {}
