import pandas as pd

results: pd.DataFrame = pd.read_csv('eval_result.csv')


min_stockOut: float = results['nmrOfStockOuts'].min()
min_lostSales: float = results['lostSales'].min()
max_serviceLevel: float = results['serviceLevel'].max()
min_costs: float = results['totalInventoryCosts'].min()

list_best: list = [
    min_stockOut,
    min_lostSales,
    max_serviceLevel,
    min_costs
]

print(list_best)

bestLines: pd.DataFrame = results.query(
    f'nmrOfStockOuts == {str(min_stockOut)} or '
    + f'lostSales == {min_lostSales} or '
    + f'serviceLevel == {max_serviceLevel} or '
    + f'totalInventoryCosts == {min_costs}'
)

overview = results.query(
    'serviceLevel >= 95.769 and totalInventoryCosts <= 37657.3479'
)

overview.sort_values(by='serviceLevel', inplace=True)

print(overview)

# print(bestLines.drop('Unnamed: 0', axis=1))
bestLines.drop('Unnamed: 0', axis=1).to_csv("bestLines.csv")
overview.drop('Unnamed: 0', axis=1).to_csv("overview.csv")