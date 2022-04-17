import { Auth } from "@lib/auth";

export class AuthService {
    constructor(private setState: Function) { }
    login = async () => {
        await Auth.login(window.ethereum)
        this.setState(window.selectedAddress)
    }
    logout = async () => {
        await Auth.logout()
        this.setState(window.selectedAddress)
    }
}