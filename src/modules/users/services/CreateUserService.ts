import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    password: string;
    email: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, password, email }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError(
                'Email already exists, it will not be possible to register. ',
                401,
            );
        }
        const hashedPassword = await this.hashProvider.generatHash(password);
        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');
        return user;
    }
}
export default CreateUserService;
