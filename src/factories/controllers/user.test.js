import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers'
import {
    makeCreateUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './user'

describe('User Controller Factorie', () => {
    it('should returns a valid CreateUserController instance', () => {
        expect(makeCreateUserController).toBeInstanceOf(CreateUserController)
    })

    it('should returns a valid GetUserByIdController instance', () => {
        expect(makeGetUserByIdController).toBeInstanceOf(GetUserByIdController)
    })

    it('should returns a valid UpdateUserController instance', () => {
        expect(makeUpdateUserController).toBeInstanceOf(UpdateUserController)
    })
})
