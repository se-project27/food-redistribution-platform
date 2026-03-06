// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for jsdom (used by framer-motion)
if (typeof globalThis.IntersectionObserver === 'undefined') {
    globalThis.IntersectionObserver = class IntersectionObserver {
        constructor(callback) {
            this.callback = callback;
        }
        observe() { return null; }
        unobserve() { return null; }
        disconnect() { return null; }
    };
}

// Polyfill ResizeObserver for jsdom
if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class ResizeObserver {
        constructor(callback) {
            this.callback = callback;
        }
        observe() { return null; }
        unobserve() { return null; }
        disconnect() { return null; }
    };
}
