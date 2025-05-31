function ProductList({ products, onProductClick, language }) {
    try {
        return (
            <div data-name="product-list" className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onProductClick(product)}
                            language={language}
                        />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductList component error:', error);
        reportError(error);
        return null;
    }
}
export default ProductList;