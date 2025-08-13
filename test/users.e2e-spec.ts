import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) creates user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Alice',
        email: 'alice@example.com',
      }),
    );
  });

  it('/users (GET) returns created users', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Bob', email: 'bob@example.com' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
