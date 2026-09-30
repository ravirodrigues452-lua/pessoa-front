// Importar o CSS
import "./Formulario.css";

// Componente Formulário de Produto / Estoque
function Formulario({
  botao,
  atualizarProduto,
  atualizarPessoa,
  cadastrar,
  produto,
  pessoa,
  cancelar,
  alterar,
  remover
}) {
  const dados = produto || pessoa || {};
  const identificador = dados.codigo ?? dados.id ?? "";
  const handleUpdate = atualizarProduto || atualizarPessoa;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Campo: Código (automático / somente leitura) */}
      <input
        type="text"
        value={identificador}
        onChange={handleUpdate}
        name="id"
        placeholder="Código (Automático)"
        className="form-control"
        readOnly
      />

      {/* Campo: Código de Modelo */}
      <input
        type="text"
        value={dados.codigoModelo ?? dados.codigo_modelo ?? ""}
        onChange={handleUpdate}
        name="codigoModelo"
        placeholder="Código do Modelo (Ex: MOD-8921)"
        className="form-control"
        required
      />

      {/* Campo: Nome / Descrição */}
      <input
        type="text"
        value={dados.nome ?? dados.descricao ?? ""}
        onChange={handleUpdate}
        name="nome"
        placeholder="Descrição / Nome do Produto"
        className="form-control"
        required
      />

      {/* Campo: Categoria */}
      <input
        type="text"
        value={dados.categoria ?? ""}
        onChange={handleUpdate}
        name="categoria"
        placeholder="Categoria (Ex: Informática, Alimentos)"
        className="form-control"
        required
      />

      {/* Campo: Quantidade em Estoque */}
      <input
        type="number"
        min="0"
        value={dados.quantidade ?? ""}
        onChange={handleUpdate}
        name="quantidade"
        placeholder="Quantidade em Estoque"
        className="form-control"
        required
      />

      {/* Campo: Preço Unitário */}
      <input
        type="number"
        step="0.01"
        min="0"
        value={dados.preco ?? dados.valor ?? ""}
        onChange={handleUpdate}
        name="preco"
        placeholder="Preço Unitário (R$)"
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