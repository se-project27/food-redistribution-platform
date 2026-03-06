
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
    it('renders 5 stars', () => {
        render(<StarRating />);
        const stars = screen.getAllByText('☆');
        expect(stars).toHaveLength(5);
    });

    it('updates rating on click', () => {
        render(<StarRating />);
        const stars = screen.getAllByText('☆');

        // Click 3rd star
        fireEvent.click(stars[2]);

        // Should have 3 filled stars and 2 empty stars
        const filledStars = screen.getAllByText('★');
        const emptyStars = screen.getAllByText('☆');

        expect(filledStars).toHaveLength(3);
        expect(emptyStars).toHaveLength(2);
    });
});
