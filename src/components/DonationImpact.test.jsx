
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DonationImpact from './DonationImpact';

describe('DonationImpact', () => {
    it('renders impact meals', () => {
        render(<DonationImpact meals={500} />);
        expect(screen.getByText('Total Impact Meals: 500')).toBeInTheDocument();
    });
});
