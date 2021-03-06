/*******************************************************
 Simulation Model
********************************************************/
sim.model.name = "Four-Serial-Machines-1";
sim.model.time = "continuous";
sim.model.timeUnit = "Day";

// model parameters
sim.model.p.manufacturingCostsPerOrder = 11;
sim.model.p.backlogCostsPerOrderAndTimeUnit = 0.1;
sim.model.p.revenuePerOrder = 15;

// processing network definition
sim.model.networkNodes = {
  "orderEntry": {typeName:"EntryNode", name:"orderEntry",
      arrivalRate: 3/3,  // on average, 3 orders every 3 days
      successorNodeName: "M1"},
  "M1": {typeName:"ProcessingNode", name:"M1",
      processingDuration: () => rand.triangular( 1, 3, 2),
      successorNodeName: "M2"},
  "M2": {typeName:"ProcessingNode", name:"M2",
      processingDuration: () => rand.triangular( 0.5, 1.5, 1),
      successorNodeName: "M3"},
  "M3": {typeName:"ProcessingNode", name:"M3",
      processingDuration: () => rand.triangular( 2, 4, 3),
      successorNodeName: "M4"},
  "M4": {typeName:"ProcessingNode", name:"M4",
      processingDuration: () => rand.triangular( 0.5, 1.5, 1.0),
      successorNodeName: "orderExit"},
  "orderExit": {typeName:"ExitNode", name:"orderExit",
    onDeparture: function (processingObject) {
      const backlogCostsPerOrder = sim.model.p.backlogCostsPerOrderAndTimeUnit *
          (sim.time - processingObject.arrivalTime);
      console.log()
      sim.stat.revenue += sim.model.p.revenuePerOrder;
      sim.stat.manufacturingCosts += sim.model.p.manufacturingCostsPerOrder;
      sim.stat.backlogCosts += backlogCostsPerOrder;
      return [];
    }}
};

/*******************************************************
 Default Simulation Scenario
 ********************************************************/
sim.scenario.durationInSimTime = 100;  // days
sim.scenario.title = "Default scenario.";

/*******************************************************
 Alternative Scenarios
 ********************************************************/
sim.scenarios[1] = {
  scenarioNo: 1,
  title: "Scenario with an additional worker at M1",
  description: `<p>Based on the default scenario, in this model variant an additional worker has been added to M1, 
       which decreases the processing time to Tri(0.5,1,1.5) and increases manufacturing costs by 0.75 cost units.</p>`,
  setupInitialState: function () {
    sim.scenario.networkNodes["M1"].duration = () => rand.triangular( 0.5, 1.5, 1);
    sim.model.p.manufacturingCostsPerOrder += 0.75;
  },
};
sim.scenarios[2] = {
  scenarioNo: 2,
  title: "Scenario with an additional worker at M2",
  description: `<p>Based on the default scenario, in this model variant an additional worker has been added to M2, 
  which decreases the processing time to Tri(0.25,0.5,0.25) and increases manufacturing costs by 0.75 cost units.</p>`,
  setupInitialState: function () {
    sim.scenario.networkNodes["M2"].duration = () => rand.triangular( 0.25, 0.5, 0.25);
    sim.model.p.manufacturingCostsPerOrder += 0.75;
  },
};
sim.scenarios[3] = {
  scenarioNo: 3,
  title: "Scenario with an improved new worker at M3",
  description: `<p>Based on the default scenario, in this model variant M3 was replaced by a more skilled one, 
  which decreases the processing time to Tri(1,1.5,2) and increases manufacturing costs by 0.25 cost units.</p>`,
  setupInitialState: function () {
    sim.scenario.networkNodes["M3"].duration = () => rand.triangular( 1, 2, 1.5);
    sim.model.p.manufacturingCostsPerOrder += 0.25;
  },
};
sim.scenarios[4] = {
  scenarioNo: 4,
  title: "Scenario with an improved new worker at M3 and 3/4 (orders/days)",
  description: `<<p>Based on the default scenario, in this model variant M3 was replaced by a more skilled one, 
  which decreases the processing time to Tri(1,1.5,2) and increases manufacturing costs by 0.25 cost units. 
  On average 3 orders are accepted every 4 days</p>`,
  setupInitialState: function () {
    sim.scenario.networkNodes["M3"].duration = () => rand.triangular( 1, 2, 1.5);
    sim.scenario.networkNodes["orderEntry"].arrivalRate = 3/4;
    sim.model.p.manufacturingCostsPerOrder += 0.25;
  },
};
sim.scenarios[5] = {
  scenarioNo: 5,
  title: "Scenario with an improved new worker at M3 and 3/5 (orders/days)",
  description: `<<p>Based on the default scenario, in this model variant M3 was replaced by a more skilled one, 
  which decreases the processing time to Tri(1,1.5,2) and increases manufacturing costs by 0.25 cost units. 
  On average 3 orders are accepted every 5 days</p>`,
  setupInitialState: function () {
    sim.scenario.networkNodes["M3"].duration = () => rand.triangular( 1, 2, 1.5);
    sim.scenario.networkNodes["orderEntry"].arrivalRate = 3/5;
    sim.model.p.manufacturingCostsPerOrder += 0.25;
  },
};
/*******************************************************
 Statistics variables
********************************************************/
sim.model.setupStatistics = function () {
  sim.stat.revenue = 0;
  sim.stat.manufacturingCosts = 0;
  sim.stat.backlogCosts = 0;
};
sim.model.computeFinalStatistics = function () {
  sim.stat.profit = sim.stat.revenue - (sim.stat.manufacturingCosts + sim.stat.backlogCosts);
};
