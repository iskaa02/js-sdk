
export default class ViewRecord {
    constructor(data: { [key: string]: any } = {}) {
        this.load(data || {});
    }

    [key: string]: any,

    /**
     * @inheritdoc
     */
    load(data: { [key: string]: any }) {
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }
    clone(): ViewRecord {
        return new (this.constructor as any)(JSON.parse(JSON.stringify(this)));
    }

    /**
     * Exports all model properties as a new plain object.
     */
    export(): { [key: string]: any } {
        return Object.assign({}, this);
    }
}
