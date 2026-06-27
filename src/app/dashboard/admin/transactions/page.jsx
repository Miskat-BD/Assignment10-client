import { getAllTransaction } from "@/app/lib/api/transaction";

const AdminTransactionPage = async () => {
    const transactions = await getAllTransaction() || [];

    // 💰 সব ট্রানজেকশনের অ্যামাউন্ট যোগ করে টোটাল রেভিনিউ হিসাব করা
    const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);

    return (
        <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 rounded-3xl min-h-screen">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                        Transaction History
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Monitor all subscription payments, amounts, and user accounts.
                    </p>
                </div>
                
                {/* 💵 টোটাল রেভিনিউ এবং কাউন্টার ডিসপ্লে */}
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                        Total Revenue: ${totalRevenue.toFixed(2)}
                    </div>
                    <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                        Logs: {transactions.length}
                    </div>
                </div>
            </div>

            {/* 📊 Transaction Table */}
            {transactions.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm text-slate-500">
                    💳 No transactions recorded on the platform yet.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">User Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Session/Txn ID</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-center">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                                {transactions.map((txn) => {
                                    // ডেট ফরম্যাট করা (যেমন: Jun 26, 2026, 10:52 AM)
                                    const formattedDate = txn.paidAt 
                                        ? new Date(txn.paidAt).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                          })
                                        : "N/A";

                                    return (
                                        <tr key={txn._id} className="hover:bg-slate-50/50 transition-colors">
                                            {/* User Name (ইমেজ বা কাস্টম সার্কেল ছাড়া একদম ক্লিন টেক্সট) */}
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {txn.userName || "Unknown User"}
                                            </td>
                                            
                                            {/* User Email */}
                                            <td className="px-6 py-4 text-slate-600">{txn.userEmail || "N/A"}</td>
                                            
                                            {/* Stripe Session ID */}
                                            <td className="px-6 py-4 font-mono text-xs text-slate-400 max-w-[200px] truncate" title={txn.sessionId}>
                                                {txn.sessionId || "N/A"}
                                            </td>
                                            
                                            {/* Amount Badge */}
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/40">
                                                    ${txn.amount ? txn.amount.toFixed(2) : "0.00"}
                                                </span>
                                            </td>
                                            
                                            {/* Date */}
                                            <td className="px-6 py-4 text-slate-500 text-center whitespace-nowrap">
                                                {formattedDate}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTransactionPage;