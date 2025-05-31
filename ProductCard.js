function ProductCard({ product, onClick, language }) {
    try {
        const { name, price, image, description, category, discount, salesCount } = product;
        const images = [
            image,
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
        ];
        
        const [activeImageIndex, setActiveImageIndex] = React.useState(0);
        
        const currentLanguage = language || 'en';
        const t = translations[currentLanguage];

        const discountedPrice = discount ? price * (1 - discount / 100) : price;
        
        return (
            <div 
                data-name="product-card" 
                className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={onClick}
            >
                <div className="image-preview-container h-48">
                    {discount > 0 && (
                        <div className="absolute top-2 right-2 z-20 bg-red-500 text-white px-2 py-1 rounded">
                            -{discount}%
                        </div>
                    )}
                    <div 
                        className="image-preview-strip"
                        style={{ transform: `translateX(-${activeImageIndex * 25}%)` }}
                    >
                        {images.map((img, index) => (
                            <img 
                                key={index}
                                src={img}
                                alt={`${name} view ${index + 1}`}
                                className="w-full h-48 object-cover"
                                onMouseEnter={() => setActiveImageIndex(index)}
                            />
                        ))}
                    </div>
                    <img 
                        data-name="product-image"
                        src={image} 
                        alt={name}
                        className="w-full h-48 object-cover relative z-10 hover:opacity-0 transition-opacity duration-300"
                    />
                    <div className="preview-dots">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`image-preview-dot ${index === activeImageIndex ? 'active' : ''}`}
                                onMouseEnter={() => setActiveImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 data-name="product-name" className="text-lg font-semibold text-gray-800">{name}</h3>
                        <span data-name="product-category" className="text-sm text-blue-500">{category}</span>
                    </div>
                    <p data-name="product-description" className="text-gray-600 text-sm mb-4">{description.substring(0, 100)}...</p>
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <span data-name="product-price" className={`text-lg font-bold ${discount ? 'text-red-500' : 'text-gray-800'}`}>
                                ${discountedPrice.toFixed(2)}
                            </span>
                            {discount > 0 && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    ${price.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">
                                {salesCount} {t.sold}
                            </span>
                            <span className="text-sm text-gray-500">{t.clickToView}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductCard component error:', error);
        reportError(error);
        return null;
    }
}
export default ProductCard;