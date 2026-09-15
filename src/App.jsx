// Importar o Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importar componentes
import Formulario from "./Componentes/Formulario";
import Tabela from "./Componentes/Tabela";

// Hook useEffect useState
import { useEffect, useState } from "react";

// Componente
function App(){

    // Hook useState
    const [pessoas, setPessoas] = useState([]);
    const[botaoCadastrar, setBotaoCadastrar] = useState(true);
    const[pessoa, setPessoa] = useState({id:null, nome:"", cidade:""});

    // Hook useEffect
    useEffect(() => {
        fetch("http://localhost:8080/selecionar")
        .then(resposta => resposta.json())
        .then(dados => setPessoas(dados));
    }, []);

    // Atualizar objeto pessoa
    const atualizarPessoa = (e) => {
      const {name, value} = e.target;
      setPessoa({...pessoa, [name]:value});
    }

    //Cadastrar
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(pessoa)
        })
        .then(retorno => retorno.json())
        .then(p => {
            setPessoas(vetor => [...vetor, p]);
            setPessoa({id:null, nome:"", cidade:""});
        })
    }

    // selecionar pessoa específica
    const selecionarPessoa = (indice) => {
       setPessoa(pessoas[indice]);
       setBotaoCadastrar(false);
    }

    // Cancelar
    const cancelar = () => {
        setPessoa({id:null, nome:"", cidade:""});
        setBotaoCadastrar(true);
    }

    // Alterar
    const alterar = () => {
        fetch("http://localhost:8080/alterar/"+pessoa.id, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(pessoa)
        })
        .then(retorno => retorno.json())
        .then(p => {
            setPessoas(pessoas.map(obj => obj.id === p.id ? p : obj));
            cancelar();
        });
    }

    // Remover
    const remover = () => {
        fetch("http://localhost:8080/remover/"+pessoa.id, {
            method:"DELETE"
        })
        .then(() => {
            setPessoas(pessoas.filter(obj => obj.id !== pessoa.id));
            cancelar();
        })
    }

// Render 
return(
    <>
    <Formulario botao={botaoCadastrar} atualizarPessoa={atualizarPessoa} cadastrar={cadastrar} pessoa={pessoa} cancelar={cancelar} alterar={alterar} remover={remover} />
    <Tabela registros={pessoas} funcao={selecionarPessoa} />
    </>
);
}


// Exportar 
export default App;
