
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SafetyChecklist from './SafetyChecklist';

describe('SafetyChecklist', () => {
    it('renders correctly', () => {
        render(<SafetyChecklist />);
        expect(screen.getByText('Safety Checklist')).toBeInTheDocument();
        expect(screen.getByLabelText('Freshness Checked')).toBeInTheDocument();
        expect(screen.getByLabelText('Hygiene Maintained')).toBeInTheDocument();
    });

    it('toggles freshness checkbox', () => {
        render(<SafetyChecklist />);
        const checkbox = screen.getByLabelText('Freshness Checked');
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('toggles hygiene checkbox', () => {
        render(<SafetyChecklist />);
        const checkbox = screen.getByLabelText('Hygiene Maintained');
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
});
