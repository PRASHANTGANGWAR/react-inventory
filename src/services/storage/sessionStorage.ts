export default class SessionStorage {
    constructor() {}
    public get(key: string): any {
        let output = window.sessionStorage.getItem(key);
        // console.log('output', output);
        // let outputValue = output != null ? output : '';
        return output ;
    }

    public set(key: string, value: any) {
        // let strValue = JSON.stringify(value);
        window.sessionStorage.setItem(key, value);
    }

    public remove(key: string): void {
        window.sessionStorage.removeItem(key);
    }

    public clearAll() {
        window.sessionStorage.clear();
    }
}
