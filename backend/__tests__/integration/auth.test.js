const request = require("supertest");
const mongoose = require('../../src/config/database');
const app = require("../../src/app");
const User = require("../../src/models/User");
const bcrypt = require("bcryptjs");

describe("Authentication", () => {
    
    beforeEach(async (done) => {
        await User.deleteMany({ email: "auth@teste.com"});
        return done();
    });

    it("should authenticate with valid credentials", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "auth@teste.com",
           password: pass
        });
        
        const response = await request(app).post("/auth").send({email: user.email, password: "teste"});
        expect(response.status).toBe(200);
    });

    it("should not authenticate with invalid credentials", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "auth@teste.com",
           password: pass
        });

        const response = await request(app).post("/auth").send({email: user.email, password: "123"});
        expect(response.status).toBe(401);
    });

    it("should return jwt token when authenticated", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "auth@teste.com",
           password: pass
        });

        const response = await request(app).post("/auth").send({email: user.email, password: "teste"});
        expect(response.body).toHaveProperty("token");
    });

    it("should be able to access private routes when authenticated", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "auth@teste.com",
           password: pass
        });

        const response = await request(app).get("/ceps").set("Authorization", "Bearer "+user.generateToken());
        expect(response.status).toBe(200);
    });

    it("should not be able to access private routes without jwt token", async () => {
        const response = await request(app).get("/ceps");
        expect(response.status).toBe(401);
    });

    it("should not be able to access private routes with invalid jwt token", async () => {
        const response = await request(app).get("/ceps").set("Authorization", "Bearer 321321");
        expect(response.status).toBe(401);
    });

});