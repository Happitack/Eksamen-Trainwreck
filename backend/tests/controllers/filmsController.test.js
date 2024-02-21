const request = require('supertest');
const express = require('express');
const filmsRoutes = require('../../routes/filmsRoutes');
const mongoose = require('mongoose');
const Film = require('../../models/filmsModel');
const app = express();

app.use(express.json());
app.use('/api/films', filmsRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Film.deleteMany({});
});

afterEach(async () => {
  await Film.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Films Controller', () => {
  let createdFilm;

  beforeEach(async () => {
    createdFilm = await Film.create({
      title: 'Test Film',
      description: 'Test Description',
      releaseDate: '2022-01-01',
      imageName: 'test.jpg'
    });
  });

  it('should get all films', async () => {
    const res = await request(app).get('/api/films');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new film', async () => {
    const res = await request(app)
      .post('/api/films')
      .send({
        title: 'Test Film 2',
        description: 'Test Description 2',
        releaseDate: '2022-01-02',
        imageName: 'test2.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Film 2');
  });

  it('should get a film by id', async () => {
    const res = await request(app).get(`/api/films/${createdFilm._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Film');
  });

  it('should update a film by id', async () => {
    const res = await request(app)
      .put(`/api/films/${createdFilm._id}`)
      .send({
        title: 'Updated Test Film',
        description: 'Updated Test Description',
        releaseDate: '2022-01-03',
        imageName: 'updated.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Test Film');
  });

  it('should delete a film by id', async () => {
    const res = await request(app).delete(`/api/films/${createdFilm._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(String(createdFilm._id));
  });
});