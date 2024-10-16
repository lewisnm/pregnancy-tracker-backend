const request = require('supertest');
const app = require('../app'); 
const User = require('../models/User');

describe('Authentication Routes', () => {
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });
  
    console.log('Response body:', res.body);  // Log the entire response body
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
  
});
