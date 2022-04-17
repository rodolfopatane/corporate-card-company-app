import { Factory } from '@lib/factory'

export class AddContractService {
    public createContract(name: string, groupName: string): Promise<any> {
        if (!window.selectedAddress) throw new Error('Wallet disconnected')
        const factory = new Factory(window.ethereum)
        return factory.createContract(name, groupName, window.selectedAddress)
    }
}