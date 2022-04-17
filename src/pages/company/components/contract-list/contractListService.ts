import { IContract } from "@entities/IContract";
import { IContractGroup } from "@entities/IContractGroup"
import { Factory } from '@lib/factory'

export class ContractListService {
    constructor() { }

    public getContracts = async (): Promise<IContractGroup[]> => {
        const factory = new Factory(window.ethereum);
        const myGroups = await factory.myGroups();
        const contracts: IContractGroup[] = [];
        await Promise.all(
            myGroups.map(async groupName => {
                const contractList: IContract[] = []
                const _contracts = await factory.myContractsByGroup(groupName);
                _contracts.map((contractAddress) => {
                    contractList.push({
                        name: '',
                        address: contractAddress,
                        group: groupName,
                        tx: '',
                    })
                })
                contracts.push({ group: groupName, contractList });
            })
        )
        return contracts;
    }
}