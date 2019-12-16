const User = require("../../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

describe("User Model", () => {

    beforeEach(async (done) => {
        await User.deleteMany({ email: "user@teste.com"});
        return done();
    });

    it("should validate password with valid password", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = new User({
           name: "Teste",
           email: "user@teste.com",
           password: pass
        });

        const check = await user.checkPassword("teste");
        expect(check).toBe(true);
    });

    it("should not validate password with invalid password", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = new User({
           name: "Teste",
           email: "user@teste.com",
           password: pass
        });

        const check = await user.checkPassword("123");
        expect(check).toBe(false);
    });

    it("should contain user id in jwt token", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "user@teste.com",
           password: pass
        });

        const token = user.generateToken();
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        expect(decoded.id).toBe(user.id);
    });

    it("should not contain password in User json", async () => {
        const pass = await bcrypt.hash("teste", 8);
        const user = await User.create({
           name: "Teste",
           email: "user@teste.com",
           password: pass
        });

        const json = user.toJSON();
        expect(json).not.toHaveProperty('password');
    });

});