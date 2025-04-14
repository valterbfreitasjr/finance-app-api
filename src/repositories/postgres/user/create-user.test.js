import { userData } from '../../../tests/fixtures/user'
import { CreateUserRepository } from './create-user'

describe('Create User Repository', () => {
    it('should create a user on db successfully', async () => {
        const sut = new CreateUserRepository()

        const result = await sut.execute(userData)

        expect(result.id).toBe(userData.id)
        expect(result.first_name).toBe(userData.first_name)
        expect(result.last_name).toBe(userData.last_name)
        expect(result.email).toBe(userData.email)
        expect(result.password).toBe(userData.password)
    })
})
