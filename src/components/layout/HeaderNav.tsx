import { Link, useLocation } from 'react-router-dom'
import { SwapLabLogo } from '../../img/Logo'
import Badge from '../ui/Badge'

export default function HeaderNav() {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-accent-400 hover:text-accent-300 transition-colors">
                        <SwapLabLogo />
                    </Link>

                    <nav className="flex items-center gap-1">
                        <Link
                            to="/swap"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/swap')
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                                }`}
                        >
                            Swap
                        </Link>
                    </nav>

                    <Badge variant="warning" className="hidden sm:inline-flex">
                        Sepolia Testnet
                    </Badge>
                </div>
            </div>
        </header>
    )
}