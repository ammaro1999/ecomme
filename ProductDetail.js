function ProductDetail({ product, onAddToCart, onBuyNow, language }) {
    try {
        if (!product) return null;

        const [selectedVariants, setSelectedVariants] = React.useState({
            color: product.variants.colors?.[0] || null,
            size: product.variants.sizes?.[0] || null,
            storage: product.variants.storage?.[0] || null
        });
        const [selectedImage, setSelectedImage] = React.useState(product.image);

        const handleVariantSelect = (type, value) => {
            setSelectedVariants(prev => ({
                ...prev,
                [type]: value
            }));
        };

        const handleAddReview = (newReview) => {
            product.reviews = [newReview, ...product.reviews];
            product.reviewCount++;
            // Recalculate average rating
            const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.averageRating = totalRating / product.reviews.length;
        };

        const images = [
            product.image,
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
        ];

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            <div className="space-y-4">
                                <div className="aspect-w-1 aspect-h-1">
                                    <img 
                                        src={selectedImage} 
                                        alt={product.name}
                                        className="w-full h-[500px] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(img)}
                                            className={`relative rounded-lg overflow-hidden ${
                                                selectedImage === img ? 'ring-2 ring-blue-500' : ''
                                            }`}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${product.name} view ${index + 1}`}
                                                className="w-full h-20 object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex text-yellow-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fas fa-star ${
                                                        i < Math.floor(product.averageRating) 
                                                            ? 'text-yellow-400' 
                                                            : 'text-gray-300'
                                                    }`}
                                                ></i>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            ({product.reviewCount} reviews)
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h1>
                                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    {product.discount > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg text-gray-500 line-through">
                                                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                            </span>
                                            <span className="text-red-500 font-semibold">
                                                {product.discount}% OFF
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        Free delivery on orders over $100
                                    </p>
                                </div>

                                {/* Product Variants */}
                                <ProductVariants
                                    product={product}
                                    selectedVariants={selectedVariants}
                                    onVariantSelect={handleVariantSelect}
                                    language={language}
                                />

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                                    <p className="text-gray-600">
                                        {product.description}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Features</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map(tag => (
                                            <span 
                                                key={tag}
                                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => onAddToCart({
                                            ...product,
                                            selectedVariants
                                        })}
                                        className="flex-1 bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => onBuyNow({
                                            ...product,
                                            selectedVariants
                                        })}
                                        className="flex-1 bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                <div className="border-t pt-6 mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-truck text-gray-400"></i>
                                            <span className="text-sm text-gray-600">Fast Delivery</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-money-bill-wave text-gray-400"></i>
                                            <span className="text-sm text-gray-600">Cash on Delivery</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-undo text-gray-400"></i>
                                            <span className="text-sm text-gray-600">Easy Returns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="border-t">
                            <div className="p-8">
                                <ProductReviews
                                    product={product}
                                    onAddReview={handleAddReview}
                                    language={language}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductDetail component error:', error);
        reportError(error);
        return null;
    }
}
export default ProductDetail;