import React from 'react';
import api from "../services/api";
import { login } from "../services/auth";
import { validEmailRegex } from "../validations/email";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {
                all: "",
                email: ""
            }
        };

        this.postFormLogin = this.postFormLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    postFormLogin = async e => {

        e.preventDefault();
        
        const { email, password } = this.state;
        let errors = this.state.errors;
        errors.all = "";
        errors.email = "";
        if(email.length === 0 || !validEmailRegex.test(email)) {
            errors.email = "Informe um e-mail válido!";
            this.setState({errors: errors});
        }
        else {
            try {
                const response = await api.post("/auth", { email, password });
                login(response.data.token);
                this.props.history.push("/ceps/create");
            } catch (error) {
                errors.all = error.response.data.message;
                this.setState({errors: errors});
            }
        }
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.postFormLogin}>
                    <h3 className="">Login</h3>
                    <div className="form-group">
                        {this.state.errors.all.length > 0 && <span className="errors">{this.state.errors.all}</span>}
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} required />
                        {this.state.errors.email.length > 0 && <span className="errors">{this.state.errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} required />
                    </div>
                    <button type="submit" className="btn btn-dark">Entrar</button>
                </form>
            </div>
        );
    }
}