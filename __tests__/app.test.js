const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const path = require('path');
const fs = require('fs');


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

    describe('GET /api', () => {
        test('responds with the list of available endpoints', () => {
          const endpointsFilePath = path.join(__dirname, '../endpoints.json');
          const endpointsData = fs.readFileSync(endpointsFilePath, 'utf8');
          const expectedEndpoints = JSON.parse(endpointsData);
      
          return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
              expect(response.body).toEqual(expectedEndpoints);
            });
        });
      });

      describe('GET /api/articles/:article_id', () => {
        test('responds with an article object', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((response) => {

              const article = response.body.article;

              
              expect(article).toHaveProperty('author');
              expect(article).toHaveProperty('title');
              expect(article).toHaveProperty('article_id');
              expect(article).toHaveProperty('body');
              expect(article).toHaveProperty('topic');
              expect(article).toHaveProperty('created_at');
              expect(article).toHaveProperty('votes');
              expect(article).toHaveProperty('article_img_url');
              expect(article.author).toBe('butter_bridge');
              expect(article.title).toBe('Living in the shadow of a great man');
              expect(article.article_id).toBe(1);
              expect(article.body).toBe('I find this existence challenging');
              expect(article.topic).toBe('mitch');

              console.log(response.body.article.created_at, '<---------')
              
              expect(article.created_at).toBe('2020-07-09T20:11:00.000Z');
              expect(article.votes).toBe(100);
              expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
            });
        });
      
        test('404: responds with a custom 404 message when the article_id is not found', () => {
          return request(app)
            .get('/api/articles/99999')
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe('Article not found');
            });
        });

        test('400: responds with a custom 400 message when article_id is not a number', () => {
          return request(app)
            .get('/api/articles/notAnID')
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe('Bad Request');
            });
        });
        
      });
