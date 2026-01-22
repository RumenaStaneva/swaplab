// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Button from '../components/ui/Button'
import { SwapLabIcon } from '../img/Logo'

export default function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 blur-3xl opacity-30">
                            <div className="w-32 h-32 bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 rounded-full" />
                        </div>
                        <div className="relative animate-bounce">
                            <SwapLabIcon />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-100">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-400 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have swapped itself into the void.
                    </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md mx-auto">
                    <div className="flex items-start gap-3 text-left">
                        <Search className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-300">
                            <p className="font-medium mb-1">Looking for something specific?</p>
                            <p className="text-gray-400">
                                Try navigating to the swap page or check out our home page to learn more about SwapLab.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            <Home className="w-5 h-5 mr-2" />
                            Go Home
                        </Button>
                    </Link>
                    <Link to="/swap">
                        <Button variant="secondary" size="lg">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Go to Swap
                        </Button>
                    </Link>
                </div>

                <div className="pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-500 mb-3">Quick Links</p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <Link to="/" className="text-accent-400 hover:text-accent-300 transition-colors">
                            Home
                        </Link>
                        <Link to="/swap" className="text-accent-400 hover:text-accent-300 transition-colors">
                            Swap
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}