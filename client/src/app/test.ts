export class Test {
    id: number;
    name: string;
    constructor(parameters?: Partial<Test>) {
        Object.assign(this, parameters);
    }
}
