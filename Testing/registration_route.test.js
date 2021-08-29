const express = require('express');
const request = require('supertest');
 
const user_route = require('../routes/registration_routes');
require('./setup');
 
const app = express();
app.use(express.json());
app.use("/", user_route);
 
describe('Test for user route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/registration/insert')
        .send({
            "username":"Roshan",
            "fullname": "Roshan Gautam",
            "address": "Maitidevi, Kathmandu",
            "phone_number": "980898989",
            "email":"roshan123@gmail.com",
             "userType": "Tourist",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });
 
    test('should not be able to register a user without a phone no', () => {
        return request(app).post('/registration/insert')
        .send({
            "username":"Roshan",
            "fullname": "Roshan Gautam",
            "address": "Maitidevi, Kathmandu",
            "phone_number": "980898989",
             "userType": "Tourist",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
 
    test('should be able to login', () => {
        return request(app).post('/registration/login')
        .send({
            "email":"roshan123@gmail.com",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(200);
        });
    });
 
    test('should not be able to login with wrong password', () => {
        return request(app).post('/registration/login')
        .send({
            "email":"roshan123@gmail.com",
             "password": "wrong_password"
        })
        .then(res => {
            expect(res.statusCode).toBe(    403);
        });
    });
    
});