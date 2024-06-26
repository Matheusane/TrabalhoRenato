import React, { useEffect, useState } from "react";
import LivroService from "../services/livroService";
import EditoraService from '../services/EditoraService.js';

const livroService = new LivroService();
const editoraService = new EditoraService();

function FormLivro({ selectedLivro, onUpdate }) {
  const [generos, setGeneros] = useState([{
    codigo: 0,
    descricao: " Nenhum genero encontrado"
  }])
  const [editoras, setEditora] = useState([{
    codigo: 0,
    Nome: " Nenhuma editora encontrada"
  }]);
  const [livroData, setLivroData] = useState({
    NomeLivro: "",
    codigoLivro: "",
    numeroPagina: "",
    editora: "",
    genero: "",
    dataPublicacao: "",
  });


  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch('http://localhost:3001/genero');
        const data = await response.json();
        setGeneros(data);
      } catch (error) {
        console.error('Erro ao obter gêneros:', error);
      }
    };

    fetchGeneros();
  }, []);
  const carregaEditoras = async () => {
    try {
      const dados = await editoraService.getAllEditora();
      setEditora(dados)
    } catch (error) {
      console.error('erro ao carregar livros', error)
    }
  }
  useEffect(() => {
    carregaEditoras()

  }, []);



  useEffect(() => {
    if (selectedLivro != null) {
      setLivroData(selectedLivro);
    }
  }, [selectedLivro])
    ;

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLivroData({ ...livroData, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};


    if (livroData.NomeLivro.trim().length < 3) {
      newErrors.NomeLivro = 'O Nome do Livro deve ter no mínimo 3 caracteres';
      valid = false;
    }


    if (!/^\d+$/.test(livroData.numeroPagina)) {
      newErrors.numeroPagina = 'Número de Páginas deve conter apenas números';
      valid = false;
    }



    if (!livroData.genero) {
      newErrors.genero = 'Selecione o Gênero';
      valid = false;
    }


    if (!livroData.dataPublicacao) {
      newErrors.dataPublicacao = 'Data de Publicação é obrigatória';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        if (selectedLivro == null) {
          await livroService.createLivro(livroData);
          alert("Livro cadastrado");
        } else {
          await livroService.updateLivro(selectedLivro.codigoLivro, livroData);
          alert("Atualizado");
        }
        onUpdate();
        setLivroData({
          NomeLivro: "",
          codigoLivro: "",
          numeroPagina: "",
          editora: "",
          genero: "",
          dataPublicacao: "",
        });
      } catch (error) {
        alert("Não cadastrado");
      }
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <div>
      <div className="container centralizacao">
        <div className="row">
          <div className="col-lg-5 col-md-10 col-sm-10 mx-auto">
            <div>
              <div className="cabecalho" style={{ color: "#ddd" }}>
                Cadastro de Livros
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="formulario fundo">
        <form onSubmit={handleSubmit} className="row g-3 needs-validation">

          <div className="form-group col-md-5">
            <label>Código do Livro:</label>
            <input
              type="text"
              name="codigoLivro"
              className="form-control"
              value={livroData.codigoLivro}
              onChange={handleInputChange}
            />
            {errors.codigoLivro && <p style={{ color: "red" }}>{errors.codigoLivro}</p>}
          </div>

          <div className="form-group col-md-5">
            <label>Nome do Livro:</label>
            <input
              type="text"
              name="NomeLivro"
              className="form-control"
              value={livroData.NomeLivro}
              onChange={handleInputChange}
            />
            {errors.NomeLivro && <p style={{ color: "red" }}>{errors.NomeLivro}</p>}
          </div>


          <div className="form-group col-md-5">
            <label>Número de Páginas:</label>
            <input
              type="text"
              name="numeroPagina"
              className="form-control"
              value={livroData.numeroPagina}
              onChange={handleInputChange}
            />
            {errors.numeroPagina && <p style={{ color: "red" }}>{errors.numeroPagina}</p>}
          </div>

          <div className="form-group col-md-5">
            <label>Editora:</label>
            <select
              id="editora"
              name="editora"
              className="form-select"
              value={livroData.editoras}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma Editora</option>
              {editoras.map(editora => (
                <option key={editora.codigo} value={editora.codigo}>{editora.Nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-5">
            <label>Gênero:</label>
            <select
              id="genero"
              name="genero"
              className="form-select"
              value={livroData.generos}
              onChange={handleInputChange}
            >
              <option value="">Selecione um Genero</option>
              {generos.map(genero => (
                <option key={genero.codigo} value={genero.descricao}>{genero.descricao}</option>
              ))}
            </select>
            {errors.genero && <p style={{ color: "red" }}>{errors.genero}</p>}
          </div>

          <div className="form-group col-md-5">
            <label>Data de Publicação:</label>
            <input
              type="date"
              name="dataPublicacao"
              className="form-control"
              value={livroData.dataPublicacao}
              onChange={handleInputChange}
              max={`${new Date().getFullYear()}-${new Date().getMonth().toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`}
            />
            {errors.dataPublicacao && <p style={{ color: "red" }}>{errors.dataPublicacao}</p>}
          </div>

          <div className="form-group col-md-12">
            <button type="submit" className="btn btn-outline-success">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLivro;
