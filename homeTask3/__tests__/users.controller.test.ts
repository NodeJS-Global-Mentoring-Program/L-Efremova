import express from "express";
import request from "supertest";

import { initExpressLoader } from "../loaders/expressLoader";
import AuthService from "../services/auth"
import { bcryptPassword } from "../utils/helpers";

const mockUser = {
  id: "101",
  login: "DarthVader",
  age: 40,
  isDeleted: false,
};

jest.mock("../services/user", () => {
  return jest.fn().mockImplementation(() => ({
    createUser: jest.fn().mockResolvedValue({
      id: "101",
      login: "DarthVader",
      age: 40,
      isDeleted: false,
    }),
    deleteUserById: jest.fn().mockResolvedValue([1]),
    destroyUserById: jest.fn(),
    getAll: jest.fn().mockResolvedValue([{
      id: "101",
      login: "DarthVader",
      age: 40,
      isDeleted: false
    }]),
    getUserById: jest.fn().mockResolvedValue({
      id: "101",
      login: "DarthVader",
      age: 40,
      isDeleted: false,
    }),
    updateUserById: jest.fn().mockResolvedValue({
      id: "101",
      login: "Anakin",
      age: 40,
      isDeleted: false,
    }),
    removeUserFromGroups: jest.fn()
  }));
});

const app = express();

initExpressLoader(app);


// setup
// mock AuthService to receive token
async function getMokedToken (password: string) {
const mockPassword = await bcryptPassword(password);
const authService = new AuthService({findOne: jest.fn().mockReturnValue({...mockUser, password: mockPassword})} as any);
return authService.login(mockUser.login, password);
}

describe("usersRouter", () => {
    it("should not send users data when no token is passed", async (done) => {
      request(app).get("/users/").set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        done();
      });
  });

  it("should not send users data when token is broken", async (done) => {
    request(app).get("/users/")
    .set('Authorization' , "Bearer test7456token")
      .then((response) => {
        expect(response.status).toBe(403);
        done();
      });
  });

  it("should send users data when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("test")
    
    request(app).get("/users/")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockUser])
        done();
      });
  });

  it("should get user by id data when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("test")
    
    request(app).get("/users/101")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser)
        done();
      });
  });

  it("should create user with post request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).post("/users")
    .set('Authorization' , `Bearer ${token}`)
    .send({...mockUser, password: "Password123"})
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser)
        done();
      });
  });

  it("should update user with patch request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).patch("/users/101")
    .send({login: "Anakin"})
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("User with id 101 was updated successfully")
        done();
      });
  });

  it("should update user with put request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).put("/users/101")
    .send({...mockUser, login: "Anakin", password: "Password123"})
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("User with id 101 was updated successfully")
        done();
      });
  });

  it("should delete user with delete request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).delete("/users/101")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("User with id 101 was deleted")
        done();
      });
  });

});