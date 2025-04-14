import { prisma } from './prisma/prisma'

beforeEach(async () => {
    // A ordem deve ser de remoção da transaction primeiro para que seja possível a remoção do usuário
    prisma.transaction.deleteMany({})
    prisma.user.deleteMany({})
})
