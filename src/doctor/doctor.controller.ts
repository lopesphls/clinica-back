import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IDoctorEntities } from './entities/doctor.entities';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @Get()
  public async getAllDoctors(@Res() res: Response) {
    try {
      const doctors = await this.doctorService.allDoctors();
      return res.send(doctors).status(200);
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  public async getDoctorById(@Param() { id }: IDoctorEntities, @Res() res: Response) {
    try {
      const doctor = await this.doctorService.doctorId(id);
      return res.json(doctor).status(200);
    } catch (error) {
      return res.json(error);
    }
  }

  @Post('/create')
  public async createDoctor(@Body() { name, specialitys, userId }: CreateDoctorDto, @Res() res: Response) {
    try {
      const doctor = await this.doctorService.createDoctor({ name, specialitys, userId });

      return res.status(201).json(doctor);
    } catch (error) {
      return console.log(error);
    }
  }

  @Put('edit/:id')
  public async updateDoctor(
    @Body() { name, specialitys, deleted }: UpdateDoctorDto,
    @Param() { id }: UpdateDoctorDto,
    @Res() res: Response,
  ) {
    try {
      const doctor = await this.doctorService.updatedDoctor({ id, name, specialitys, deleted });
      return res.status(200).json(doctor);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  @Delete('delete/:id')
  public async deleteDoctor(@Param() doctor: IDoctorEntities, @Res() res: Response) {
    try {
      await this.doctorService.deleteDoctor(doctor);
      return res.status(204).json('Doctor deletado com sucesso');
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
