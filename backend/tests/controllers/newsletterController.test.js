const request = require('supertest');
const express = require('express');
const newsletterRoutes = require('../../routes/newsletterRoutes');
const mongoose = require('mongoose');
const Newsletter = require('../../models/newsletterModel');
const app = express();

app.use(express.json());
app.use('/api/newsletter', newsletterRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Newsletter.deleteMany({});
});

afterEach(async () => {
  await Newsletter.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Newsletter Controller', () => {
  it('should subscribe an email to the newsletter', async () => {
    const res = await request(app)
      .post('/api/newsletter/subscribe')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Email subscribed successfully!');
  });

  it('should not subscribe an email that is already subscribed', async () => {
    await Newsletter.create({ email: 'test@example.com' });

    const res = await request(app)
      .post('/api/newsletter/subscribe')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Email is already subscribed');
  });

  it('should unsubscribe an email from the newsletter', async () => {
    await Newsletter.create({ email: 'test@example.com' });

    const res = await request(app)
      .delete('/api/newsletter/unsubscribe')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Email unsubscribed successfully!');
  });

  it('should not unsubscribe an email that is not subscribed', async () => {
    const res = await request(app)
      .delete('/api/newsletter/unsubscribe')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Email is not subscribed');
  });
});