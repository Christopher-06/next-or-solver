const highs_settings = {
    // In node, locateFile is not needed
    // In the browser, point locateFile to the URL of the wasm file (see below)
    locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file //??
  };
  const highs_promise = require("highs")(highs_settings);
  
  const PROBLEM = `Maximize
   obj:
      x1 + 2 x2 + 4 x3 + x4
  Subject To
   c1: - x1 + 4 x2 + 70 x3 + 10 x4 <= 10
   c2: x1 - 4.2 x2 + x3 <= 660
   c3: x2 - 2.5 x4 = 0
  Bounds
   0 <= x1 <= 40
   2 <= x4 <= 3
  End`;
  
  const EXPECTED_SOLUTION = {
    Status: 'Optimal',
    ObjectiveValue: 87.5,
    Columns: {
      x1: {
        Index: 0,
        Status: 'BS',
        Lower: 0,
        Upper: 40,
        Type: 'Continuous',
        Primal: 17.5,
        Dual: -0,
        Name: 'x1'
      },
      x2: {
        Index: 1,
        Status: 'BS',
        Lower: 0,
        Upper: Infinity,
        Type: 'Continuous',
        Primal: 1,
        Dual: -0,
        Name: 'x2'
      },
      x3: {
        Index: 2,
        Status: 'BS',
        Lower: 0,
        Upper: Infinity,
        Type: 'Continuous',
        Primal: 16.5,
        Dual: -0,
        Name: 'x3'
      },
      x4: {
        Index: 3,
        Status: 'LB',
        Lower: 2,
        Upper: 3,
        Type: 'Continuous',
        Primal: 2,
        Dual: -8.75,
        Name: 'x4'
      }
    },
    Rows: [
      {
        Index: 0,
        Name: 'c1',
        Status: 'UB',
        Lower: -Infinity,
        Upper: 20,
        Primal: 20,
        Dual: 1.5
      },
      {
        Index: 1,
        Name: 'c2',
        Status: 'UB',
        Lower: -Infinity,
        Upper: 30,
        Primal: 30,
        Dual: 2.5
      },
      {
        Index: 2,
        Name: 'c3',
        Status: 'UB',
        Lower: 0,
        Upper: 0,
        Primal: 0,
        Dual: 10.5
      }
    ]
  };
  
  async function test() {
    const highs = await highs_promise;
    const sol = highs.solve(PROBLEM);
    console.log("Solution:", sol);
    require("assert").deepEqual(sol, EXPECTED_SOLUTION);
    console.log("Test passed!");
  }
  test();