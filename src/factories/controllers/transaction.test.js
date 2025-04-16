import {
    CreateTransactionController,
    DeleteTransactionController,
    UpdateTransactionController,
} from '../../controllers'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
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
})
