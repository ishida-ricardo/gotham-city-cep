import React from 'react';
import api from "../services/api";

export default class CepList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ceps: []
        };
    }

    componentDidMount = async () => {
        const response = await api.get("/ceps");
        try {
            this.setState({
                ceps: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div style={{ width: '800px', margin: '100px auto' }}>
                <h3>Listagem de CEPs</h3>
                <a href="/ceps/create">
                    <button type="button" className="btn btn-dark" style={{ marginBottom: '10px' }}>Cadastrar CEP</button>
                </a>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">CEP</th>
                        <th scope="col">Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ceps.map((cep, i) => {
                            return (
                                <tr key={i} className="table-light">
                                    <td>{cep.code}</td>
                                    <td>{cep.city}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}