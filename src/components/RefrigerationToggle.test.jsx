
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RefrigerationToggle from './RefrigerationToggle';

describe('RefrigerationToggle', () => {
    it('renders checkbox', () => {
        render(<RefrigerationToggle />);
        expect(screen.getByLabelText('Refrigeration Required')).toBeInTheDocument();
    });

    it('toggles checkbox state', () => {
        render(<RefrigerationToggle />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});
