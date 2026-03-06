/**
 * Integration Tests — Backend API Workflows
 * Tests full user workflows spanning multiple API endpoints.
 */
import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import FoodListing from '../models/FoodListing.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { setupTestDB, teardownTestDB, clearTestDB } from './setup.js';

describe('Backend Integration Tests — Full Workflows', () => {
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
            role: 'Volunteer', phone: '3333333333', address: 'Vol Address',
            isTrained: true, isAvailable: true
        });

        const secret = process.env.JWT_SECRET || 'test-secret';
        donorToken = jwt.sign({ user: { id: donorUser._id.toString(), role: 'Donor' } }, secret, { expiresIn: '1h' });
        ngoToken = jwt.sign({ user: { id: ngoUser._id.toString(), role: 'NGO' } }, secret, { expiresIn: '1h' });
        volunteerToken = jwt.sign({ user: { id: volunteerUser._id.toString(), role: 'Volunteer' } }, secret, { expiresIn: '1h' });
    });

    describe('Workflow: Register → Login → Get Profile', () => {
        it('should complete the full auth flow', async () => {
            // Step 1: Register a new user
            const regRes = await request(app).post('/api/auth/register').send({
                name: 'New User', email: 'new@test.com', password: 'password123',
                role: 'Donor', phone: '4444444444', address: 'New Address'
            });
            expect(regRes.statusCode).toEqual(200);
            const token = regRes.body.token;

            // Step 2: Use the token to get profile
            const profileRes = await request(app)
                .get('/api/auth/me')
                .set('x-auth-token', token);
            expect(profileRes.statusCode).toEqual(200);
            expect(profileRes.body.name).toEqual('New User');
            expect(profileRes.body.role).toEqual('Donor');
        });
    });

    describe('Workflow: Donor creates listing → NGO claims it', () => {
        it('should complete the donate-claim flow', async () => {
            // Step 1: Donor creates a listing
            const createRes = await request(app)
                .post('/api/listings')
                .set('x-auth-token', donorToken)
                .send({
                    title: 'Fresh Rice', description: 'Home cooked',
                    quantity: 10, unit: 'kg', category: 'Cooked',
                    expiry_hours: 24, isVeg: true, lat: 13.0827, lng: 80.2707
                });
            expect(createRes.statusCode).toEqual(200);
            const listingId = createRes.body._id;

            // Step 2: NGO claims the listing
            const claimRes = await request(app)
                .put(`/api/listings/${listingId}/status`)
                .set('x-auth-token', ngoToken)
                .send({ status: 'Claimed' });
            expect(claimRes.statusCode).toEqual(200);
            expect(claimRes.body.status).toEqual('Claimed');
            expect(claimRes.body.claimedBy.toString()).toEqual(ngoUser._id.toString());
        });
    });

    describe('Workflow: Create listing → Fetch → Verify it appears', () => {
        it('should show newly created listing in the listings feed', async () => {
            // Step 1: Create
            await request(app)
                .post('/api/listings')
                .set('x-auth-token', donorToken)
                .send({
                    title: 'Integration Test Food', description: 'Testing',
                    quantity: 5, unit: 'kg', category: 'Cooked',
                    expiry_hours: 48, isVeg: true, lat: 13.08, lng: 80.27
                });

            // Step 2: Fetch all
            const res = await request(app).get('/api/listings');
            expect(res.statusCode).toEqual(200);
            const found = res.body.find(l => l.title === 'Integration Test Food');
            expect(found).toBeDefined();
            expect(found.quantity).toEqual(5);
        });
    });

    describe('Workflow: Create listing → Search by name', () => {
        it('should find listing by search query', async () => {
            await request(app)
                .post('/api/listings')
                .set('x-auth-token', donorToken)
                .send({
                    title: 'Unique Biryani Special', description: 'Hyderabadi',
                    quantity: 20, unit: 'kg', category: 'Cooked',
                    expiry_hours: 12, isVeg: false, lat: 17.38, lng: 78.48
                });

            const res = await request(app).get('/api/listings?search=biryani');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0].title).toContain('Biryani');
        });
    });

    describe('Workflow: User profile update', () => {
        it('should update user profile and reflect changes', async () => {
            // Step 1: Update profile
            const updateRes = await request(app)
                .put('/api/auth/update')
                .set('x-auth-token', donorToken)
                .send({ phone: '9999999999', address: 'Updated Address' });
            expect(updateRes.statusCode).toEqual(200);

            // Step 2: Verify update via GET /me
            const profileRes = await request(app)
                .get('/api/auth/me')
                .set('x-auth-token', donorToken);
            expect(profileRes.statusCode).toEqual(200);
            expect(profileRes.body.phone).toEqual('9999999999');
            expect(profileRes.body.address).toEqual('Updated Address');
        });
    });

    describe('Workflow: Bug report submission', () => {
        it('should allow any user to submit a bug report', async () => {
            const res = await request(app)
                .post('/api/bugs')
                .set('x-auth-token', volunteerToken)
                .send({ description: 'Found a UI glitch on the dashboard' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.description).toEqual('Found a UI glitch on the dashboard');
        });
    });

}, 30000);
