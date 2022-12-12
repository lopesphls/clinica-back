import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UpdateDoctorDto } from 'src/doctor/dto/update-doctor.dto';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { DeleteSpecialityDto } from './dto/delete-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dt';
import { SpecialityService } from './speciality.service';

@ApiTags('Speciality')
@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get()
  public async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const doctorSpecialitys = await this.specialityService.allSpecialities();
      return res.json(doctorSpecialitys);
    } catch (error) {
      return console.error(error);
    }
  }

  @Post('/create')
  public async createSpeciality(
    @Body() name: CreateSpecialityDto,
    @Res() res: Response,
  ) {
    try {
      await this.specialityService.createSpeciality(name);
      return res.status(201).json('ok');
    } catch (error) {
      return res.json(error);
    }
  }

  @Put('edit/:id')
  public async updateSpeciality(
    @Param('id') { id }: UpdateDoctorDto,
    @Body() { name }: UpdateSpecialityDto,
    @Res() res: Response,
  ) {
    try {
      const doctor = await this.specialityService.updatedSpeciality({
        id,
        name,
      });
      return res.status(200).json(doctor);
    } catch (error) {
      return res.json(error);
    }
  }

  @Delete('/delete')
  public async deleteOneOrMore(
    @Body() name: DeleteSpecialityDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.specialityService.deleteSpeciality(name);

      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
  }
}
