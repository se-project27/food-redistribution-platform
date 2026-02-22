
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TemperatureTag from './TemperatureTag';

describe('TemperatureTag', () => {
    it('renders correctly with initial value', () => {
        const setValue = vi.fn();
        render(<TemperatureTag value="Hot" setValue={setValue} />);
        expect(screen.getByDisplayValue('Hot')).toBeInTheDocument();
    });

    it('calls setValue when option changes', () => {
        const setValue = vi.fn();
        render(<TemperatureTag value="Hot" setValue={setValue} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'Cold' } });
        expect(setValue).toHaveBeenCalledWith('Cold');
    });
});
