import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';
import ynab from 'ynab';

import {importBudgets} from '../src/ynab-importer';

import * as mockBudgetsResp from '../__fixtures__/budgets.json';

jest.mock('ynab', () => {
    return {
        API: jest.fn()
    }
})
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

        await importBudgets()

        expect(mockedYnab.API).toHaveBeenCalledWith('some-token')
        expect(mockClient.budgets.getBudgets).toHaveBeenCalled()
    })
})
