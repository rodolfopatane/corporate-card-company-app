import { IContract } from "@entities/IContract"

export type ContractProps = {
    data: IContract
}

export function Contract(props: ContractProps) {
    return (
        <div>
            <p>{props.data.address}</p>
        </div>
    )
}