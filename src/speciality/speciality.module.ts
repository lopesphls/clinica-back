import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SpecialityController } from './speciality.controller';
import { SpecialityRepository } from './speciality.repository';
import { SpecialityService } from './speciality.service';

@Module({
  imports: [],
  controllers: [SpecialityController],
  providers: [SpecialityRepository, PrismaClient, SpecialityService],
})
export class SpecialityModule {}
