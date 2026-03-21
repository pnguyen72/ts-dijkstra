import type { call, Fn } from "./function.d.ts";

export type min<
	arr extends unknown[],
	lt extends Fn<[unknown, unknown], boolean>,
> = arr extends [infer singleton]
	? singleton
	: arr extends [infer head, ...infer tail]
		? call<lt, [head, min<tail, lt>]> extends true
			? head
			: min<tail, lt>
		: never;

export type foldRight<
	f extends Fn<[unknown, unknown], unknown>,
	arr extends unknown[],
	acc,
> = arr extends [infer head, ...infer tail]
	? foldRight<f, tail, call<f, [head, acc]>>
	: acc;

export type filterMap<
	f extends Fn<unknown, unknown>,
	arr extends unknown[],
> = arr extends [infer head, ...infer tail]
	? call<f, head> extends infer result
		? result extends never
			? filterMap<f, tail>
			: [result, ...filterMap<f, tail>]
		: never
	: [];

export type map<
	f extends Fn<unknown, unknown>,
	arr extends unknown[],
> = arr extends [infer head, ...infer tail]
	? [call<f, head>, ...map<f, tail>]
	: [];
