import { CreateUserController, GetUserByIdController } from '../../controllers'
import { makeCreateUserController, makeGetUserByIdController } from './user'

describe('User Controller Factorie', () => {
    it('should returns a valid CreateUserController instance', () => {
        expect(makeCreateUserController).toBeInstanceOf(CreateUserController)
    })

    it('should returns a valid GetUserByIdController instance', () => {
        expect(makeGetUserByIdController).toBeInstanceOf(GetUserByIdController)
    })
})
