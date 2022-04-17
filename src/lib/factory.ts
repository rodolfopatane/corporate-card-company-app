import { Web3Integration } from './web3integration';

import { abi } from "./factoryAbi.json";
const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS

export class Factory {
    private web3
    constructor(private provider: string) {
        this.web3 = new Web3Integration(this.provider)        
    }

    createContract = async (name: string, groupName: string, ownerAddres: string): Promise<string> => {
        const tx = await this.web3.sendTransaction(this.provider, abi, factoryAddress, ownerAddres, 'createContract', name, groupName)
        return tx
    }

    myGroups = async (): Promise<string[]> => {        
        return await this.web3.call(abi, factoryAddress, window.selectedAddress, 'myGroups')
    }

    myContractsByGroup = async (groupName: string): Promise<string[]> => {
        return this.web3.call(abi, factoryAddress, window.selectedAddress, 'myContractsByGoup', groupName)
    }
}