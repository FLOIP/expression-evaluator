/**
 * Provides iteration of object-like expression values and just-in-time serialization
 */
export class MemberObject implements Iterable<any> {
	constructor(private data: Object) {}

	// when we iterate over this object, we want to grab the __value__
	// of any objects it has as children
	*iterator() {
		for (let item of Object.values(this.data)) {
			if (typeof item === 'object' && '__value__' in item) {
				yield item['__value__']
			} else {
				yield item
			}
		}
	}

	// we implement iterable so that we can handle expression objects
	// that are array-like
	[Symbol.iterator](): Iterator<any, any, undefined>  {
		return this.iterator()
	}

	public toString() {
		return JSON.stringify(this.data)
	}

	public toJSON() {
		return JSON.stringify(this.data)
	}

	get length(): number {
		return Object.keys(this.data).length
	}
}
