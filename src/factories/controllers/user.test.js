import { CreateUserController } from '../../controllers'
import { makeCreateUserController } from './user'

describe('User Controller Factorie', () => {
    it('should returns a valid CreateUserController instance', () => {
        expect(makeCreateUserController).toBeInstanceOf(CreateUserController)
    })
})
