
import { describe, it, expect } from 'vitest';
import { shouldBanUser } from './RatingUtils';

describe('RatingUtils', () => {
    it('should ban user when average rating is less than 2', () => {
        expect(shouldBanUser(1.5)).toBe(true);
    });

    it('should not ban user when average rating is equal to 2', () => {
        expect(shouldBanUser(2)).toBe(false);
    });

    it('should not ban user when average rating is greater than 2', () => {
        expect(shouldBanUser(3)).toBe(false);
    });
});
