import * as ynab from 'ynab';

export const importBudgets = async () => {
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
        throw Error('Missing access token, please set the ACCESS_TOKEN env var');
    }

    const ynabAPI = new ynab.API(accessToken);
    const budgetsResponse = await ynabAPI.budgets.getBudgets();
    const budgets = budgetsResponse.data.budgets;

    for (let budget of budgets) {
        console.log(`Budget Name: ${budget.name}`);
    }
};