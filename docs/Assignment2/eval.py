import pandas as pd


scenarioRuns: pd.DataFrame = pd.read_csv(
    "C:\\Users\\User\\Downloads\\experiment_scenario_runs(2)"
)
scenarios: pd.DataFrame = pd.read_csv(
    "C:\\Users\\User\\Downloads\\experiment_scenarios(2)"
)

finalFrame: pd.DataFrame = pd.DataFrame(
    columns=[
        'experimentScenarioNo',
        'parameters',
        'nmrOfStockOuts',
        'lostSales',
        'serviceLevel',
        'totalInventoryCosts'
    ]
)

expNr: list[int] = scenarioRuns['experimentScenarioNo'].unique()

for nr in expNr:
    sel: pd.DataFrame = scenarioRuns.query('experimentScenarioNo ==' + str(nr))
    scenario = scenarios.query('experimentScenarioNo ==' + str(nr))['parameterValueCombination'].iloc[0]
    newLine = [[
        nr,
        scenario,
        sel['nmrOfStockOuts'].mean(),
        sel['lostSales'].mean(),
        sel['serviceLevel'].mean(),
        sel['totalInventoryCosts'].mean(),
    ]]
    tmpFrame = pd.DataFrame(
        newLine,
        columns=[
            'experimentScenarioNo',
            'parameters',
            'nmrOfStockOuts',
            'lostSales',
            'serviceLevel',
            'totalInventoryCosts'
        ]
    )
    finalFrame = pd.concat([finalFrame, tmpFrame], axis=0)

finalFrame.to_csv("eval_result.csv")

