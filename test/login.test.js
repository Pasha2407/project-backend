require('dotenv').config()

const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const { userModel } = require('../models/users')

const { DB_TEST_URI } = process.env

describe('login', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_TEST_URI)
        await userModel.deleteMany()
    })

    afterAll(async () => {
        await mongoose.disconnect(DB_TEST_URI)
    })

    it('should register new user', async () => {
        const response = await supertest(app).post('/api/users/register').send({
            email: 'test@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(201)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                subscription: expect.any(String),
            })
        )
    })

    it('should login new user', async () => {
        const response = await supertest(app).post('/api/users/login').send({
            email: 'test@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(typeof response.body.token).toBe('string')

        expect(response.body.user).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                subscription: expect.any(String),
            })
        )
    })
})