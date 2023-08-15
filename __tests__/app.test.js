const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');


beforeEach(() => {
    return seed(testData);
  });
  
afterAll(() => {
    return db.end();
  });
  
    describe('get/api/topics', () => {
        test('responds with an array of topics', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                const topics = response.body.topics;
            expect(Array.isArray(topics)).toBe(true);
            topics.forEach((topic) => {
                expect(topic).toHaveProperty('slug')
                expect(topic).toHaveProperty('description')
            });
            });
        });
    
    });

    describe('Error handling', () => {
        test('404:should responds with a custom 404 message when the path is not found', () => {
        return request(app)
        .get('/api/nonexistentendpoint')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Endpoint not found');
        });
    });
    });

