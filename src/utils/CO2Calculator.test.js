
import { describe, it, expect } from 'vitest';
import { calculateCO2 } from './CO2Calculator';

describe('CO2Calculator', () => {
    it('calculates co2 correctly', () => {
        expect(calculateCO2(10)).toBe(5);
        expect(calculateCO2(0)).toBe(0);
        expect(calculateCO2(100)).toBe(50);
    });
});
