import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';

interface IRequest {
    user_id: string;
    old_password?: string;
    password?: string;
    name: string;
    email: string;
}
@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        password,
        old_password,
        name,
        email,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User alread, not possible update.', 401);
        }
        const userWithUpdateEmail = await this.usersRepository.findByEmail(
            email,
        );
        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError('E-mail already in use', 401);
        }

        user.name = name;
        user.email = email;
        if (password && !old_password) {
            throw new AppError(
                'You need to inform the old password to set a new password.',
                401,
            );
        }
        if (password && old_password) {
            const checkOldpassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );
            if (!checkOldpassword) {
                throw new AppError('Old password does not match.', 401);
            }
            user.password = await this.hashProvider.generatHash(password);
        }
        // await this.usersRepository.save(user);
        return this.usersRepository.save(user);
    }
}
export default UpdateProfileService;
