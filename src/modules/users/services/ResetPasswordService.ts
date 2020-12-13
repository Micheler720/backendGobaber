import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('UserTokenRepository')
        private userTokensRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exist.');
        }
        const user = await this.usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError('User does not exist.');
        }
        user.password = await this.hashProvider.generatHash(password);

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        this.usersRepository.save(user);
    }
}
export default ResetPasswordService;
