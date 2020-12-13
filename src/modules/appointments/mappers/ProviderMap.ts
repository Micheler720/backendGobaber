import User from '@modules/users/infra/typeorm/entities/User';

class ProvidersMap {
    public static toDTO(users: User[]): Omit<User, 'password'>[] {
        const usersMapped = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar,
        }));
        return usersMapped;
    }
}

export default ProvidersMap;
