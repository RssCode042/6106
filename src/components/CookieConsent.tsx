import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-accepted');
        if (!consent) {
            // Short delay for natural transition appearance
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent-accepted', 'all');
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem('cookie-consent-accepted', 'necessary');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div 
            id="cookie-consent-popup"
            className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 z-50 transition-all duration-300 transform translate-y-0 animate-fade-in"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Cookie className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-base">Бисквитки и поверителност</h4>
                        <button 
                            onClick={handleAcceptNecessary}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Затвори"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Ние използваме бисквитки, за да подобрим Вашето преживяване на нашия уебсайт, да анализираме трафика и да персонализираме съдържанието. Научете повече в нашата политика за поверителност.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={handleAcceptNecessary}
                            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                            Само необходими
                        </button>
                        <button 
                            onClick={handleAcceptAll}
                            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-800 transition-all duration-200 shadow-sm"
                        >
                            Приемам всички
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
