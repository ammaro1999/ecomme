function Cart({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) {
    try {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return (
            <div data-name="cart-container" className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="cart-overlay absolute inset-0" onClick={onClose}></div>
                <div className={`cart-sidebar fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform ${isOpen ? 'open' : 'closed'}`}>
                    <div className="p-4 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 data-name="cart-title" className="text-xl font-bold">Shopping Cart</h2>
                            <button 
                                data-name="close-cart-button"
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div data-name="cart-items" className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <p className="text-gray-500 text-center mt-4">Your cart is empty</p>
                            ) : (
                                items.map(item => (
                                    <div 
                                        key={item.id}
                                        data-name="cart-item"
                                        className="flex items-center gap-4 mb-4 p-2 border-b"
                                    >
                                        <img 
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">${item.price}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-xl">${total.toFixed(2)}</span>
                            </div>
                            <button
                                data-name="checkout-button"
                                onClick={onCheckout}
                                disabled={items.length === 0}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Cart component error:', error);
        reportError(error);
        return null;
    }
}
export default Cart;