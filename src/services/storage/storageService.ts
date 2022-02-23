import SessionStorage from './sessionStorage';
export default class StorageSession {
    protected sessionStorage: SessionStorage;

    constructor() {
        this.sessionStorage = new SessionStorage();
    }
    public getSession(key: string): any {
        const output = this.sessionStorage.get(key);
        return output != null ? output : '';
    }

    public setSession(key: string, value: any) {
        this.sessionStorage.set(key, value);
    }

    public removeSession(key: string): void {
        this.sessionStorage.remove(key);
    }

    public clearAllSession() {
        this.sessionStorage.clearAll();
    }
}
