
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MealsCounter from './MealsCounter';

describe('MealsCounter', () => {
    it('renders meal count', () => {
        render(<MealsCounter count={100} />);
        expect(screen.getByText('Meals Donated: 100')).toBeInTheDocument();
    });

    it('renders default count if not provided', () => {
        render(<MealsCounter />);
        expect(screen.getByText('Meals Donated: 0')).toBeInTheDocument();
    });
});
