var mongoose = require('../config/database');
var Schema = mongoose.Schema;

const CepSchema = new Schema({
    code: {
        type: Number,
        require: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: { 
        type: Date, 
        default: Date.now()
    },
    updated_at: { 
        type: Date, 
        default: Date.now() 
    },
});

CepSchema.methods.inRange = function() {
    return (this.code >= 100000 && this.code <= 999999);
};

CepSchema.methods.hasRecurringDigitAlternatedInPairs = function() {
    let num = this.code.toString();
    for(let i = 0; i <= 4; i++) {
        if(num[i] == num[i+2])
            return true;
    }
    return false;
};

CepSchema.pre('save', function(next) {
    let num = this.code.toString().replace(/[^0-9]/g,'');
    num = num.replace(/^(0+)(\d)/g,"$2");
    this.code = parseInt(num);

    if(!this.inRange())
        next(new Error('O CEP deve estar entre 100000 e 999999.'));

    if(this.hasRecurringDigitAlternatedInPairs())
        next(new Error('O CEP não pode ter nenhum digito repetitivo alternado em pares.'));

    next();
});

const Cep = mongoose.model('Cep', CepSchema);

module.exports = Cep;