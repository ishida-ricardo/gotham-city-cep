import React from 'react';

import api from "../services/api";

export default class CepForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: "",
            city: "",
            error: ""
        };

        this.postFormCep = this.postFormCep.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
    }

    postFormCep = async e => {
        
        e.preventDefault();

        try {
            const { code, city } = this.state;
            await api.post("/ceps", { code: code, city: city });
            this.props.history.push("/ceps");
        } catch (err) {
            this.setState({error: err.response.data.message});
        }
    }

    handleCodeChange(e) {
        let num = e.target.value.replace(/[^0-9]/g,'');
        this.setState({code: num});
    }

    handleCityChange(e) {
        this.setState({city: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.postFormCep} >
                    <h3 className="">Cadastro de CEP</h3>
                    <div className="form-group">
                        {this.state.error.length > 0 && <span className="errors">{this.state.error}</span>}
                    </div>
                    <div className="form-group">
                        <label>CEP</label>
                        <input type="text" className="form-control" value={this.state.code} onChange={this.handleCodeChange} required />
                    </div>
                    <div className="form-group">
                        <label>Cidade</label>
                        <input type="text" className="form-control" value={this.state.city} onChange={this.handleCityChange} required />
                    </div>
                    <button type="submit" className="btn btn-dark">Salvar</button> 
                    <a href="/ceps">
                        <button type="button" className="btn btn-dark">Ver listagem</button>
                    </a>
                </form>
            </div>
        );
    }
}