'use strict';
var tracker = 0,
    results = {
      complexitate: 0,
      parametrii: {},
      iterații: []
    };

    function runSimulation(options) {
      var prop = 'Iterația ' + tracker,
          iteration = {},
          nationalIncome = 0,
          growthRate = parseFloat(1+options.g[parseInt(Math.floor(Math.random() * options.g.length))]).toFixed(2),
          maxPaymentRate = 0,
          inflationRate = 0;

      if(options.c) {
        switch(options.c) {
          case 3:
            results.complexitate = 3;

            results.parametrii = {
              'Valoarea inițială a venitului național': options.n,
              'Rată anuală de creștere': options.g,
              'Rata anuală de rambursare a datoriei naționale': options.k,
              'Rata inflației': options.f,
              'Numărul de iterații': options.i
            }
            break;

          case 2:
            results.complexitate = 2;

            results.parametrii = {
              'Valoarea inițială a venitului național': options.n,
              'Rată anuală de creștere': options.g,
              'Rata anuală de rambursare a datoriei naționale': options.k,
              'Numărul de iterații': options.i
            }
            break;

          default:
            results.complexitate = 1;

            results.parametrii = {
              'Valoarea inițială a venitului național': options.n,
              'Rată anuală de creștere': options.g,
              'Numărul de iterații': options.i
            }
            break;
        }

        delete options.c;

      }

      if(options.k) {
        maxPaymentRate = parseFloat(1-options.k[parseInt(Math.floor(Math.random() * options.k.length))]).toFixed(2);

        if(options.f) {
          inflationRate = parseFloat(1-options.f[parseInt(Math.floor(Math.random() * options.f.length))]).toFixed(2);
        }
      }

      if(options.i > 0) {
        if(tracker === 0) {
            iteration[prop] = parseFloat(options.n).toFixed(2);

            results.iterații.push(iteration);
            tracker++;

            return runSimulation(options);
        }

        if(results.complexitate === 3) {
          nationalIncome = parseFloat(((options.n*maxPaymentRate)*growthRate)*inflationRate).toFixed(2);

          iteration[prop] = nationalIncome;
          results.iterații.push(iteration);

          options.n = nationalIncome;
          tracker++;
          options.i--;

          return runSimulation(options);
        }else if(results.complexitate === 2) {
          nationalIncome = parseFloat((options.n*maxPaymentRate)*growthRate).toFixed(2);

          iteration[prop] = nationalIncome;
          results.iterații.push(iteration);

          options.n = nationalIncome;
          tracker++;
          options.i--;

          return runSimulation(options);
        }else{
          nationalIncome = parseFloat(options.n*growthRate).toFixed(2);

          iteration[prop] = nationalIncome;
          results.iterații.push(iteration);

          options.n = nationalIncome;
          tracker++;
          options.i--;

          return runSimulation(options);
        }
      }

      return results;
    };

    JSON.stringify(runSimulation({c: 1, n: 100, g: [-0.2, -0.15, -0.10, -0.05, 0.05, 0.10, 0.15, 0.20], i: 5}),null,'\t');
    JSON.stringify(runSimulation({c: 2, n: 100, g: [-0.2, -0.15, -0.10, -0.05, 0.05, 0.10, 0.15, 0.20], k: [0.01, 0.02, 0.03, 0.04, 0.05], i: 5}),null,'\t');
    JSON.stringify(runSimulation({c: 3, n: 100, g: [-0.2, -0.15, -0.10, -0.05, 0.05, 0.10, 0.15, 0.20], k: [0.01, 0.02, 0.03, 0.04, 0.05], f: [-0.03, -0.02, -0.01, 0, 0.01, 0.02, 0.03], i: 5}),null,'\t');
