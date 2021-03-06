# ITMO course work

Written by Petr Baranov (P41081)

## Project description

Repository contains implementation of performance measurements for 3 STM frameworks:

- redux
- mobx
- reatom
  These solutions was chosen because of their popularity
  or different approaches for state update.

## Experiments measures

There are 21 experiments (5 for redux, 8 for mobx, 8 for reatom) demonstrating performance measurements (for start update and done update in store) in:

1. chart (with Vitory lib) (x-axis: start time; y-axis: spent time for update)
2. timings in performance tab (devtools)
3. console.log (for debug)

## Experiments description

All experiments are divided by separate branches

1. **redux/list**

   Application (redux) with list of 10 elements, being updated every 100ms

2. **redux/list-long-op**

   Application (redux) with list of 10 elements, being updated every 100ms with long operation updating state every 500ms

3. **redux/matrix**

   Application (redux) with matrix of 100x100 elements, being updated every 100ms

4. **redux/matrix-200x200**

   Application (redux) with matrix of 200x200 elements, being updated every 100ms

5. **redux/matrix-400x400**

   Application (redux) with matrix of 400x400 elements, being updated every 100ms

6. **mobx/list**

   Application (mobx) with list of 10 elements, being updated every 100ms

7. **mobx/list-long-op**

   Application (mobx) with list of 10 elements, being updated every 100ms with long operation updating state every 500ms

8. **mobx/matrix**

   Application (mobx) with matrix of 100x100 elements, being updated every 100ms

9. **mobx/matrix-200x200**

   Application (mobx) with matrix of 200x200 elements, being updated every 100ms

10. **mobx/matrix-400x400**

    Application (mobx) with matrix of 400x400 elements, being updated every 100ms

11. **mobx/matrix-substores**

    Application (mobx) with matrix of 100x100 elements and sub store for each element, being updated every 100ms

12. **mobx/matrix-substores-200x200**

    Application (mobx) with matrix of 200x200 elements and sub store for each element, being updated every 100ms

13. **mobx/matrix-substores-400x400**

    Application (mobx) with matrix of 400x400 elements and sub store for each element, being updated every 100ms

14. **reatom/list**

Application (reatom) with list of 10 elements, being updated every 100ms

15. **reatom/list-long-op**

Application (reatom) with list of 10 elements, being updated every 100ms with long operation updating state every 500ms

16. **reatom/matrix**

Application (reatom) with matrix of 100x100 elements, being updated every 100ms

17. **reatom/matrix-200x200**

Application (reatom) with matrix of 200x200 elements, being updated every 100ms

18. **reatom/matrix-400x400**

    Application (reatom) with matrix of 400x400 elements, being updated every 100ms

19. **reatom/matrix-dynamic-atoms**

    Application (reatom) with matrix of 100x100 elements and dynamic atom declaration for each element, being updated every 100ms

20. **reatom/matrix-dynamic-atoms-200x200**

    Application (reatom) with matrix of 200x200 elements and dynamic atom declaration for each element, being updated every 100ms

21. **reatom/matrix-dynamic-atoms-400x400**

    Application (reatom) with matrix of 400x400 elements and dynamic atom declaration for each element, being updated every 100ms

## Getting started

To run in **dev** mode, you can choose needed branch with experiment, then open this project in terminal and type

for yarn users:

```
yarn && yarn dev
```

for npm:

```
npm i && npm run dev
```
To run in **prod** mode, you can choose needed branch with experiment, then open this project in terminal and type

for yarn users:

```
yarn && yarn prod
```

for npm:

```
npm i && npm run prod
```

open your browser and go to

### http://localhost:3000

Click on _start_ button to start experiment, click on _stop_ button to stop and collect measure.

## Technical stack

Client application was developed with

- **Create React App** template
- **victory** library used for chart rendering
- written with **typescript**

Backend application developed with

- **NodeJs**
- **express**
- **Socket.io** for websockets transporting
