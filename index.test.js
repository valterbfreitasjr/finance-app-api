function sum(a, b) {
    return a + b
}

describe('function sum', () => {
    it('should sum 2 numbers correctly', () => {
        //arrange
        const a = 2
        const b = 3

        //act
        const result = sum(a, b)

        //assert
        expect(result).toBe(5)
        expect(result).not.toBeNull()
        expect(result).not.toBeUndefined()
        expect(result).toBeGreaterThan(4)
    })

    it('should sum 2 numbers correctly', () => {
        //arrange
        const a = 1
        const b = 0

        //act
        const result = sum(a, b)

        //assert
        expect(result).toEqual(1)
    })
})
