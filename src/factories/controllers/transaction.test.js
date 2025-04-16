import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionByUserIdController,
    UpdateTransactionController,
} from '../../controllers'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
} from './transaction'

describe('Transaction Controller Factorie', () => {
    it('should returns a valid CreateTransactionController instance', () => {
        expect(makeCreateTransactionController).toBeInstanceOf(
            CreateTransactionController,
        )
    })

    it('should returns a valid UpdateTransactionController instance', () => {
        expect(makeUpdateTransactionController).toBeInstanceOf(
            UpdateTransactionController,
        )
    })

    it('should returns a valid DeleteTransactionController instance', () => {
        expect(makeDeleteTransactionController).toBeInstanceOf(
            DeleteTransactionController,
        )
    })

    it('should returns a valid GetTransactionByUserIdController instance', () => {
        expect(makeGetTransactionByUserIdController).toBeInstanceOf(
            GetTransactionByUserIdController,
        )
    })
})
