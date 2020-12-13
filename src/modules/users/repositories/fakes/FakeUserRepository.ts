import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { v4 as uuid } from 'uuid';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUserRepository {
    public users: User[] = [];

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            userFind => user.id === userFind.id,
        );
        this.users[findIndex] = user;
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, userData);
        this.users.push(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => email === user.email);
        return findUser;
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = await this.users.find(user => user.id === id);
        return findUser;
    }

    public async findAllProvider({
        except_user_id,
    }: IFindAllProviderDTO): Promise<User[] | undefined> {
        const users = await this.users.filter(
            user => user.id !== except_user_id,
        );
        return users;
    }
}
export default FakeUsersRepository;
