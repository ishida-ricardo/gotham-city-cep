const Cep = require("../../src/models/Cep");

describe("Cep Model", () => {

    it("should validate code with number in range", async () => {
        const cep = new Cep({
            code: 123654
        });
        
        expect(cep.inRange()).toBe(true);
    });

    it("should not validate code with number less than 100000", async () => {
        const cep = new Cep({
            code: 98765
        });
        expect(cep.inRange()).toBe(false);
    });

    it("should not validate code with number greather than 999999", async () => {
        const cep = new Cep({
            code: 1236547
        });
        expect(cep.inRange()).toBe(false);
    });

    it("should validate code that has not recurring digit alternated in pairs", async () => {
        const cep = new Cep({
            code: 123654
        });
        expect(cep.hasRecurringDigitAlternatedInPairs()).toBe(false);
    });

    it("should not validate code that has recurring digit alternated in pairs", async () => {
        const cep = new Cep({
            code: 123256
        });
        expect(cep.hasRecurringDigitAlternatedInPairs()).toBe(true);
    });

});