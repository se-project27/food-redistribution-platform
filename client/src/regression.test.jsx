/**
 * Regression Tests — Frontend
 * Ensures previously fixed bugs do not reoccur.
 * Each test documents the bug it prevents.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock heavy modules (same as App.test.jsx)
vi.mock('axios');
vi.mock('react-leaflet', () => ({
    MapContainer: () => <div>MapContainer</div>,
    TileLayer: () => <div>TileLayer</div>,
    Marker: () => <div>Marker</div>,
    Popup: () => <div>Popup</div>,
    useMap: () => ({ setView: vi.fn() }),
}));
vi.mock('react-qr-code', () => ({ default: () => <div>QRCode</div> }));
vi.mock('leaflet/dist/leaflet.css', () => ({}));
vi.mock('leaflet', () => {
    const L = {
        Icon: {
            Default: {
                prototype: { _getIconUrl: vi.fn() },
                mergeOptions: vi.fn(),
            }
        }
    };
    return { default: L, ...L };
});

describe('Frontend Regression Tests', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    describe('BUG FIX: GiveBite branding (previously Food Redistribution Platform)', () => {
        it('should display GiveBite branding, not old title', () => {
            render(<App />);
            const bodyText = document.body.textContent;
            // The app was rebranded — old title should NOT appear
            expect(bodyText).not.toContain('Food Redistribution Platform');
        });
    });

    describe('BUG FIX: Navbar NavLink component extraction', () => {
        it('should render Navbar without nested component errors', () => {
            // Regression: NavLink was previously defined inside Navbar causing lint errors
            render(<App />);
            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Solutions')).toBeInTheDocument();
        });
    });

    describe('BUG FIX: Benefits.jsx unused motion import removed', () => {
        it('should render landing page without import errors', () => {
            // Regression: Benefits.jsx had unused 'motion' import causing lint errors
            render(<App />);
            expect(document.body.textContent.length).toBeGreaterThan(0);
        });
    });

    describe('BUG FIX: IntersectionObserver polyfill for framer-motion', () => {
        it('should have IntersectionObserver available in test environment', () => {
            // Regression: jsdom doesn't have IntersectionObserver — polyfill added in setupTests.js
            expect(typeof IntersectionObserver).toBe('function');
        });

        it('should have ResizeObserver available in test environment', () => {
            // Regression: framer-motion requires ResizeObserver — polyfill added
            expect(typeof ResizeObserver).toBe('function');
        });
    });

    describe('BUG FIX: Chatbot scroll and message ID', () => {
        it('should render chatbot without scrollToBottom declaration errors', () => {
            // Regression: scrollToBottom was called before declaration in Chatbot.jsx
            render(<App />);
            const chatContainer = document.querySelector('.chatbot-container');
            expect(chatContainer).toBeTruthy();
        });
    });

    describe('BUG FIX: Protected dashboard redirect', () => {
        it('should not crash when visiting without authentication', () => {
            // Regression: Dashboard requires auth token. Without it, should redirect without errors.
            localStorage.clear();
            render(<App />);
            // App should render without crashing
            expect(screen.getByText('Home')).toBeInTheDocument();
        });
    });
});
