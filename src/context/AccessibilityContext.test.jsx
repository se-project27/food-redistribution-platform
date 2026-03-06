
import React, { useContext } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityProvider, AccessibilityContext } from './AccessibilityContext';

const TestComponent = () => {
    const { language, setLanguage, contrast, setContrast } = useContext(AccessibilityContext);
    return (
        <div>
            <span data-testid="lang">{language}</span>
            <span data-testid="contrast">{contrast.toString()}</span>
            <button onClick={() => setLanguage('HI')}>Change Lang</button>
            <button onClick={() => setContrast(true)}>Change Contrast</button>
        </div>
    );
};

describe('AccessibilityContext', () => {
    it('provides default values', () => {
        render(
            <AccessibilityProvider>
                <TestComponent />
            </AccessibilityProvider>
        );
        expect(screen.getByTestId('lang')).toHaveTextContent('EN');
        expect(screen.getByTestId('contrast')).toHaveTextContent('false');
    });

    it('updates values', () => {
        render(
            <AccessibilityProvider>
                <TestComponent />
            </AccessibilityProvider>
        );

        fireEvent.click(screen.getByText('Change Lang'));
        expect(screen.getByTestId('lang')).toHaveTextContent('HI');

        fireEvent.click(screen.getByText('Change Contrast'));
        expect(screen.getByTestId('contrast')).toHaveTextContent('true');
    });
});
