const request = require('supertest');
const app = require('../app'); // assuming app.js exports the Express app

describe('Pregnancy Routes', () => {
  let token; // You will use the token from the login test

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = res.body.token;  // Save the token
  });

  it('should add a pregnancy record', async () => {
    const res = await request(app)
      .post('/api/pregnancy')
      .set('Authorization', `Bearer ${token}`)
      .send({
        dueDate: '2024-12-25',
        trimester: 'First',
        milestones: [
          { description: 'First ultrasound', date: '2024-09-01', completed: false }
        ]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should get pregnancy details for the logged-in user', async () => {
    const res = await request(app)
      .get('/api/pregnancy')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});