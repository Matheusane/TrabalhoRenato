import React from 'react';
import TabelaEmprestimo from './TabelaEmprestimo.jsx';




function Emprestimo() {




    return (
        <>
            <div className="container centralizacao">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div className="flex-container-cabecalho">
                            <div className="cabecalho" style={{ }}>Emprestimo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <TabelaEmprestimo></TabelaEmprestimo>
            </div>
        </>
    );
}

export default Emprestimo;
