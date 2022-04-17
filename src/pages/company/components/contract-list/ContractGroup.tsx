import { IContractGroup } from "@entities/IContractGroup"
import { Contract } from "./Contract";
export type ContractGroupProps = {
    data: IContractGroup
}

export function ContractGroup(props: ContractGroupProps) {
    return (
        <div>
            <p>GroupName: {props.data.group}</p>
            <div>
                {props.data.contractList.map(contract => {
                    return <Contract key={contract.address} data={contract} />
                })}
            </div>
        </div>
    )
}