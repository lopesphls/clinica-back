import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SpecialityModule } from 'src/speciality/speciality.module';
import { DoctorController } from './doctor.controller';
import { DoctorRepository } from './doctor.repository';
import { DoctorService } from './doctor.service';

@Module({
  imports: [SpecialityModule],
  controllers: [DoctorController],
  providers: [PrismaClient, DoctorRepository, DoctorService],
})
export class DoctorModule {}
