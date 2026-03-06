/**
 * Integration Tests — Frontend Components
 * Tests multiple components working together as an integrated unit.
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

describe('Frontend Integration Tests', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    describe('Landing Page Integration', () => {
        it('should render Navbar and Chatbot together on landing page', () => {
            render(<App />);
            // Navbar should render with Home link
            expect(screen.getByText('Home')).toBeInTheDocument();
            // Chatbot should be present globally
            const chatContainer = document.querySelector('.chatbot-container');
            expect(chatContainer).toBeTruthy();
        });

        it('should render all Navbar navigation links', () => {
            render(<App />);
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Impact')).toBeInTheDocument();
            expect(screen.getByText('Blog')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('should render Solutions dropdown in Navbar', () => {
            render(<App />);
            expect(screen.getByText('Solutions')).toBeInTheDocument();
        });

        it('should render Get Started and Log in buttons', () => {
            render(<App />);
            expect(screen.getByText('Get Started')).toBeInTheDocument();
            expect(screen.getByText('Log in')).toBeInTheDocument();
        });
    });

    describe('Route Guard Integration', () => {
        it('should show landing page content when not authenticated', () => {
            render(<App />);
            // Landing page should show Navbar
            expect(screen.getByText('Home')).toBeInTheDocument();
        });

        it('should have chatbot present on all pages', () => {
            render(<App />);
            const chatContainer = document.querySelector('.chatbot-container');
            expect(chatContainer).toBeTruthy();
        });
    });
});
