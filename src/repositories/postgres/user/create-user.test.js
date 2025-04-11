import { userData } from '../../../tests/fixtures/user'
import { CreateUserRepository } from './create-user'

describe('Create User Repository', () => {
    it('should create a user on db successfully', async () => {
        const sut = new CreateUserRepository()

        const result = await sut.execute(userData)

        expect(result).not.toBeNull()
    })
})
