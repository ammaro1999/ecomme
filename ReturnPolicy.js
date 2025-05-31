function ReturnPolicy() {
    try {
        const policies = [
            {
                title: "Return Window",
                content: "You have 30 days from the date of delivery to return your item. The product must be unused and in the same condition that you received it."
            },
            {
                title: "Eligible Items",
                content: "Most items are eligible for returns. However, certain products like personalized items, intimate goods, and perishables cannot be returned."
            },
            {
                title: "Return Process",
                steps: [
                    "Login to your account and go to your orders",
                    "Select the item you wish to return",
                    "Choose a return reason",
                    "Print the return shipping label",
                    "Pack the item securely",
                    "Drop off at any authorized shipping location"
                ]
            },
            {
                title: "Refund Process",
                content: "Once we receive your return, we'll inspect the item and process your refund within 5-7 business days. The refund will be issued to your original payment method."
            },
            {
                title: "Shipping Costs",
                content: "For defective items or incorrect shipments, we'll cover the return shipping costs. For other returns, shipping costs will be deducted from your refund unless otherwise specified."
            },
            {
                title: "Damaged Items",
                content: "If you receive a damaged item, please contact our customer service within 48 hours of delivery with photos of the damage."
            }
        ];

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="max-w-3xl space-y-8">
                            {policies.map((policy, index) => (
                                <div key={index} className="border-b pb-6 last:border-0">
                                    <h2 className="text-xl font-semibold mb-4">{policy.title}</h2>
                                    {policy.content && (
                                        <p className="text-gray-600 leading-relaxed">
                                            {policy.content}
                                        </p>
                                    )}
                                    {policy.steps && (
                                        <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                            {policy.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    )}
                                </div>
                            ))}

                            <div className="bg-blue-50 p-6 rounded-lg mt-8">
                                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                                <p className="text-gray-600 mb-4">
                                    Our customer service team is available 24/7 to assist you with returns.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a href="/contact" className="text-blue-500 hover:text-blue-600">
                                        <i className="fas fa-envelope mr-2"></i>
                                        Contact Support
                                    </a>
                                    <span className="text-gray-300">|</span>
                                    <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-600">
                                        <i className="fas fa-phone mr-2"></i>
                                        Call Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ReturnPolicy page error:', error);
        reportError(error);
        return null;
    }
}
export default ReturnPolicy;