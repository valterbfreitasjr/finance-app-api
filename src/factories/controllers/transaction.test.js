import {
    CreateTransactionController,
    UpdateTransactionController,
} from '../../controllers'
import {
    makeCreateTransactionController,
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
})
