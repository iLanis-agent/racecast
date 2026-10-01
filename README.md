# RaceCast

Race time predictor from one recent result.

T2 = T1 x (D2 / D1)^1.06 (Riegel, American Scientist, 1981). Distances: 5 km, 10 km, 10 mi (16.09344 km), half 21.0975 km, marathon 42.195 km.

Tests match the published table at https://calculate.studio/en/fitness/running/marathon-time-predictor (10K 50:00 -> 5K 23:59, half 1:50:19, marathon 3:50:01; 10K 60:00 -> 5K 28:47).
Predictions assume matching training for the target distance; marathon predictions from short races run optimistic.

Static client-side. `node test-engine.js` runs the tests.
