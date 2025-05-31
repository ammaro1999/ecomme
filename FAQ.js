function FAQ() {
    try {
        const faqs = [
            {
                category: "Orders",
                questions: [
                    {
                        q: "How do I track my order?",
                        a: "You can track your order by logging into your account and visiting the order history section. Click on the specific order to view its current status and tracking information."
                    },
                    {
                        q: "Can I modify my order?",
                        a: "Orders can be modified within 1 hour of placement. After that, please contact customer service for assistance."
                    },
                    {
                        q: "What payment methods do you accept?",
                        a: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers."
                    }
                ]
            },
            {
                category: "Shipping",
                questions: [
                    {
                        q: "How long does shipping take?",
                        a: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery."
                    },
                    {
                        q: "Do you ship internationally?",
                        a: "Yes, we ship to over 100 countries. International shipping typically takes 7-14 business days."
                    },
                    {
                        q: "Is shipping free?",
                        a: "We offer free standard shipping on orders over $100. Otherwise, shipping costs are calculated at checkout."
                    }
                ]
            },
            {
                category: "Returns",
                questions: [
                    {
                        q: "What is your return policy?",
                        a: "We offer a 30-day return policy for most items. Products must be unused and in original packaging."
                    },
                    {
                        q: "How do I return an item?",
                        a: "Login to your account, go to order history, select the item to return, and follow the return instructions. We'll provide a return shipping label."
                    },
                    {
                        q: "When will I receive my refund?",
                        a: "Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method."
                    }
                ]
            },
            {
                category: "Account & Security",
                questions: [
                    {
                        q: "How do I reset my password?",
                        a: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your email."
                    },
                    {
                        q: "Is my payment information secure?",
                        a: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store complete credit card details."
                    },
                    {
                        q: "How can I update my account information?",
                        a: "Login to your account, go to 'Account Settings', and you can update your personal information, addresses, and preferences."
                    }
                ]
            }
        ];

        const [activeCategory, setActiveCategory] = React.useState('Orders');
        const [searchQuery, setSearchQuery] = React.useState('');
        const [openQuestions, setOpenQuestions] = React.useState({});

        const toggleQuestion = (categoryIndex, questionIndex) => {
            const key = `${categoryIndex}-${questionIndex}`;
            setOpenQuestions(prev => ({
                ...prev,
                [key]: !prev[key]
            }));
        };

        const filteredFaqs = faqs.map(category => ({
            ...category,
            questions: category.questions.filter(q => 
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(category => category.questions.length > 0);

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="max-w-xl relative">
                            <input
                                type="text"
                                placeholder="Search FAQ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border rounded-lg"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Categories */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h2 className="font-semibold mb-4">Categories</h2>
                                <div className="space-y-2">
                                    {faqs.map(category => (
                                        <button
                                            key={category.category}
                                            onClick={() => setActiveCategory(category.category)}
                                            className={`w-full text-left px-4 py-2 rounded ${
                                                activeCategory === category.category
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                {searchQuery ? (
                                    <div>
                                        <h2 className="font-semibold mb-4">Search Results</h2>
                                        {filteredFaqs.map((category, categoryIndex) => (
                                            <div key={category.category} className="mb-8">
                                                <h3 className="font-medium text-lg mb-4">{category.category}</h3>
                                                <div className="space-y-4">
                                                    {category.questions.map((question, questionIndex) => (
                                                        <div
                                                            key={questionIndex}
                                                            className="border rounded-lg overflow-hidden"
                                                        >
                                                            <button
                                                                onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                                                className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                            >
                                                                <span className="font-medium">{question.q}</span>
                                                                <i className={`fas fa-chevron-${
                                                                    openQuestions[`${categoryIndex}-${questionIndex}`] ? 'up' : 'down'
                                                                }`}></i>
                                                            </button>
                                                            {openQuestions[`${categoryIndex}-${questionIndex}`] && (
                                                                <div className="px-4 py-3 bg-gray-50 border-t">
                                                                    <p className="text-gray-600">{question.a}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="font-semibold mb-4">{activeCategory}</h2>
                                        <div className="space-y-4">
                                            {faqs.find(c => c.category === activeCategory)?.questions.map((question, index) => (
                                                <div
                                                    key={index}
                                                    className="border rounded-lg overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => toggleQuestion(
                                                            faqs.findIndex(c => c.category === activeCategory),
                                                            index
                                                        )}
                                                        className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                    >
                                                        <span className="font-medium">{question.q}</span>
                                                        <i className={`fas fa-chevron-${
                                                            openQuestions[`${faqs.findIndex(c => c.category === activeCategory)}-${index}`] ? 'up' : 'down'
                                                        }`}></i>
                                                    </button>
                                                    {openQuestions[`${faqs.findIndex(c => c.category === activeCategory)}-${index}`] && (
                                                        <div className="px-4 py-3 bg-gray-50 border-t">
                                                            <p className="text-gray-600">{question.a}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-12 bg-blue-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
                        <p className="text-gray-600 mb-4">
                            Can't find what you're looking for? Our customer support team is here to help.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <i className="fas fa-envelope mr-2"></i>
                                Contact Support
                            </a>
                            <a
                                href="tel:+1234567890"
                                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                <i className="fas fa-phone mr-2"></i>
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('FAQ page error:', error);
        reportError(error);
        return null;
    }
}
export default FAQ;