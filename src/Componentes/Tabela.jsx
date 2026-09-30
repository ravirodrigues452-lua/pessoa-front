import React from "react";

function Tabela({
  produtos,
  pessoas,
  selecionar,
  produtoSelecionado,
  pessoaSelecionada
}) {
  const lista = produtos || pessoas || [];
  const selecionado = produtoSelecionado || pessoaSelecionada;

  const formatarMoeda = (valor) => {
    const num = Number(valor);
    if (isNaN(num)) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="table-container">
      {lista.length > 0 ? (
        <table className="shadcn-table">
          <thead>
            <tr>
              <th style={{ width: "70px" }}>Código</th>
              <th style={{ width: "125px" }}>Cód. Modelo</th>
              <th>Descrição / Produto</th>
              <th>Categoria</th>
              <th style={{ textAlign: "center", width: "120px" }}>Estoque</th>
              <th style={{ textAlign: "right", width: "120px" }}>Preço</th>
              <th style={{ width: "130px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item, index) => {
              const itemId = item.codigo ?? item.id ?? (index + 1);
              const codModelo = item.codigoModelo ?? item.codigo_modelo ?? "";
              const estaSelecionado =
                selecionado &&
                String(selecionado.codigo ?? selecionado.id) === String(itemId);

              const nome = item.nome ?? item.descricao ?? "Sem nome";
              const categoria = item.categoria ?? "Geral";
              const quantidade = Number(item.quantidade ?? item.qtd ?? 0);
              const preco = Number(item.preco ?? item.valor ?? 0);

              // Indicador visual de estoque
              const estoqueZero = quantidade <= 0;
              const estoqueBaixo = quantidade > 0 && quantidade <= 5;

              return (
                <tr
                  key={item.id ?? item.codigo ?? index}
                  className={estaSelecionado ? "row-selected" : ""}
                >
                  <td className="id-cell">#{itemId}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        border: "1px solid #e2e8f0"
                      }}
                    >
                      {codModelo || "—"}
                    </span>
                  </td>
                  <td>
                    <div className="user-name-cell">
                      <div className="user-avatar-placeholder">
                        {nome.charAt(0).toUpperCase()}
                      </div>
                      <span>{nome}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{categoria}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={`badge ${
                        estoqueZero
                          ? "badge-danger"
                          : estoqueBaixo
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {quantidade} un
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
                    {formatarMoeda(preco)}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        onClick={() => selecionar(item)}
                        className={`btn btn-sm ${
                          estaSelecionado ? "btn-default" : "btn-outline"
                        }`}
                      >
                        {estaSelecionado ? "Selecionado" : "Selecionar"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p className="empty-text">Nenhum produto encontrado no estoque.</p>
        </div>
      )}
    </div>
  );
}

export default Tabela;
