import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
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

    it('should returns a valid GetUserBalanceController instance', () => {
        expect(makeGetUserBalanceController).toBeInstanceOf(
            GetUserBalanceController,
        )
    })
})
