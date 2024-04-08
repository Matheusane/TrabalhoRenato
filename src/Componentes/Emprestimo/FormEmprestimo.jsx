import React, { useEffect, useState } from 'react';
import EmprestimoService from '../services/emprestimoService.js';
import InputMask from "react-input-mask";

const emprestimoService = new EmprestimoService()


function FormEmprestimo({ selectedEmprestimo, onUpdate, setSelectedEmprestimo }) {

    const formatDate = (date) => {
        return `${new Date(date).getFullYear()}-${(new Date(date).getMonth()+1).toString().padStart(2, "0")}-${new Date(date).getDate().toString().padStart(2, "0")}`;
    };

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (selectedEmprestimo != null) {
            setEmprestimoData({
                ...selectedEmprestimo,
                dEmprestimo: formatDate(selectedEmprestimo.dEmprestimo),
                dDevolucao: formatDate(selectedEmprestimo.dDevolucao)
            });
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [selectedEmprestimo]);



    const [alerta, setAlerta] = useState('')
    const [emprestimoData, setEmprestimoData] = useState({
        IDLivro: "",
        IDUsuario: "",
        dEmprestimo: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
        dDevolucao: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEmprestimoData({ ...emprestimoData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (selectedEmprestimo == null) {
                await emprestimoService.createEmprestimo(emprestimoData);
                setAlerta("Emprestimo cadastrado com sucesso!");
                setIDLivro('');
                setIDUsuario('');
                setdEmprestimo('');
                setdDevolucao('');
            } else {
                await emprestimoService.updateEmprestimo(selectedEmprestimo.ID, emprestimoData);
                setAlerta("Emprestimo atualizado com sucesso!");
                setIsEditMode(false);

                onUpdate();
                setEmprestimoData({
                    IDLivro: "",
                    IDUsuario: "",
                    dEmprestimo: "",
                    dDevolucao: "",
                });

            }

        } catch (error) {
            setAlerta("Emprestimo não foi cadastrado !");
        } finally {
            setTimeout(() => {
                setAlerta('');
            }, 2500);
        }
    };


    const [IDLivro, setIDLivro] = useState('');
    const [IDUsuario, setIDUsuario] = useState('');
    const [dEmprestimo, setdEmprestimo] = useState('');
    const [dDevolucao, setdDevolucao] = useState('');
    const isFormValid =
        ((IDLivro.length != null &&
            IDUsuario.length >= 3 &&
            dEmprestimo != null &&
            dDevolucao != null) || isEditMode)

    const relebeSoNumero = (valor) => {
        const regexSomenteNumero = /^[0-9]+$/;
        return regexSomenteNumero.test(valor) || valor === ""
    }

    return (
        <>

            <div className='conterner'>
                <div className="formulario fundo">
                    <form
                        className="row g-3 needs-validation"
                        onSubmit={handleSubmit}
                    >
                        <div className={`form-group col-md-5`}>
                            <label>
                                ID do Livro:
                            </label>
                            <input
                                value={IDLivro || emprestimoData.IDLivro}
                                type="text"
                                className={`form-control`}
                                name="IDLivro"
                                placeholder="Digite o ID do livro"
                                onChange={(e) => {
                                    setIDLivro(prev => relebeSoNumero(e.target.value) ? e.target.value : prev);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por Favor, digite o ID!
                            </div>
                        </div>
                        <div className={`form-group col-md-5`}>
                            <label>
                                ID do Usuario:
                            </label>
                            <InputMask
                                mask="999.999.999-99"
                                type="text"
                                maskPlaceholder={null}
                                className={`form-control`}
                                id="IDUsuario"
                                name="IDUsuario"
                                value={IDUsuario || emprestimoData.IDUsuario}
                                onChange={(e) => {
                                    setIDUsuario(e.target.value);
                                    handleInputChange(e);
                                }}
                                placeholder="Digite o ID do livro"
                                required
                            
                            />
                            <div className="invalid-feedback">
                                Por Favor, digite o ID!
                            </div>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Data do Devolucao:
                            </label>
                            <input
                                value={emprestimoData.dDevolucao}
                                type="date"
                                className={`form-control`}
                                name="dDevolucao"
                                onChange={(e) => {
                                    setdDevolucao(e.target.value);
                                    handleInputChange(e);
                                }}
                                min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${(new Date().getDate() + 1).toString().padStart(2, "0")}`}
                                required

                            />
                            <div className="invalid-feedback">
                                Por favor, informe a data da devolução!
                            </div>
                        </div>

                        <div className="col-12 centralizar justify-content-evenly">
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                disabled={!isFormValid}
                            >
                                {isEditMode ? 'Atualizar' : 'Cadastrar'}
                            </button>
                        </div>

                        {alerta && (

                            <div className="text-center mt-3">


                                <p className='bg-success p-2 rounded d-inline'>{alerta}</p>
                            </div>
                        )}
                    </form>

                </div>


            </div>
        </>
    );
}

export default FormEmprestimo;
