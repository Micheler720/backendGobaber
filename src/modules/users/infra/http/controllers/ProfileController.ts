import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UserMap from '@modules/users/mappers/UserMap';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = container.resolve(ShowProfileService);
        const user_id = request.user.id;
        const user = await showProfile.execute({ user_id });
        const userMapped = await UserMap.toDTO(user);
        return response.json(userMapped).status(200);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;
        const updateProfile = container.resolve(UpdateProfileService);
        const user = await updateProfile.execute({
            email,
            name,
            user_id,
            old_password,
            password,
        });
        const userMapped = await UserMap.toDTO(user);
        return response.json(userMapped).status(200);
    }
}

export default ProfileController;
