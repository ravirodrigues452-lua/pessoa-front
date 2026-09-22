import React from "react";

function Tabela({ pessoas = [], selecionar, pessoaSelecionada }) {
  return (
    <div className="table-container">
      {pessoas.length > 0 ? (
        <table className="shadcn-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Nome</th>
              <th>Cidade</th>
              <th style={{ width: "130px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((item) => {
              const estaSelecionado = pessoaSelecionada && String(pessoaSelecionada.id) === String(item.id);
              return (
                <tr key={item.id} className={estaSelecionado ? "row-selected" : ""}>
                  <td className="id-cell">#{item.id}</td>
                  <td>
                    <div className="user-name-cell">
                      <div className="user-avatar-placeholder">
                        {item.nome ? item.nome.charAt(0).toUpperCase() : "P"}
                      </div>
                      <span>{item.nome}</span>
                    </div>
                  </td>
                  <td>{item.cidade}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        onClick={() => selecionar(item)}
                        className={`btn btn-sm ${estaSelecionado ? "btn-default" : "btn-outline"}`}
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
          <p className="empty-text">Nenhuma pessoa encontrada.</p>
        </div>
      )}
    </div>
  );
}

export default Tabela;
