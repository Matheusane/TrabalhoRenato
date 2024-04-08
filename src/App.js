import AluEPro from "./Componentes/Aluno&Professor/AluEPro";
import Editoras from "./Componentes/Editora/Editoras";
import Generos from "./Componentes/Genero/Generos";
import Autor from "./Componentes/Autor/Autor";
import Emprestimo from "./Componentes/Emprestimo/Emprestimo";
import TipoLivro from "./Componentes/TipoLivro/TipoLivro";
import ListaLivros from './Componentes/Livro/listaLivros';

import NavBar from "./Componentes/NavBar/NavBar";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "./App.css";

function App() {
  
  
  return (
    <BrowserRouter>
    <NavBar></NavBar>
      <Routes>
        <Route path="/Aluno&Professor">
          <Route path="" element={<AluEPro></AluEPro>}/> 
          </Route>
        <Route path="/Autor">
          <Route path="" element={<Autor></Autor>}/> 
        </Route>
        <Route path="/Generos">
          <Route path="" element={<Generos></Generos>}/> 
        </Route>
        <Route path="/livros">
          <Route path="" element={<ListaLivros></ListaLivros>}/> 
        </Route>
        <Route path="/Editoras">
          <Route path="" element={<Editoras></Editoras>}/> 
        </Route>
        <Route path="/TipoLivro">
          <Route path="" element={<TipoLivro></TipoLivro>}/> 
        </Route>
        <Route path="/Emprestimo">
          <Route path="" element={<Emprestimo></Emprestimo>}/> 
        </Route>
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
