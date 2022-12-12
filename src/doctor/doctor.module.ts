import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DoctorController } from './doctor.controller';
import { DoctorRepository } from './doctor.repository';
import { DoctorService } from './doctor.service';

@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [PrismaClient, DoctorRepository, DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
