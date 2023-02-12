import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';
import ynab from 'ynab';

import {importBudgets} from '../src/ynab-importer';

import * as mockBudgetsResp from '../__fixtures__/budgets.json';

jest.mock('ynab', () => {
    return {
        API: jest.fn().mockReturnValue({
            budgets: {
                getBudgets: async () => {
                    return Promise.resolve(
                        mockBudgetsResp
                    )
                }
            }
        })
    }
})
const mockedYnab = jest.mocked(ynab)


describe('ynab client', () => {

    const env = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = {...env}
    })

    afterEach(() => {
        process.env = env
    })

    test('gets budgets', async () => {

        process.env.ACCESS_TOKEN = 'some-token'

        await importBudgets()

        expect(mockedYnab.API).toHaveBeenCalledWith('some-token')
    })
})
