function PrivacyPolicy() {
    try {
        const sections = [
            {
                title: "Information We Collect",
                content: [
                    "Personal identification information (Name, email address, phone number, etc.)",
                    "Shipping and billing address",
                    "Payment information",
                    "Device and browsing information",
                    "Purchase history and preferences"
                ]
            },
            {
                title: "How We Use Your Information",
                content: [
                    "Process your orders and provide customer service",
                    "Send transactional emails and order updates",
                    "Improve our website and services",
                    "Personalize your shopping experience",
                    "Send marketing communications (with your consent)"
                ]
            },
            {
                title: "Information Sharing",
                content: "We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website, conducting our business, or serving our users."
            },
            {
                title: "Data Security",
                content: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure."
            },
            {
                title: "Cookies and Tracking",
                content: "We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic."
            },
            {
                title: "Your Rights",
                content: [
                    "Access your personal information",
                    "Correct inaccurate data",
                    "Request deletion of your data",
                    "Object to data processing",
                    "Withdraw consent"
                ]
            }
        ];

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

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

                            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                                <p className="text-gray-600 mb-4">
                                    If you have any questions about our Privacy Policy, please contact us:
                                </p>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <i className="fas fa-envelope mr-2 text-blue-500"></i>
                                        privacy@estore.com
                                    </p>
                                    <p className="text-gray-600">
                                        <i className="fas fa-phone mr-2 text-blue-500"></i>
                                        +1 234 567 890
                                    </p>
                                    <p className="text-gray-600">
                                        <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                                        123 Privacy Street, Security City, 12345
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PrivacyPolicy page error:', error);
        reportError(error);
        return null;
    }
}
export default PrivacyPolicy;