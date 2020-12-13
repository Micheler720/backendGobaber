import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}
@injectable()
class UpdateUsersAvatarService {
    constructor(
        @inject('UsersInject')
        private usersRepository: IUserRepository,

        @inject('DiskStorage')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }
        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }
        await this.storageProvider.saveFile(avatarFileName);
        user.avatar = avatarFileName;
        await this.usersRepository.save(user);
        return user;
    }
}
export default UpdateUsersAvatarService;
