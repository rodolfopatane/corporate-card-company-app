import { Header } from './pages/header/Header'
import { Company } from './pages/company/Company'
import { Auth } from '@lib/auth';

function App() {
  Auth.loadFromCache()
  return (
    <div>
      <Header />
      <Company />
    </div>
  )
}

export default App
