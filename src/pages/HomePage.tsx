import { Link } from 'react-router-dom'
import { SwapLabLogo } from '../img/Logo'
import { ArrowRight, Github, Beaker, Shield, Zap, BookOpen } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-950/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
                    <div className="text-center space-y-8">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800">
                                <SwapLabLogo />
                            </div>
                        </div>

                        <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            SwapLab
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            A learning-focused DEX interface for Sepolia testnet.
                            Experiment with token swaps in a safe environment.
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <Link to="/swap">
                                <Button size="lg" variant="primary">
                                    Start swapping
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="secondary" as={Link} to="https://github.com/RumenaStaneva/swaplab" target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5 mr-2" />
                                View on GitHub
                            </Button>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-900/20 border border-yellow-700 rounded-lg text-yellow-400 text-sm">
                            <Shield className="w-4 h-4" />
                            Sepolia Testnet — Not for real funds
                        </div>
                    </div>
                </div>
            </section>

            {/* What is SwapLab */}
            <section className="py-20 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">What is SwapLab?</h2>
                        <Card>
                            <p className="text-gray-300 leading-relaxed">
                                SwapLab is an educational DEX (Decentralized Exchange) interface built specifically
                                for learning and experimentation on Ethereum's Sepolia testnet. Unlike production DEXs,
                                SwapLab prioritizes clarity and understanding over feature completeness. It provides
                                a safe environment to learn about token swaps, slippage, and DeFi mechanics without
                                risking real assets.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-center">How it Works</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Beaker className="w-8 h-8" />,
                                title: 'Connect Wallet',
                                description: 'Link your MetaMask or compatible wallet to the Sepolia testnet',
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: 'Select Tokens',
                                description: 'Choose from available testnet tokens (RUMBA, PYUSD)',
                            },
                            {
                                icon: <ArrowRight className="w-8 h-8" />,
                                title: 'Configure Swap',
                                description: 'Set your amounts, slippage tolerance, and review the quote',
                            },
                            {
                                icon: <BookOpen className="w-8 h-8" />,
                                title: 'Execute & Learn',
                                description: 'Complete the swap and observe the transaction lifecycle',
                            },
                        ].map((step, index) => (
                            <Card key={index} className="text-center">
                                <div className="text-accent-400 mb-4 flex justify-center">{step.icon}</div>
                                <h3 className="font-bold mb-2 text-lg">{step.title}</h3>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why This Exists */}
            <section className="py-20 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why This Exists</h2>
                        <Card>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    DeFi can be intimidating. SwapLab was created to lower the barrier to entry by
                                    providing a focused, educational interface where users can:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="flex items-start">
                                        <span className="text-accent-400 mr-2">•</span>
                                        <span>Learn swap mechanics without financial risk</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-400 mr-2">•</span>
                                        <span>Understand concepts like slippage and price impact</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-400 mr-2">•</span>
                                        <span>Experiment with different transaction parameters</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-400 mr-2">•</span>
                                        <span>Build confidence before interacting with mainnet protocols</span>
                                    </li>
                                </ul>
                                <p className="pt-4 border-t border-gray-800">
                                    This is a learning tool, not a production application. All transactions occur on
                                    testnet with tokens that have no real-world value.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>SwapLab © 2026 • Educational purposes only • Sepolia testnet</p>
                </div>
            </footer>
        </div>
    )
}