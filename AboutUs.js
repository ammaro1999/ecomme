function AboutUs() {
    try {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
                    
                    <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Founded in 2024, E-Store has grown from a small startup to one of the leading e-commerce platforms. 
                                We're dedicated to providing our customers with the best shopping experience possible, offering 
                                high-quality products at competitive prices.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our mission is to make online shopping accessible, convenient, and enjoyable for everyone. 
                                We carefully curate our product selection and work directly with manufacturers to ensure 
                                the highest quality standards.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <i className="fas fa-users text-3xl text-blue-500 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                                <p className="text-gray-600">
                                    We prioritize customer satisfaction above all else, providing 24/7 support and hassle-free returns.
                                </p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <i className="fas fa-shield-alt text-3xl text-blue-500 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                                <p className="text-gray-600">
                                    Every product in our store undergoes strict quality control to meet our high standards.
                                </p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <i className="fas fa-globe text-3xl text-blue-500 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Worldwide Delivery</h3>
                                <p className="text-gray-600">
                                    We ship to over 100 countries, making our products accessible to customers worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    { name: 'John Smith', role: 'CEO', image: 'https://i.pravatar.cc/150?img=1' },
                                    { name: 'Sarah Johnson', role: 'COO', image: 'https://i.pravatar.cc/150?img=2' },
                                    { name: 'Michael Chen', role: 'CTO', image: 'https://i.pravatar.cc/150?img=3' },
                                    { name: 'Emma Davis', role: 'Head of Customer Service', image: 'https://i.pravatar.cc/150?img=4' }
                                ].map(member => (
                                    <div key={member.name} className="text-center">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                        />
                                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                                        <p className="text-gray-600">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AboutUs page error:', error);
        reportError(error);
        return null;
    }
}
export default AboutUs;