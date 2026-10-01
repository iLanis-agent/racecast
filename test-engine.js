var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// calculate.studio table (Riegel 1981, exponent 1.06): 10K in 50:00 -> 5K 23:59, half 1:50:19, marathon 3:50:01
var t = E.parse('50:00'); eq(t, 3000, 'parse'); 
is(E.fmt(E.predict(t, 10, 5)), '23:59', '5K'); is(E.fmt(E.predict(t, 10, E.KM.half)), '1:50:19', 'half'); is(E.fmt(E.predict(t, 10, E.KM.full)), '3:50:01', 'full');
// 10K in 60:00 -> 5K 28:47, half 2:12:23 (the page text is cut at 2:12:2), marathon 4:36:01 by the same formula
t = E.parse('1:00:00'); is(E.fmt(E.predict(t, 10, 5)), '28:47', '5K 60'); is(E.fmt(E.predict(t, 10, E.KM.half)), '2:12:23', 'half 60');
// same distance returns the same time; longer distance is slower per km
eq(E.predict(1234, 10, 10), 1234, 'identity'); eq(E.pace(E.predict(3000, 10, 42.195), 42.195) > E.pace(3000, 10) ? 1 : 0, 1, 'slows');
// exponent 1 would be constant pace
eq(E.predict(3000, 10, 20, 1), 6000, 'e=1');
// parse
eq(E.parse('55:37'), 3337, 'mm:ss'); eq(E.parse('0:55:37'), 3337, 'h:mm:ss'); eq(E.parse('abc') === null ? 1 : 0, 1, 'bad'); eq(E.parse('') === null ? 1 : 0, 1, 'empty'); eq(E.parse('0:00') === null ? 1 : 0, 1, 'zero');
// fmt
is(E.fmt(3337), '55:37', 'fmt'); is(E.fmt(3661), '1:01:01', 'fmt h'); is(E.fmt(59.6), '1:00', 'round up');
// pace: 50:00 for 10K = 5:00 per km, 8:03 per mile
is(E.fmt(E.pace(3000, 10)), '5:00', 'km pace'); is(E.fmt(E.pace(3000, 10, true)), '8:03', 'mile pace');
eq(E.KM.half, 21.0975, 'half km'); eq(E.KM.full, 42.195, 'full km'); eq(E.KM['10mi'], 16.09344, '10mi');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
