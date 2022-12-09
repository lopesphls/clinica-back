import { Injectable } from '@nestjs/common/decorators';
import { randomInt } from 'crypto';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { DeleteSpecialityDto } from './dto/delete-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dt';
import { ISpeciality } from './entities/speciality.entities';
import { SpecialityRepository } from './speciality.repository';

@Injectable()
export class SpecialityService {
  constructor(private readonly specialityRepository: SpecialityRepository) {}

  private _specialitysList: ISpeciality[] = [];

  public async allSpecialities() {
    const allSpeciality = await this.specialityRepository.getAll();
    return allSpeciality;
  }

  public async createSpeciality({ name }: CreateSpecialityDto) {
    try {
      const medicalSpecialty: ISpeciality = { id: `s-${randomInt(100, 1000)}`, name };
      return await this.specialityRepository.createSpeciality(medicalSpecialty);
    } catch (error) {
      return error;
    }
  }

  public async updatedSpeciality({ id, name }: UpdateSpecialityDto) {
    try {
      const allSpecialitys = await this.allSpecialities();
      let message;
      allSpecialitys.map(async el => {
        if (id === el.id && name !== el.name) {
          return await this.specialityRepository.updateSpeciality({ id, name });
        } else if (id !== el.id) {
          message = 'Id invalido';
          return message;
        } else if (name === el.name) {
          message = 'nome já alterado';
          return message;
        }
      });
    } catch (error) {
      return error;
    }
  }

  public async deleteSpeciality(result: DeleteSpecialityDto) {
    try {
      const allSpecialitys = await this.allSpecialities();

      const deleted = [];
      allSpecialitys.map(el => {
        for (const valor of result.name) {
          if (valor === el.name) {
            return deleted.push(valor);
          }
        }
      });
      return await this.specialityRepository.deleteSpeciality(deleted);
    } catch (error) {
      return error;
    }
  }
}
