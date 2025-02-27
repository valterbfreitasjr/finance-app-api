import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const balance = await PostgresHelper.query(
            `
            SELECT
                SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) as earnings,
	            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expenses,
	            SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) as investments,
	            (
		            SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
		            - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
		            - SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
	            ) as balance
            FROM transactions
            WHERE user_id = $1;
            `,
            [userId],
        )

        return balance[0]
    }
}
