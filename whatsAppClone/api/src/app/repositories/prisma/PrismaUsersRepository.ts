import { prisma } from '../../../database/client';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class PrismaUsersRepository implements IUsersRepository {
  async existingPhone(phone: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        phone
      }
    });

    return !!user;
  }

  async create({ phone, name }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        phone,
        name
      }
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({});
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { phone },
      select: {
        phone: true,
        id: true,
        name: true
      }
    });

    return user;
  }

  async update({ id, phone, name }: User): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        phone,
        name
      }
    });

    return user;
  }

  async delete(id: number): Promise<User | null> {
    const itemDeleted = null;

    await prisma.user.delete({
      where: { id: Number(id) }
    });

    return itemDeleted;
  }
}

export { PrismaUsersRepository };
