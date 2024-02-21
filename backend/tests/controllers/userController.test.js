const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Controller', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    const user = await User.findOne({ username: 'testuser' });
    expect(user).not.toBeNull();
    const passwordMatch = await bcrypt.compare('testpassword', user.password);
    expect(passwordMatch).toBe(true);
  });

  it('should login a user', async () => {
    const password = 'testpassword';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username: 'testuser', password: hashedPassword });
    await user.save();

    const res = await request(app)
      .post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should not login a user with incorrect password', async () => {
    const password = 'testpassword';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username: 'testuser', password: hashedPassword });
    await user.save();

    const res = await request(app)
      .post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
  });
});