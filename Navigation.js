function Navigation({ categories, activeCategory, onSelectCategory, language }) {
    try {
        const t = translations[language];
        
        return (
            <nav data-name="category-navigation" className="bg-gray-100 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto whitespace-nowrap py-3 -mx-4 px-4">
                        <button
                            data-name="category-all"
                            onClick={() => onSelectCategory(null)}
                            className={`px-4 py-2 mx-2 rounded-full transition-colors ${
                                activeCategory === null 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-white text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {t.allProducts}
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                data-name={`category-${category.toLowerCase()}`}
                                onClick={() => onSelectCategory(category)}
                                className={`px-4 py-2 mx-2 rounded-full transition-colors ${
                                    activeCategory === category 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-white text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navigation component error:', error);
        reportError(error);
        return null;
    }
}
export default Navigation;
