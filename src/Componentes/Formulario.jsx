// Importar o CSS
import "./Formulario.css";

// Componente
function Formulario({ botao, atualizarPessoa, cadastrar, pessoa, cancelar, alterar, remover }) {
  const identificador = pessoa ? (pessoa.codigo ?? pessoa.id ?? "") : "";

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={identificador}
        onChange={atualizarPessoa}
        name="id"
        placeholder="Código (Automático)"
        className="form-control"
        readOnly
      />
      <input
        type="text"
        value={pessoa?.nome || ""}
        onChange={atualizarPessoa}
        name="nome"
        placeholder="Nome"
        className="form-control"
        required
      />
      <input
        type="text"
        value={pessoa?.cidade || ""}
        onChange={atualizarPessoa}
        name="cidade"
        placeholder="Cidade"
        className="form-control"
        required
      />

      {botao ? (
        <input
          type="button"
          onClick={cadastrar}
          value="Cadastrar"
          className="btn btn-primary"
        />
      ) : (
        <>
          <input
            type="button"
            onClick={alterar}
            value="Alterar"
            className="btn btn-warning"
          />
          <input
            type="button"
            onClick={remover}
            value="Remover"
            className="btn btn-danger"
          />
          <input
            type="button"
            onClick={cancelar}
            value="Cancelar"
            className="btn btn-secondary"
          />
        </>
      )}
    </form>
  );
}

// Exportar
export default Formulario;