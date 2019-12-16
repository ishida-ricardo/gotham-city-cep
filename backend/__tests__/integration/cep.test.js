const request = require("supertest");
const mongoose = require('../../src/config/database');
const app = require("../../src/app");
const Cep = require("../../src/models/Cep");
const User = require("../../src/models/User");
const bcrypt = require("bcryptjs");

describe("Cep", () => {
    
    beforeEach(async (done) => {
        await User.deleteMany({ email: "cep@teste.com"});
        await Cep.deleteMany({});
        return done();
    });

    it("should list all registered ceps", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const cep1 = await Cep.create({
            code: 123789,
            city: "Maringá"
        });
        const cep2 = await Cep.create({
            code: 987456,
            city: "Maringá"
        });
        
        const response = await request(app).get("/ceps").set("Authorization", "Bearer "+user.generateToken());
        expect(response.body.length).toBe(2);
    });

    it("should not register with empty data", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: "",
            city: ""
        };

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        expect(response.status).toBe(422);
    });

    it("should not register if cep exists", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: 852713,
            city: "Maringá"
        };

        await Cep.create(data);

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        expect(response.status).toBe(422);
    });

    it("should not register with alternating repetitive digit in pairs", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: 852513,
            city: "Maringá"
        };

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        expect(response.status).toBe(422);
    });

    it("should not register with code less than 100000", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: 98765,
            city: "Maringá"
        };

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        expect(response.status).toBe(422);
    });

    it("should not register with code greater than 999999", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: 11234561,
            city: "Maringá"
        };

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        expect(response.status).toBe(422);
    });

    it("should register with valid data", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "cep@teste.com",
           password: pass
        });

        const data = {
            code: 123456,
            city: "Maringá"
        };

        const response = await request(app).post("/ceps").set("Authorization", "Bearer "+user.generateToken()).send(data);
        console.log(response.error)
        expect(response.status).toBe(201);
    });
    
});
