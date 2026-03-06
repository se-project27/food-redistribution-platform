/**
 * Regression Tests — Backend API
 * Ensures previously fixed bugs and edge cases do not reoccur.
 */
import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import FoodListing from '../models/FoodListing.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { setupTestDB, teardownTestDB, clearTestDB } from './setup.js';

describe('Backend Regression Tests', () => {
    let donorToken, ngoToken, volunteerToken;
    let donorUser, ngoUser, volunteerUser;

    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await clearTestDB();

        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create users for each role
        donorUser = await User.create({
            name: 'Test Donor', email: 'donor@test.com', password: hashedPassword,
            role: 'Donor', phone: '1111111111', address: 'Donor Address'
        });
        ngoUser = await User.create({
            name: 'Test NGO', email: 'ngo@test.com', password: hashedPassword,
            role: 'NGO', phone: '2222222222', address: 'NGO Address', isVerified: true
        });
        volunteerUser = await User.create({
            name: 'Test Volunteer', email: 'volunteer@test.com', password: hashedPassword,
            role: 'Volunteer', phone: '3333333333', address: 'Vol Address', isTrained: true
        });

        const secret = process.env.JWT_SECRET || 'test-secret';
        donorToken = jwt.sign({ user: { id: donorUser._id.toString(), role: 'Donor' } }, secret, { expiresIn: '1h' });
        ngoToken = jwt.sign({ user: { id: ngoUser._id.toString(), role: 'NGO' } }, secret, { expiresIn: '1h' });
        volunteerToken = jwt.sign({ user: { id: volunteerUser._id.toString(), role: 'Volunteer' } }, secret, { expiresIn: '1h' });
    });

    // ─── Auth Regressions ───

    describe('REGRESSION: Duplicate email registration', () => {
        it('should reject registration with an existing email', async () => {
            const res = await request(app).post('/api/auth/register').send({
                name: 'Duplicate', email: 'donor@test.com', password: 'password123',
                role: 'Donor', phone: '9999999999', address: 'New Address'
            });
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('REGRESSION: Auth middleware rejects invalid tokens', () => {
        it('should return 401 with malformed token', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('x-auth-token', 'invalid-token-string');
            expect(res.statusCode).toEqual(401);
        });

        it('should return 401 with no token', async () => {
            const res = await request(app).get('/api/auth/me');
            expect(res.statusCode).toEqual(401);
        });
    });

    // ─── Listings Regressions ───

    describe('REGRESSION: Listing creation requires auth', () => {
        it('should reject listing creation without token', async () => {
            const res = await request(app).post('/api/listings').send({
                title: 'Test', quantity: 5, expiry_hours: 24, lat: 13, lng: 80
            });
            expect(res.statusCode).toEqual(401);
        });
    });

    describe('REGRESSION: Expired listings should not appear in active list', () => {
        it('should filter out expired listings from GET /api/listings', async () => {
            // Create a listing with 0 expiry hours (already expired)
            await FoodListing.create({
                title: 'Expired Food', description: 'Old food', quantity: 5,
                unit: 'kg', category: 'Cooked', expiry_hours: 0,
                donor: donorUser._id, location: { lat: 13, lng: 80 },
                status: 'Available', createdAt: new Date(Date.now() - 86400000) // 1 day ago
            });

            const res = await request(app).get('/api/listings');
            expect(res.statusCode).toEqual(200);

            const expiredItems = res.body.filter(l => l.title === 'Expired Food');
            expect(expiredItems.length).toEqual(0);
        });
    });

    describe('REGRESSION: Listing deletion only by owner or admin', () => {
        it('should not allow NGO to delete donor listing', async () => {
            const listing = await FoodListing.create({
                title: 'Donor Food', description: 'Test', quantity: 10,
                unit: 'kg', category: 'Cooked', expiry_hours: 24,
                donor: donorUser._id, location: { lat: 13, lng: 80 }, status: 'Available'
            });

            const res = await request(app)
                .delete(`/api/listings/${listing._id}`)
                .set('x-auth-token', ngoToken);

            expect(res.statusCode).toEqual(401);
        });
    });

    // ─── Role-Based Access Regressions ───

    describe('REGRESSION: Admin-only routes reject non-admins', () => {
        it('should reject non-admin from getting all users', async () => {
            const res = await request(app)
                .get('/api/auth/all-users')
                .set('x-auth-token', donorToken);
            expect(res.statusCode).toEqual(403);
        });

        it('should reject non-admin from viewing bug reports', async () => {
            const res = await request(app)
                .get('/api/bugs')
                .set('x-auth-token', volunteerToken);
            expect(res.statusCode).toEqual(403);
        });
    });

    // ─── Stats Regressions ───

    describe('REGRESSION: Stats endpoint returns valid structure', () => {
        it('should return stats with correct keys even with no data', async () => {
            const res = await request(app).get('/api/stats');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('total_donations');
            expect(res.body).toHaveProperty('meals_saved');
            expect(res.body).toHaveProperty('co2_saved');
        });
    });

    // ─── Notification Regressions ───

    describe('REGRESSION: Notifications require auth', () => {
        it('should reject notification access without token', async () => {
            const res = await request(app).get('/api/notifications');
            expect(res.statusCode).toEqual(401);
        });
    });

}, 30000);
