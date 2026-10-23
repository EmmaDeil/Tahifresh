import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a structured dictionary for your application's text assets
type TranslationDictionary = Record<string, string>;

interface TranslationContextType {
    // Mapped as "name" to align with your existing Cart component consumption
    name: TranslationDictionary;
    setLanguage: (lang: string) => void;
    currentLanguage: string;
}

// Default English strings matching your UI requirements
const defaultTranslations: TranslationDictionary = {
    'basket is empty': 'basket is empty',
    'Add fresh items to get started.': 'Add fresh items to get started.',
    'Start shopping': 'Start shopping',
    'basket': 'basket',
    'Review your items before checkout.': 'Review your items before checkout.',
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [translations, setTranslations] = useState<TranslationDictionary>(defaultTranslations);

    const setLanguage = (lang: string) => {
        setCurrentLanguage(lang);
        // Future integration: Fetch external JSON dictionaries or switch local objects here based on the 'lang' parameter
    };

    return (
        <TranslationContext.Provider value={{ name: translations, setLanguage, currentLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a TranslationProvider to access UI strings.');
    }
    return context;
};