import * as ynab from 'ynab';

export const getBudgets = async (): Promise<ynab.BudgetSummaryResponse> => {
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
        throw Error('Missing access token, please set the ACCESS_TOKEN env var');
    }

    const ynabAPI = new ynab.API(accessToken);
    const budgetsResponse = await ynabAPI.budgets.getBudgets();

    return budgetsResponse
};