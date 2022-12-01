import { CustomError } from '../../CustomError/CustomError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

interface IUserRequest {
  id?: number;
  phone: string;
  name: string;
}

class UserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async create({ phone, name }: IUserRequest) {
    const userPhoneAlreadyExists = await this.usersRepository.existingPhone(
      phone
    );

    if (userPhoneAlreadyExists) {
      throw new CustomError(401, { email: 'Phone already registred!' });
    }

    const userCreate = User.create({ phone, name });

    const user = await this.usersRepository.create(userCreate);

    return user;
  }

  public async findAll() {
    const user = await this.usersRepository.findAll();
    return user;
  }

  public async findById(id: number) {
    const user = await this.usersRepository.findById(id);

    if (user) {
      return user;
    } else {
      throw new CustomError(404, { message: 'User not found!' });
    }
  }

  public async delete(id: number) {
    if (!id) {
      throw new CustomError(404, { message: 'User not found!' });
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new CustomError(404, { message: 'User not found!' });
    }

    const userDeleted = await this.usersRepository.delete(id);

    return userDeleted;
  }
}

export { UserService };
