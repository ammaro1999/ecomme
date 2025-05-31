import React from 'react';
import { translations } from '../utils/translations'; // Adjusted import path

function Header({ cartItemCount, onCartClick, onLogoClick, language, onLanguageChange, onAuthClick, user }) {
    try {
        const t = translations[language]; // Access translations for the selected language
        const isRTL = language === 'ar'; // Check if the language is Arabic
        
        return (
            <header data-name="header" className="bg-white header-shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div 
                        data-name="logo" 
                        className="text-2xl font-bold text-gray-800 cursor-pointer"
                        onClick={onLogoClick}
                    >
                        <i className="fas fa-store mr-2"></i>
                        {isRTL ? 'متجر-إي' : 'E-Store'}
                    </div>
                    <div className="flex items-center gap-4">
                        <select 
                            value={language}
                            onChange={(e) => onLanguageChange(e.target.value)}
                            className="bg-gray-100 text-gray-800 px-3 py-2 rounded border border-gray-200"
                        >
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                        </select>
                        
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <i className="fas fa-user-circle text-xl"></i>
                                    <span>{user.objectData.email || user.objectData.phone}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                                    <button 
                                        onClick={() => onAuthClick('logout')}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        {t.logout} {/* Use the translated logout text */}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => onAuthClick('login')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <i className="fas fa-user-circle text-xl"></i>
                            </button>
                        )}

                        <button 
                            data-name="cart-button"
                            onClick={onCartClick}
                            className="relative p-2"
                        >
                            <i className="fas fa-shopping-cart text-xl text-gray-600"></i>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}

export default Header;
