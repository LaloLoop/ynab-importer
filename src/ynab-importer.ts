import * as ynab from 'ynab';

import { PrismaClient } from '@prisma/client';

export const importBudgets = async (budgetsResp: ynab.BudgetSummaryResponse) =>{
    const prismaClient = new PrismaClient()

    const createdBudgets = []
    for (let budget of budgetsResp.data.budgets) {

        const createdBudget = prismaClient.budget.create({
            data: {
                id: budget.id,
                name: budget.name,
                first_month: budget.first_month!,
                last_modified_on: budget.last_modified_on!
            }
        })

        createdBudgets.push(createdBudget)
    }
};