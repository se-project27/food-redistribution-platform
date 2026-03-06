
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeaderBoard from './LeaderBoard';

describe('LeaderBoard', () => {
    it('renders header', () => {
        render(<LeaderBoard />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Top Donors Leaderboard');
    });
});
