function CheckoutPage({ cartItems, onClose, onSubmit }) {
    try {
        const [deliveryType, setDeliveryType] = React.useState(''); // 'stopdesk' or 'home'
        const [selectedWilaya, setSelectedWilaya] = React.useState('');
        const [selectedCommune, setSelectedCommune] = React.useState('');
        const [selectedStopDesk, setSelectedStopDesk] = React.useState('');
        const [homeAddress, setHomeAddress] = React.useState('');
        const [contactInfo, setContactInfo] = React.useState({
            name: '',
            phone: '',
            email: ''
        });

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryCost = deliveryType === 'home' ? 500 : 300; // In Algerian Dinar

        const handleWilayaChange = (e) => {
            const wilayaId = e.target.value;
            setSelectedWilaya(wilayaId);
            setSelectedCommune('');
            setSelectedStopDesk('');
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            
            const orderData = {
                items: cartItems,
                total: total + deliveryCost,
                deliveryType,
                deliveryAddress: deliveryType === 'stopdesk' ? {
                    wilaya: WILAYAS.find(w => w.id === parseInt(selectedWilaya))?.name,
                    stopDesk: STOP_DESKS[selectedWilaya]?.find(sd => sd.id === selectedStopDesk)
                } : {
                    wilaya: WILAYAS.find(w => w.id === parseInt(selectedWilaya))?.name,
                    commune: selectedCommune,
                    address: homeAddress
                },
                contactInfo,
                deliveryCost
            };

            onSubmit(orderData);
        };

        return (
            <div data-name="checkout-page" className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Contact Information */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={contactInfo.name}
                                                onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={contactInfo.phone}
                                                onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 mb-2">Email (Optional)</label>
                                            <input
                                                type="email"
                                                value={contactInfo.email}
                                                onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Type Selection */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('stopdesk')}
                                            className={`p-4 border rounded-lg text-left ${
                                                deliveryType === 'stopdesk' 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                                                    deliveryType === 'stopdesk'
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : 'border-gray-300'
                                                }`} />
                                                <div>
                                                    <div className="font-semibold">Stop Desk Delivery</div>
                                                    <div className="text-sm text-gray-600">300 DA</div>
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('home')}
                                            className={`p-4 border rounded-lg text-left ${
                                                deliveryType === 'home' 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                                                    deliveryType === 'home'
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : 'border-gray-300'
                                                }`} />
                                                <div>
                                                    <div className="font-semibold">Home Delivery</div>
                                                    <div className="text-sm text-gray-600">500 DA</div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Delivery Location */}
                                {deliveryType && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold mb-4">Delivery Location</h3>
                                        
                                        {/* Wilaya Selection */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Wilaya</label>
                                            <select
                                                required
                                                value={selectedWilaya}
                                                onChange={handleWilayaChange}
                                                className="w-full px-3 py-2 border rounded"
                                            >
                                                <option value="">Select Wilaya</option>
                                                {WILAYAS.map(wilaya => (
                                                    <option key={wilaya.id} value={wilaya.id}>
                                                        {wilaya.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {selectedWilaya && deliveryType === 'stopdesk' && (
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Stop Desk</label>
                                                <select
                                                    required
                                                    value={selectedStopDesk}
                                                    onChange={(e) => setSelectedStopDesk(e.target.value)}
                                                    className="w-full px-3 py-2 border rounded"
                                                >
                                                    <option value="">Select Stop Desk</option>
                                                    {STOP_DESKS[selectedWilaya]?.map(desk => (
                                                        <option key={desk.id} value={desk.id}>
                                                            {desk.name} - {desk.address}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {selectedWilaya && deliveryType === 'home' && (
                                            <>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 mb-2">Commune</label>
                                                    <select
                                                        required
                                                        value={selectedCommune}
                                                        onChange={(e) => setSelectedCommune(e.target.value)}
                                                        className="w-full px-3 py-2 border rounded"
                                                    >
                                                        <option value="">Select Commune</option>
                                                        {COMMUNES[selectedWilaya]?.map(commune => (
                                                            <option key={commune} value={commune}>
                                                                {commune}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 mb-2">Detailed Address</label>
                                                    <textarea
                                                        required
                                                        value={homeAddress}
                                                        onChange={(e) => setHomeAddress(e.target.value)}
                                                        className="w-full px-3 py-2 border rounded"
                                                        rows="3"
                                                        placeholder="Enter your detailed address..."
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Order Summary */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                    <div className="border rounded-lg p-4">
                                        <div className="space-y-2">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="flex justify-between">
                                                    <span>{item.name} × {item.quantity}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                            <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between">
                                                    <span>Subtotal</span>
                                                    <span>${total.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Delivery Cost</span>
                                                    <span>{deliveryType ? `${deliveryCost} DA` : '-'}</span>
                                                </div>
                                                <div className="flex justify-between font-bold mt-2">
                                                    <span>Total</span>
                                                    <span>${(total + (deliveryType ? deliveryCost/200 : 0)).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-3 text-gray-600 hover:text-gray-800"
                                    >
                                        Back to Cart
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CheckoutPage component error:', error);
        reportError(error);
        return null;
    }
}
export default CheckoutPage;