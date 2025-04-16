import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers'
import {
    makeCreateUserController,
    makeDeleteUserController,
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

    it('should returns a valid DeleteUserController instance', () => {
        expect(makeDeleteUserController).toBeInstanceOf(DeleteUserController)
    })
})
