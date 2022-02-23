import SessionStorage from '../storage/storageService';

class AuthService {
    sessionStorage: SessionStorage;
    constructor() {
        this.sessionStorage = new SessionStorage();
    }
    isAuthenticated(): boolean {
        return true;
    }
    public validateToken(): boolean {        
        let data = this.sessionStorage.getSession('token')  ? true : false;
        return data
    }

    public decodeToken(): any {        
        const token = this.sessionStorage.getSession('token') 
        return JSON.parse(token);
    }

    public removeToken(key: string = 'token'): void {

        this.sessionStorage.removeSession(key)
    }

    public setToken(key: string, value: string): void {
        this.sessionStorage.setSession(key, value);
    }
}

export default AuthService;
