import { CompanyDetail } from './components/company-detail/CompanyDetail';
import { ContractList } from './components/contract-list/ContractList';

export function Company() {
    return (
        <div>
            <CompanyDetail />
            <ContractList />
        </div>
    )
}