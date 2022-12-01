import { User } from '../entities/User';

interface IUsersRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  existingPhone(phone: string): Promise<boolean>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<User | null>;
}

export { IUsersRepository };
