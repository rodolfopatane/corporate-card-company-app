import { Auth } from './components/auth/Auth'
import { Logo } from './components/logo/Logo'

export function Header() {

  return (
    <header>
      <Logo />
      <Auth />
    </header>
  )
}