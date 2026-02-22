
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QRCodeDisplay from './QRCodeDisplay';

describe('QRCodeDisplay', () => {
    it('renders QR code value', () => {
        render(<QRCodeDisplay value="test-qr-code" />);
        expect(screen.getByText('QR Code: test-qr-code')).toBeInTheDocument();
    });
});
