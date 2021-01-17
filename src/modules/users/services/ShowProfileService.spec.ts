import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let userRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileUser', () => {
    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(userRepository);
    });

    it('shoul be able find this user', async () => {
        const findById = jest.spyOn(userRepository, 'findById');
        const user = await userRepository.create({
            email: 'teste@teste.com.br',
            name: 'MIchele de Freitas Ribeiro',
            password: '1234560',
        });
        const showUser = await showProfile.execute({ user_id: user.id });

        expect(showUser).toHaveProperty('email');
        expect(findById).toHaveBeenCalledWith(user.id);
    });

    it('shoul be able not find this user already', async () => {
        await expect(
            showProfile.execute({ user_id: 'no-existing-id' }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
