const { Suite } = require('benchmark');
const sorter = require('../dist');

function pad(str) {
	return str + ' '.repeat(32 - str.length);
}

function naiive(foo, bar) {
	return +foo - +bar;
}

const date_strings = [
	'2012-01-02', '2020-03-07T05:51:07.746Z',
	'2020-01-19', '2020-03-07T05:50:41.107Z',
	'2020-03-07T05:50:48.726Z', '2001-12-31',
	'2002-03-07T05:51:07.746Z', '1990-02-01',
];

const date_values = date_strings.map(x => new Date(x));

new Suite()
	.on('cycle', e => {
		console.log('  ' + e.target);
	})
	.add(
		pad('Date[] -> Number'),
		() => date_values.slice().sort(naiive)
	)
	.add(
		pad('string[].map(Date) -> Number'),
		() => date_strings.map(x => new Date(x)).sort(naiive)
	)
	.add(
		pad('string[] -> sort-isostring'),
		() => date_strings.slice().sort(sorter)
	)
	.run();
