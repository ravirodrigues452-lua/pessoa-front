// Importar o CSS
import "./Formulario.css";
// Componente
function Formulario({botao, atualizarPessoa, cadastrar, pessoa, cancelar, alterar, remover}){

    // Render
    return (
        <form>
           
            <input type="number" defaultValue={pessoa.id}     onChange={atualizarPessoa}   name="id"      placeholder="Código" className="form-control" readOnly />
            <input type="text"   defaultValue={pessoa.nome}   onChange={atualizarPessoa}   name="nome"    placeholder="Nome"   className="form-control"  />
            <input type="text"   defaultValue={pessoa.cidade} onChange={atualizarPessoa}   name="cidade"  placeholder="Cidade" className="form-control" />

            {
                botao
                ?
                <input type="button" onClick={cadastrar} value="Cadastrar" className="btn btn-primary" />
                :
                <>
                  <input type="button" onClick={alterar}  value="Alterar" className="btn btn-primary" />
                  <input type="button" onClick={remover}  value="Remover" className="btn btn-primary" />
                  <input type="button" onClick={cancelar} value="Cancelar" className="btn btn-primary" />
                </>
            }
           
        </form>
    );
}

// Exportar
export default Formulario;