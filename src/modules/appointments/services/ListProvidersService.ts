import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.userRepository.findAllProvider({
            except_user_id: user_id,
        });
        if (!users) {
            throw new AppError('Providers not existing');
        }
        return users;
    }
}

export default ListProvidersService;
