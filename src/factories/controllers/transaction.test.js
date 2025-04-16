import { CreateTransactionController } from '../../controllers'
import { makeCreateTransactionController } from './transaction'

describe('Transaction Controller Factorie', () => {
    it('should returns a valid CreateTransactionController instance', () => {
        expect(makeCreateTransactionController).toBeInstanceOf(
            CreateTransactionController,
        )
    })
})
