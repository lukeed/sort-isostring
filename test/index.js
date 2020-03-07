import test from 'tape';
import sort from '../src';

test('exports', t => {
	t.is(typeof sort, 'function', 'exports function');
	t.end();
});


test('returns :: foo < bar', t => {
	let output = sort('2020-01-19', '2020-02-01');
	t.is(typeof output, 'number', 'returns a number');
	t.is(output, -1, '~> returns `-1` because foo < bar');
	t.end();
});


test('returns :: foo > bar', t => {
	let output = sort('2020-02-01', '2019-02-01');
	t.is(typeof output, 'number', 'returns a number');
	t.is(output, 1, '~> returns `1` because foo > bar');
	t.end();
});


test('returns :: foo == bar', t => {
	let output = sort('2020-02-01', '2020-02-01');
	t.is(typeof output, 'number', 'returns a number');
	t.is(output, 0, '~> returns `0` because foo > bar');
	t.end();
});


test('full :: foo < bar', t => {
	let date = new Date();
	let foo = date.toISOString();

	date.setDate(date.getDate() + 1);
	let bar = date.toISOString();

	let output = sort(foo, bar);
	t.is(output, -1);

	t.end();
});


test('full :: foo > bar', t => {
	let date = new Date();
	let bar = date.toISOString();

	date.setDate(date.getDate() + 1);
	let foo = date.toISOString();

	let output = sort(foo, bar);
	t.is(output, 1);

	t.end();
});


test('full :: foo == bar', t => {
	let date = new Date();
	let foo = date.toISOString();
	let bar = date.toISOString();

	let output = sort(foo, bar);
	t.is(output, 0);

	t.end();
});
