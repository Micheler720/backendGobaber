import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';
import UserMap from '@modules/users/mappers/UserMap';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateServiceAvatar = container.resolve(UpdateUsersAvatarService);
        const user = await updateServiceAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        const userMapped = UserMap.toDTO(user);
        return response.status(200).json(userMapped);
    }
}
