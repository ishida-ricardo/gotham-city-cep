const User = require("../models/User");

class AuthController {

    async auth(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({ email });
    
            if(!user)
                return res.status(401).send({ message: "E-mail e/ou senha incorreto(s)." });
    
            if(!(await user.checkPassword(password)))
                return res.status(401).send({ message: "E-mail e/ou senha incorreto(s)." });
    
            return res.status(200).send({user: user, token: user.generateToken()});
            
        } catch (error) {
            return res.status(401).send({ message: error.message });
        }
    }
}

module.exports = new AuthController();