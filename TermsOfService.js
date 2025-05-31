function TermsOfService() {
    try {
        const sections = [
            {
                title: "Acceptance of Terms",
                content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
            },
            {
                title: "User Accounts",
                content: [
                    "You must be 18 years or older to create an account",
                    "You are responsible for maintaining the confidentiality of your account",
                    "You must provide accurate and complete information",
                    "You are responsible for all activities under your account"
                ]
            },
            {
                title: "Ordering and Payment",
                content: [
                    "All orders are subject to acceptance and availability",
                    "Prices are subject to change without notice",
                    "We accept major credit cards and other payment methods as specified",
                    "Payment must be received in full before order processing"
                ]
            },
            {
                title: "Shipping and Delivery",
                content: [
                    "Delivery times are estimates only",
                    "Risk of loss passes to you upon delivery",
                    "You must inspect packages upon delivery",
                    "Additional shipping charges may apply for certain locations"
                ]
            },
            {
                title: "Product Information",
                content: "We strive to provide accurate product information but do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
            },
            {
                title: "Intellectual Property",
                content: "All content on this website is our property or the property of our content suppliers and protected by international copyright laws."
            }
        ];

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="max-w-3xl">
                            <p className="text-gray-600 mb-8">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>

                            {sections.map((section, index) => (
                                <div key={index} className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                                    {Array.isArray(section.content) ? (
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            {section.content.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 leading-relaxed">
                                            {section.content}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div className="bg-yellow-50 p-6 rounded-lg mt-8">
                                <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
                                <p className="text-gray-600">
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. 
                                    Your continued use of the site following any changes indicates your acceptance of the new terms.
                                </p>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                                <p className="text-gray-600">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600">
                                        <i className="fas fa-envelope mr-2 text-blue-500"></i>
                                        legal@estore.com
                                    </p>
                                    <p className="text-gray-600">
                                        <i className="fas fa-phone mr-2 text-blue-500"></i>
                                        +1 234 567 890
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TermsOfService page error:', error);
        reportError(error);
        return null;
    }
}
export default TermsOfService;