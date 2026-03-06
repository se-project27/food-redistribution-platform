
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HygieneFeedback from './HygieneFeedback';

describe('HygieneFeedback', () => {
    it('renders textarea', () => {
        render(<HygieneFeedback />);
        expect(screen.getByPlaceholderText('Hygiene feedback...')).toBeInTheDocument();
    });
});
