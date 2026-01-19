import { useState } from 'react'
import { Filter } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import RecentActivity from '../components/swap/RecentActivity'
import { mockActivities } from '../mocks/mockActivity'

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
                <p className="text-gray-400">View your past swaps on Sepolia testnet</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by token or transaction hash..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <h2 className="font-semibold">All Transactions</h2>
                            <Badge>{mockActivities.length} total</Badge>
                        </div>

                        <RecentActivity activities={mockActivities} />
                    </div>
                </Card>

                <Card className="bg-gray-800/50">
                    <div className="text-sm text-gray-400 space-y-2">
                        <p className="font-medium text-gray-300">Note:</p>
                        <p>
                            Transaction history is currently mocked for demonstration purposes.
                            In a production environment, this would fetch real transaction data
                            from the blockchain using your connected wallet address.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}