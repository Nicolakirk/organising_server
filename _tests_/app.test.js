const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");
// const { convertTimestampToDate } = require("../db/seeds/utils.js");

describe("GET/api/tasks/:user_id/tasks", () => {
  test("status:200 - responds with an array of tasks for the given user_id, with the correct properties", () => {
    return request(app)
      .get("/api/tasks/1/tasks")
      .expect(200)
      .then(({ body }) => {
        
        const { tasks } = body;

        expect(tasks).toBeInstanceOf(Array);
        expect(tasks).toHaveLength(3);
        tasks.forEach((task) => {
          expect(task).toMatchObject({
            task_id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
            user_id: expect.any(Number),
          });
        });
      });
  });
});

describe("get/api/task/:task id", () =>{
  test("status 200 - returns an task object correctly based on the task id ", () => {
      return request(app)
          .get('/api/tasks/2')
          .expect(200)
          .then(({ body }) => {
              const { task } = body;
              expect(task).toBeInstanceOf(Object);
              expect(task).toMatchObject({
              
              name: "map journey",
              description: "planning ",
              status: "To-do",
              user_id: 1,
          })
  
              })
          })
          })
