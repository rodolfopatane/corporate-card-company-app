import { useState } from 'react'
import { AuthService } from './authService'

export function Auth() {
    const [address, setState] = useState<string>(window.selectedAddress)
    const authService = new AuthService(setState);
    return (
        <div>
            <p>Account: {address}</p>
            <button onClick={authService.login} disabled={!!address}>Connect</button>
            <button onClick={authService.logout} disabled={!address}>Disconnect</button>
        </div>
    )
}