import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptyHashProvider implements IHashProvider {
    public async generatHash(payload: string): Promise<string> {
        const hashed = await hash(payload, 8);
        return hashed;
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        const isValid = await compare(payload, hashed);
        return isValid;
    }
}
