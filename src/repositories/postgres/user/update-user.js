import { prisma } from '../../../../prisma/prisma.js'

export class UpdateUserRepository {
    async execute(userId, updateUserParams) {
        console.log(updateUserParams)
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        })
    }
}
