export interface Fn<arg = unknown, ret = unknown> {
	arg: arg;
	return: ret;
}

export type call<f extends Fn, arg> = (f & { arg: arg })["return"];
