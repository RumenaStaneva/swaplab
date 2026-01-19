import { Outlet } from 'react-router-dom'
import HeaderNav from './HeaderNav'

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-950">
            <HeaderNav />
            <main>
                <Outlet />
            </main>
        </div>
    )
}