function ProductFilters({ onSortChange, onDiscountedOnly, onPriceRangeChange, onSearchChange, onStockStatusChange, language }) {
    try {
        const t = translations[language];
        const [priceRange, setPriceRange] = React.useState({ min: '', max: '' });
        const [searchQuery, setSearchQuery] = React.useState('');
        const [showFilters, setShowFilters] = React.useState(false);
        
        const handlePriceRangeChange = (e) => {
            const { name, value } = e.target;
            const newRange = { ...priceRange, [name]: value };
            setPriceRange(newRange);
            onPriceRangeChange(newRange);
        };

        const handleSearchChange = (e) => {
            const value = e.target.value;
            setSearchQuery(value);
            onSearchChange(value);
        };

        return (
            <div data-name="product-filters" className="bg-white shadow-sm mb-6">
                {/* Search Bar */}
                <div className="border-b">
                    <div className="container mx-auto px-4 py-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t.searchProducts}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>

                {/* Filters Toggle */}
                <div className="container mx-auto px-4 py-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <i className={`fas fa-filter mr-2 ${showFilters ? 'text-blue-500' : ''}`}></i>
                        {t.filters}
                        <i className={`fas fa-chevron-${showFilters ? 'up' : 'down'} ml-2`}></i>
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="container mx-auto px-4 py-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Sort Options */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t.sortBy}</label>
                                <select 
                                    onChange={(e) => onSortChange(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">{t.featured}</option>
                                    <option value="price-asc">{t.priceLowToHigh}</option>
                                    <option value="price-desc">{t.priceHighToLow}</option>
                                    <option value="best-sellers">{t.bestSellers}</option>
                                    <option value="newest">{t.newest}</option>
                                    <option value="discount">{t.biggestDiscount}</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t.priceRange}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="min"
                                        placeholder={t.min}
                                        value={priceRange.min}
                                        onChange={handlePriceRangeChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        name="max"
                                        placeholder={t.max}
                                        value={priceRange.max}
                                        onChange={handlePriceRangeChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t.availability}</label>
                                <select 
                                    onChange={(e) => onStockStatusChange(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="all">{t.allItems}</option>
                                    <option value="in-stock">{t.inStock}</option>
                                    <option value="out-of-stock">{t.outOfStock}</option>
                                </select>
                            </div>

                            {/* Discount Filter */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t.discounts}</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => onDiscountedOnly(e.target.checked)}
                                            className="form-checkbox h-5 w-5 text-blue-500"
                                        />
                                        <span className="ml-2">{t.onlyDiscounted}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {(priceRange.min || priceRange.max) && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    {t.price}: ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                                    <button
                                        onClick={() => {
                                            setPriceRange({ min: '', max: '' });
                                            onPriceRangeChange({ min: '', max: '' });
                                        }}
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </span>
                            )}
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    {t.search}: {searchQuery}
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            onSearchChange('');
                                        }}
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ProductFilters component error:', error);
        reportError(error);
        return null;
    }
}
export default ProductFilters;