import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not already.');
        }
        return user;
    }
}
export default ShowProfileService;
