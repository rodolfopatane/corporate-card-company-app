import { Web3Integration } from './web3integration';

const STORAGE_NAME = 'selected_address';

export class Auth {
    static async login(provider: string) {
        const web3 = new Web3Integration(provider)
        const address = (await web3.getWalletPermission(provider))[0]
        window.selectedAddress = address;
        localStorage.setItem(STORAGE_NAME, address);
    }
    static async logout() {
        window.selectedAddress = '';
        localStorage.removeItem(STORAGE_NAME);
    }
    static loadFromCache() {
        const address = localStorage.getItem(STORAGE_NAME);
        if (address)
            window.selectedAddress = address
    }
}