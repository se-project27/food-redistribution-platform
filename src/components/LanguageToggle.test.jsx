
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageToggle from './LanguageToggle';

describe('LanguageToggle', () => {
    it('renders initial language', () => {
        render(<LanguageToggle />);
        expect(screen.getByRole('button')).toHaveTextContent('Language: EN');
    });

    it('toggles language on click', () => {
        render(<LanguageToggle />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button).toHaveTextContent('Language: HI');
        fireEvent.click(button);
        expect(button).toHaveTextContent('Language: EN');
    });
});
