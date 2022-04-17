import { IContract } from "@entities/IContract"
import { AddContractService } from './addContractService'
import { ContractListService } from "./contractListService"

type AddContractProps = {    
    setState: Function
}
export function AddContract(props: AddContractProps) {
    const newContract = async (event: any) => {
        event.preventDefault();
        const groupName = event.target.groupName.value
        const name = event.target.name.value
        const addContractService = new AddContractService()
        await addContractService.createContract(name, groupName)
        const contractListService = new ContractListService()
        props.setState(await contractListService.getContracts())
    }
    return (
        <div>
            <form onSubmit={newContract}>
                <div>
                    <label>Contract Name</label>
                    <input type="text" name="name"></input>
                </div>
                <div>
                    <label>Group Name</label>
                    <input type="text" name="groupName"></input>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}