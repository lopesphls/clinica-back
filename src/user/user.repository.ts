import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntities } from './entities/user.entities';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getData() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        consultation: {
          select: {
            id: true,
            office: true,
            date: true,
            hours: true,
            minutes: true,
          },
        },
        patient: {
          select: {
            id: true,
            name: true,
            CPF: true,
          },
        },
        doctor: {
          select: {
            id: true,
            CRM: true,
            name: true,
            specialitys: true,
          },
        },
      },
    });
  }

  public async getDataById({ id }: IUserEntities) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          email: true,
          consultation: {
            select: {
              id: true,
              office: true,
              date: true,
              hours: true,
              minutes: true,
            },
          },
          patient: {
            select: {
              id: true,
              name: true,
              CPF: true,
            },
          },
          doctor: {
            select: {
              id: true,
              CRM: true,
              name: true,
              specialitys: true,
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  }

  public async createInDb({
    id,
    role,
    email,
    password,
    doctor,
    patient,
  }: IUserEntities) {
    try {
      if (role === Role.PATIENT) {
        return await this.prisma.user.create({
          data: {
            id,
            role,
            email,
            password,
            patient: {
              connectOrCreate: {
                where: { id: patient.id },
                create: {
                  id: patient.id,
                  CPF: patient.CPF,
                  name: patient.name,
                },
              },
            },
          },
          select: {
            patient: {
              select: {
                id: true,
                name: true,
                CPF: true,
              },
            },
            consultation: {
              select: {
                id: true,
                office: true,
                date: true,
                hours: true,
                minutes: true,
              },
            },
          },
        });
      } else if (role === Role.DOCTOR) {
        return await this.prisma.user.create({
          data: {
            id,
            role,
            email,
            password,
            doctor: {
              connectOrCreate: {
                where: { id: doctor.id },
                create: {
                  id: doctor.id,
                  CRM: doctor.CRM,
                  name: doctor.name,
                  specialitys: {
                    connectOrCreate: {
                      where: { name: doctor.specialitys.name },
                      create: {
                        id: doctor.specialitys.id,
                        name: doctor.specialitys.name,
                      },
                    },
                  },
                },
              },
            },
          },
          select: {
            doctor: {
              select: {
                id: true,
                CRM: true,
                name: true,
                specialitys: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                user: {
                  select: {
                    consultation: {
                      select: {
                        id: true,
                        office: true,
                        date: true,
                        hours: true,
                        minutes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }
    } catch (error) {
      return error;
    }
  }

  public async editUser({ id, email, password }: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { email, password },
        include: {
          doctor: true,
          patient: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  public async deleteUserData({ id }: IUserEntities) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
