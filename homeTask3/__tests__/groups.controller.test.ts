import express from "express";
import request from "supertest";

import { initExpressLoader } from "../loaders/expressLoader";
import AuthService from "../services/auth"
import { bcryptPassword } from "../utils/helpers";

const mockGroup = {
    id: "1",
    name: 'Dark Side',
    permissions: '{"READ", "WHRITE", "DELETE"}'
};

jest.mock("../services/group", () => {
  return jest.fn().mockImplementation(() => ({
    createGroup: jest.fn().mockResolvedValue({
        id: "1",
        name: 'Dark Side',
        permissions: '{"READ", "WHRITE", "DELETE"}'
    }),
    deleteGroupById: jest.fn().mockResolvedValue([1]),
    getAll: jest.fn().mockResolvedValue([{
        id: "1",
        name: 'Dark Side',
        permissions: '{"READ", "WHRITE", "DELETE"}'
    }]),
    getGroupById: jest.fn().mockResolvedValue({
        id: "1",
        name: 'Dark Side',
        permissions: '{"READ", "WHRITE", "DELETE"}'
    }),
    updateGroupById: jest.fn().mockResolvedValue({
        id: "1",
        name: 'Jedi',
        permissions: '{"READ", "WHRITE", "DELETE"}'
    }),
    addUsersToGroup: jest.fn().mockResolvedValue([]),
  }));
});

const app = express();

initExpressLoader(app);


// setup
// mock AuthService to receive token
async function getMokedToken (password: string) {
const mockPassword = await bcryptPassword(password);
const authService = new AuthService({findOne: jest.fn().mockReturnValue({
    id: "101",
    login: "DarthVader",
    age: 40,
    isDeleted: false,
    password: mockPassword
})} as any);
return authService.login("DarthVader", password);
}

describe("groupsRouter", () => {
    it("should not send groups data when no token is passed", async (done) => {
      request(app).get("/groups/").set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        done();
      });
  });

  it("should not send groups data when token is broken", async (done) => {
    request(app).get("/groups/")
    .set('Authorization' , "Bearer test7456token")
      .then((response) => {
        expect(response.status).toBe(403);
        done();
      });
  });

  it("should send groups data when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("test")
    
    request(app).get("/groups/")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{"id": "1", "name": "Dark Side", "permissions": "{\"READ\", \"WHRITE\", \"DELETE\"}"}])
        done();
      });
  });

  it("should get group by id data when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("test")
    
    request(app).get("/groups/101")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"id": "1", "name": "Dark Side", "permissions": "{\"READ\", \"WHRITE\", \"DELETE\"}"})
        done();
      });
  });

  it("should create group with post request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).post("/groups")
    .set('Authorization' , `Bearer ${token}`)
    .send(mockGroup)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"id": "1", "name": "Dark Side", "permissions": "{\"READ\", \"WHRITE\", \"DELETE\"}"})
        done();
      });
  });

  it("should update group with put request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).put("/groups/1")
    .send({...mockGroup, name: "Jedi"})
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("Group with id 1 was updated successfully")
        done();
      });
  });

  it("should delete group with delete request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).delete("/groups/1")
    .set('Authorization' , `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("Group with id 1 was deleted")
        done();
      });
  });

  it("should add users to the group with post request when token is passed", async (done) => {
    //setup
    const token = await getMokedToken("Password123")
    
    request(app).post("/groups/1/users")
    .set('Authorization' , `Bearer ${token}`)
    .send({userId: "101"})
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual("User with id 101 is joined this group!")
        done();
      });
  });

});