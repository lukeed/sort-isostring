export default function (foo, bar) {
	var i=0, r=0;
	for (; i < bar.length; i++) {
		if (r = foo.charCodeAt(i) - bar.charCodeAt(i)) return r;
	}
	return r;
}
