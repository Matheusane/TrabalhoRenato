import React, { useState, useEffect } from 'react';
import EmprestimoService from '../services/emprestimoService.js';
import FormEmprestimo from './FormEmprestimo.jsx';
import FormFiltro from './FormFiltro.jsx';


const emprestimoService = new EmprestimoService()


function TabelaEmprestimo({ atualizar }) {

    const [confirmacaoDelete, setConfirmacaoDelete] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [emprestimos, setEmprestimos] = useState([]);

    const carregaEmprestimos = async () => {
        try {
            const dados = await emprestimoService.getAllEmprestimos();
            setEmprestimos(dados);
        } catch (error) {
            console.error("Erro ao carregar os emprestimos: ", error);
        }
    };

    useEffect(() => {
        carregaEmprestimos();
    }, [atualizar]);


    const handleDelete = async (ID) => {
        setConfirmacaoDelete(ID);
        setShowConfirmation(true);
    };


    const confirmDelete = async () => {
        if (confirmacaoDelete) {
            await emprestimoService.deleteEmprestimo(confirmacaoDelete);
            const dados = await emprestimoService.getAllEmprestimos();
            setEmprestimos(dados);
            setConfirmacaoDelete(null);
        }
        setShowConfirmation(false);
    };

    const cancelDelete = () => {
        setConfirmacaoDelete(null);
        setShowConfirmation(false);
    };

    const [selectedEmprestimo, setSelectedEmprestimo] = useState(null)
    const handleEdit = async (emprestimo) => {
        setSelectedEmprestimo(emprestimo)
    }


    const handleUpdate = async () => {
        await carregaEmprestimos()
    }


    const handleUpDateFiltro = async (emprestimosFiltrados) => {
        setEmprestimos(emprestimosFiltrados)
    }
    

    return (
        <>
            <FormEmprestimo selectedEmprestimo={selectedEmprestimo} onUpdate={handleUpdate}></FormEmprestimo>
            <div className='conteudo-extra'>
                <FormFiltro onUpdate={handleUpDateFiltro}></FormFiltro>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col ">ID</th>
                            <th scope="col">ID Livro</th>
                            <th scope="col">ID Usuario</th>
                            <th scope="col">Data Emprestimo</th>
                            <th scope="col">Data Devolução</th>
                            <th scope="col">Ações</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            emprestimos.map((emprestimo => (
                                <tr>
                                    <th scope="row ">{emprestimo.ID}</th>
                                    <td >{emprestimo.livro.editora.id}</td>
                                    <td>{emprestimo.alunoProfessor.id}</td>
                                    <td>{(emprestimo.dEmprestimo.slice(8,10).concat(emprestimo.dEmprestimo.slice(4,8)).concat(emprestimo.dEmprestimo.slice(0,4))).replaceAll('-', '/')}</td>
                                    <td>{(emprestimo.dDevolucao.slice(8,10).concat(emprestimo.dDevolucao.slice(4,8)).concat(emprestimo.dDevolucao.slice(0,4))).replaceAll('-', '/')}</td>
                                    <td>
                                        <button type='button' onClick={() => handleDelete(emprestimo.ID)} className="btn btn-danger">EXCLUIR</button>
                                        <button type='button' onClick={() => handleEdit(emprestimo)} className="btn btn-primary">EDITAR</button>
                                    </td>

                                </tr>
                            )))
                        }
                    </tbody>

                </table>
                {showConfirmation && (
                    <div className="confirmation">
                        <p>Confirma a exclusão do emprestimo?</p>
                        <button className="btn btn-danger" onClick={confirmDelete}>
                            Sim
                        </button>
                        <button className="btn btn-primary" onClick={cancelDelete}>
                            Não
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TabelaEmprestimo;
