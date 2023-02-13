import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';
import { importBudgets } from '../src/ynab-importer';

import { PrismaClient } from '@prisma/client'

import * as mockBudgetsResp from '../__fixtures__/budgets.json';

jest.mock('@prisma/client');
const mockedPrismaClient = jest.mocked(PrismaClient);

describe('ynab importer', () => {
    test('store budgets in DB', () => {
        const createBudgetFunc = jest.fn()

        const mockCreate = {
            budget: {
                create: createBudgetFunc
            }
        };
        
        mockedPrismaClient.mockReturnValue(mockCreate as unknown as jest.Mocked<PrismaClient>)

        const budgets = mockBudgetsResp.data.budgets;
        
        createBudgetFunc.mockReturnValueOnce(budgets[0]).mockReturnValueOnce(budgets[1]);

        importBudgets(mockBudgetsResp);

        expect(createBudgetFunc).toHaveBeenCalledTimes(2)

        for (const [idx, budget] of budgets.entries()) {
            const budgetInput = {
                data: {
                    id: budget.id,
                    name: budget.name,
                    first_month: budget.first_month,
                    last_modified_on: budget.last_modified_on
                }
            }
            expect(createBudgetFunc).toHaveBeenNthCalledWith(idx + 1, budgetInput)
        }
    })
})