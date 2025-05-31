function Footer({ language, onLanguageChange }) {
    try {
        const content = {
            en: {
                quickLinks: 'Quick Links',
                aboutUs: 'About Us',
                contactUs: 'Contact Us',
                termsOfService: 'Terms of Service',
                privacyPolicy: 'Privacy Policy',
                returnPolicy: 'Return Policy',
                shippingInfo: 'Shipping Information',
                help: 'Help & Support',
                faq: 'FAQ',
                customerService: 'Customer Service',
                trackOrder: 'Track Order',
                socialMedia: 'Follow Us',
                rights: 'All rights reserved',
            },
            ar: {
                quickLinks: 'روابط سريعة',
                aboutUs: 'معلومات عنا',
                contactUs: 'اتصل بنا',
                termsOfService: 'شروط الخدمة',
                privacyPolicy: 'سياسة الخصوصية',
                returnPolicy: 'سياسة الإرجاع',
                shippingInfo: 'معلومات الشحن',
                help: 'المساعدة والدعم',
                faq: 'الأسئلة الشائعة',
                customerService: 'خدمة العملاء',
                trackOrder: 'تتبع الطلب',
                socialMedia: 'تابعنا على',
                rights: 'جميع الحقوق محفوظة',
            }
        };

        const t = content[language];
        const isArabic = language === 'ar';
        const rtlClass = isArabic ? 'rtl text-right' : 'ltr text-left';

        return (
            <footer data-name="footer" className={`bg-gray-800 text-gray-300 py-12 mt-auto ${rtlClass}`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">{t.quickLinks}</h3>
                            <ul className="space-y-2">
                                <li><a href="#/about" className="hover:text-white transition-colors">{t.aboutUs}</a></li>
                                <li><a href="#/contact" className="hover:text-white transition-colors">{t.contactUs}</a></li>
                                <li><a href="#/terms" className="hover:text-white transition-colors">{t.termsOfService}</a></li>
                                <li><a href="#/privacy" className="hover:text-white transition-colors">{t.privacyPolicy}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">{t.help}</h3>
                            <ul className="space-y-2">
                                <li><a href="#/faq" className="hover:text-white transition-colors">{t.faq}</a></li>
                                <li><a href="#/returns" className="hover:text-white transition-colors">{t.returnPolicy}</a></li>
                                <li><a href="#/shipping" className="hover:text-white transition-colors">{t.shippingInfo}</a></li>
                                <li><a href="#/track" className="hover:text-white transition-colors">{t.trackOrder}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">{t.customerService}</h3>
                            <ul className="space-y-2">
                                <li><a href="tel:+123456789" className="hover:text-white transition-colors">+123 456 789</a></li>
                                <li><a href="mailto:support@example.com" className="hover:text-white transition-colors">support@example.com</a></li>
                                <li className="text-sm">24/7 Support</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">{t.socialMedia}</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-twitter text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-linkedin-in text-xl"></i>
                                </a>
                            </div>
                            <div className="mt-4">
                                <select 
                                    value={language}
                                    onChange={(e) => onLanguageChange(e.target.value)}
                                    className="bg-gray-700 text-white px-3 py-1 rounded"
                                >
                                    <option value="en">English</option>
                                    <option value="ar">العربية</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p>© {new Date().getFullYear()} E-Store. {t.rights}.</p>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}
export default Footer;