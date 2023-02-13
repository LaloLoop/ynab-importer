import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';
import * as ynab from 'ynab';

import {getBudgets} from '../src/ynab-client';

import * as mockBudgetsResp from '../__fixtures__/budgets.json';

jest.mock('ynab')
const mockedYnab = jest.mocked(ynab)


describe('ynab client', () => {

    const env = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = {...env}
        mockedYnab.API.mockClear()
    })

    afterEach(() => {
        process.env = env
    })

    test('gets budgets', async () => {

        const mockClient = {
            budgets: {
                getBudgets: jest.fn().mockImplementation(() => Promise.resolve(mockBudgetsResp))
            }
        } as unknown as jest.Mocked<ynab.api>

        mockedYnab.API.mockReturnValue(mockClient)

        process.env.ACCESS_TOKEN = 'some-token'

        const budgetsResp = await getBudgets()
        const budgets = budgetsResp.data.budgets

        expect(mockedYnab.API).toHaveBeenCalledWith('some-token')
        expect(mockClient.budgets.getBudgets).toHaveBeenCalled()

        expect(budgets.length).toEqual(2);
        expect(budgets[0].name).toEqual('México');
        expect(budgets[1].name).toEqual('Canada');
    })
})