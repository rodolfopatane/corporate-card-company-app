import { ContractListService } from './contractListService'
import { useState } from 'react'
import { AddContract } from './AddContract';
import { IContractGroup } from '@entities/IContractGroup';
import { ContractGroup } from './ContractGroup';

let loaded = false;

export function ContractList() {

    const [contractList, setState] = useState<IContractGroup[]>([])
    const [showModal, setModalVisibility] = useState<boolean>(false)
    const contractListService = new ContractListService()

    if (!loaded) {
        loaded = true;
        contractListService.getContracts().then(contracts => {
            setState(contracts)
        })
    }
    const showAddContractPopup = () => {
        setModalVisibility(!showModal)
    }

    return (
        <div>
            <p>Contract List</p>
            {contractList.map(groupItem => {            
                return <ContractGroup key={groupItem.group} data={groupItem} />
            })}
            <button onClick={showAddContractPopup}>ADD</button>
            <div hidden={!showModal}>
                <AddContract setState={setState} />
            </div>

        </div>
    )
}