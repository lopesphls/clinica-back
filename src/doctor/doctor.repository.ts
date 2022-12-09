import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IDoctorEntities } from './entities/doctor.entities';

@Injectable()
export class DoctorRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getAll() {
    return await this.prisma.doctor.findMany({
      include: { specialitys: true, Consultation: true, user: true },
    });
  }

  public async getById(id: string) {
    try {
      return await this.prisma.doctor.findUniqueOrThrow({
        where: { id },
        include: {
          specialitys: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  public async createDoctor({ specialitys, id, name, CRM, userId }: IDoctorEntities) {
    return await this.prisma.doctor.create({
      data: {
        id,
        name,
        CRM,
        userId,
        specialitys: {
          connectOrCreate: {
            where: { name: specialitys.name },
            create: { id: specialitys.id, name: specialitys.name },
          },
        },
      },
    });
  }

  public async updateDoctor({ id, name, specialitys, deleted }: UpdateDoctorDto) {
    try {
      await this.prisma.doctor.update({
        where: { id },
        data: {
          name,
          specialitys: {
            deleteMany: { name: { in: deleted } },
            connectOrCreate: {
              where: { name: specialitys.name },
              create: { id: specialitys.id, name: specialitys.name },
            },
          },
        },
        include: {
          specialitys: true,
          Consultation: true,
          user: true,
        },
      });
      return await this.getById(id);
    } catch (error) {
      return error;
    }
  }

  public async deleteDoctor({ id }: IDoctorEntities) {
    try {
      return await this.prisma.doctor.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
