function OrderForm({ isOpen, onClose, onSubmit, total }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            phone: '',
            address: '',
            city: '',
            zipCode: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        if (!isOpen) return null;

        return (
            <div data-name="order-form-container" className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 data-name="form-title" className="text-2xl font-bold mb-4">Delivery Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Delivery Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-lg font-semibold">Total Amount: ${total.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Payment Method: Cash on Delivery</p>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('OrderForm component error:', error);
        reportError(error);
        return null;
    }
}
export default OrderForm;