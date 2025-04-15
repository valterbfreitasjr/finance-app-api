export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`The transaction with ID: ${transactionId} was not found.`)
        this.name = 'TransactionNotFoundError'
    }
}
