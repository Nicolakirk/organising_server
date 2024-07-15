const request = require("supertest");
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
            user_id: 1,
          });
        });
      });
  });
});
