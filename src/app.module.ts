import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialityModule } from './speciality/speciality.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DoctorModule, SpecialityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
