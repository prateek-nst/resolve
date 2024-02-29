export default class URI {
	constructor(url) {
		this.path = url;

		// it contains the dynamic components in the URL
		this.components = [];

		// it constains URL replaced with the dynamic components
		this.parsedURI = '';

		// boolean to determine, whether the URL is parsed or not.
		this.parsed = false;
		this.queryString = '';

		const matches = [...url.matchAll(/:([\w]+)/g)];

		for (const match of matches) {
			this.components.push(match[1]);
		}

		if (this.components.length === 0) {
			this.parsed = true;
			this.parsedURI = url;
		}
	}

	withPathVariable(obj) {
		if (this.components.length === 0) {
			return this;
		}

		let result = this.path;

		for (const comp of this.components) {
			if (!obj.hasOwnProperty(comp)) {
				throw new Error(`${comp} component not provided.`);
			}

			result = result.replace(`:${comp}`, obj[comp]);
		}

		this.parsedURI = result;
		this.parsed = true;

		return this;
	}

	withQueryParams(params) {
		if (!this.parsed) {
			throw new Error(
				'URI not parsed. This URI contains dynamic components which must be passed by calling withPathVariable() function',
			);
		}

		let queryString = '?';

		for (const [key, value] of Object.entries(params)) {
			queryString += `${key}=${encodeURIComponent(value)}&`;
		}

		this.queryString = queryString.slice(0, -1);

		return this;
	}

	toString() {
		return this.parsedURI + this.queryString;
	}
}
