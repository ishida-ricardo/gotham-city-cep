const Cep = require("../../src/models/Cep");

class CepController {

    async index(req, res) {
        try {
            const ceps = await Cep.find({});
            return res.status(200).send(ceps);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { code, city } = req.body;

            if(!code || code.length === 0)
                return res.status(422).send({ message: "O campo CEP é obrigatório." });
                
            if(!city || city.length === 0)
                return res.status(422).send({ message: "O campo Cidade é obrigatório." });
    
            const cepExists = await Cep.findOne({ code: code });
            if(cepExists)
                return res.status(422).send({ message: "Este CEP já existe." });

            const cep = await Cep.create({
                code: code,
                city: city
            });

            return res.status(201).send(cep);
        } catch (error) {
            return res.status(422).send({ message: error.message });
        }
    }    
}

module.exports = new CepController();