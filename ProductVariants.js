function ProductVariants({ product, onVariantSelect, selectedVariants, language }) {
    try {
        const t = translations[language];
        const { variants } = product;

        const renderColorOption = (color) => {
            const colorData = PRODUCT_VARIANTS.colors.find(c => c.name === color);
            return (
                <button
                    key={color}
                    onClick={() => onVariantSelect('color', color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                        selectedVariants.color === color 
                            ? 'border-blue-500' 
                            : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: colorData.value }}
                    title={color}
                >
                    {selectedVariants.color === color && (
                        <i className={`fas fa-check ${
                            color === 'White' ? 'text-gray-800' : 'text-white'
                        }`}></i>
                    )}
                </button>
            );
        };

        const renderSizeOption = (size) => (
            <button
                key={size}
                onClick={() => onVariantSelect('size', size)}
                className={`px-4 py-2 border rounded ${
                    selectedVariants.size === size
                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                }`}
            >
                {size}
            </button>
        );

        const renderStorageOption = (storage) => (
            <button
                key={storage}
                onClick={() => onVariantSelect('storage', storage)}
                className={`px-4 py-2 border rounded ${
                    selectedVariants.storage === storage
                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                }`}
            >
                {storage}
            </button>
        );

        return (
            <div className="space-y-4">
                {variants.colors && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.selectColor}
                        </label>
                        <div className="flex gap-3">
                            {variants.colors.map(renderColorOption)}
                        </div>
                    </div>
                )}

                {variants.sizes && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.selectSize}
                        </label>
                        <div className="flex gap-3">
                            {variants.sizes.map(renderSizeOption)}
                        </div>
                    </div>
                )}

                {variants.storage && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.selectStorage}
                        </label>
                        <div className="flex gap-3">
                            {variants.storage.map(renderStorageOption)}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ProductVariants component error:', error);
        reportError(error);
        return null;
    }
}
export default "ProductVariants";