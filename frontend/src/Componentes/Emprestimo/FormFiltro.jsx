import { useState } from "react";
import EmprestimoService from "../services/emprestimoService";
import './Emprestimo.css';

const emprestimoService = new EmprestimoService();

function FormFiltro({ onUpdate }) {
    const [filtroData, setFiltroData] = useState({IDLivro: '' });

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFiltroData({ ...filtroData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const emprestimosFiltrados = await emprestimoService.filtrar(filtroData);
            onUpdate(emprestimosFiltrados);
        } catch (error) {
            console.log("Erro ao filtrar emprestimos:");
        }
    };
    return (
        <div className="row">
            <form onSubmit={handleSubmit} className="mb-3">
                <h3>Filtrar Emprestimo</h3>
                <div className="d-flex flex-wrap input-group mb-2">
                    <div className="mb-3">
                        <div className="input-group">
                            <label className="input-group-text custom-label-height">IDLivro:</label>
                            <input
                                type="text"
                                name="IDLivro"
                                id="inputNome"
                                value={filtroData.IDLivro}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="ms-auto">
                        <button type="submit" className="btn btn-primary">
                            Filtrar
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default FormFiltro;
