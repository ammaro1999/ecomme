function ContactUs() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        const [status, setStatus] = React.useState({ type: '', message: '' });

        const handleSubmit = async (e) => {
            e.preventDefault();
            setStatus({ type: 'info', message: 'Sending message...' });

            try {
                await trickleCreateObject('contact', {
                    ...formData,
                    createdAt: new Date().toISOString()
                });

                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } catch (error) {
                console.error('Error sending message:', error);
                setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-3 py-2 border rounded"
                                    ></textarea>
                                </div>

                                {status.message && (
                                    <div className={`p-3 rounded ${
                                        status.type === 'success' ? 'bg-green-100 text-green-700' :
                                        status.type === 'error' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-4"></i>
                                    <div>
                                        <h3 className="font-medium">Address</h3>
                                        <p className="text-gray-600">
                                            123 E-Store Street<br />
                                            Business District<br />
                                            City, Country 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <i className="fas fa-phone text-blue-500 mt-1 mr-4"></i>
                                    <div>
                                        <h3 className="font-medium">Phone</h3>
                                        <p className="text-gray-600">
                                            +1 234 567 890<br />
                                            +1 234 567 891
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <i className="fas fa-envelope text-blue-500 mt-1 mr-4"></i>
                                    <div>
                                        <h3 className="font-medium">Email</h3>
                                        <p className="text-gray-600">
                                            support@estore.com<br />
                                            info@estore.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <i className="fas fa-clock text-blue-500 mt-1 mr-4"></i>
                                    <div>
                                        <h3 className="font-medium">Business Hours</h3>
                                        <p className="text-gray-600">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 10:00 AM - 4:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-medium mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-600 hover:text-blue-500">
                                        <i className="fab fa-facebook-f text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500">
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500">
                                        <i className="fab fa-instagram text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500">
                                        <i className="fab fa-linkedin-in text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ContactUs page error:', error);
        reportError(error);
        return null;
    }
}
export default ContactUs;