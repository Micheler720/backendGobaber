import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';
import { classToClass } from 'class-transformer';

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
        return response.status(200).json(classToClass(user));
    }
}
