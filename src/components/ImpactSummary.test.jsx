
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImpactSummary from './ImpactSummary';

describe('ImpactSummary', () => {
    it('renders usage summary', () => {
        render(<ImpactSummary meals={50} co2={25} />);
        expect(screen.getByText('Impact Summary')).toBeInTheDocument();
        expect(screen.getByText('Meals Saved: 50')).toBeInTheDocument();
        expect(screen.getByText('CO2 Saved: 25 kg')).toBeInTheDocument();
    });

    it('renders default values', () => {
        render(<ImpactSummary />);
        expect(screen.getByText('Meals Saved: 0')).toBeInTheDocument();
        expect(screen.getByText('CO2 Saved: 0 kg')).toBeInTheDocument();
    });
});
