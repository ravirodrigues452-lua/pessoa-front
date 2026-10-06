import React, { useState, useMemo } from "react";
import "./MovimentacaoEstoque.css";

// ─── ÍCONES SVG INLINE (100% nativos sem dependências externas) ─────
const MoveIcons = {
  ArrowUpRight: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
    </svg>
  ),
  ArrowDownLeft: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 17H7V7" /><path d="M17 7 7 17" />
    </svg>
  ),
  TrendingUp: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  TrendingDown: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
    </svg>
  ),
  Activity: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  ),
  Filter: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  BarChart: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  ),
  Layers: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22.43 10.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9" />
      <path d="m22.43 14.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9" />
    </svg>
  ),
  Tag: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
  Package: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  ),
  Repeat: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Eye: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ChevronDown: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronUp: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
  Plus: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5v14" />
    </svg>
  ),
  Minus: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
    </svg>
  ),
  Search: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Clock: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  X: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
};

// ─── COMPONENTE PRINCIPAL: MOVIMENTAÇÃO DE ESTOQUE ────────────────
function MovimentacaoEstoque({
  produtos = [],
  historicoMovimentacoes = [],
  onMovimentar,
  onRegistrarMovimentacaoAvancada
}) {
  const [filtroTipo, setFiltroTipo] = useState("TODOS"); // TODOS | ENTRADA | SAIDA | CRITICO
  const [filtroCategoria, setFiltroCategoria] = useState("TODAS");
  const [filtroModelo, setFiltroModelo] = useState("");
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState({ campo: "fluxoLiquido", direcao: "desc" });
  const [expandido, setExpandido] = useState(null); // id do produto expandido
  const [abaAtiva, setAbaAtiva] = useState("PRODUTOS"); // PRODUTOS | HISTORICO

  // Modal de nova movimentação
  const [modalAberto, setModalAberto] = useState(false);
  const [modalForm, setModalForm] = useState({
    tipo: "ENTRADA",
    codigoModelo: "",
    quantidade: "1",
    codigoLote: "LOTE-2026-01",
    marca: "",
    observacao: ""
  });

  // ─── Computar dados de movimentação para cada produto ───────────
  const dadosMovimentacao = useMemo(() => {
    return produtos.map((p) => {
      const id = p.codigo ?? p.id ?? "";
      const codigoModelo = p.codigoModelo ?? p.codigo_modelo ?? "";
      const nome = p.nome ?? p.descricao ?? "Sem nome";
      const categoria = p.categoria ?? "Geral";
      const quantidade = Number(p.quantidade ?? 0);
      const preco = Number(p.preco ?? p.valor ?? 0);
      const entrada = Number(p.entrada ?? 0);
      const saida = Number(p.saida ?? 0);
      const fluxoLiquido = entrada - saida;
      const totalMovimentacao = entrada + saida;
      const giroEstoque = quantidade > 0 ? ((saida / quantidade) * 100).toFixed(1) : 0;
      const valorEstoque = quantidade * preco;

      // Status baseado no estoque
      let status = "normal";
      if (quantidade <= 0) status = "esgotado";
      else if (quantidade <= 5) status = "critico";
      else if (quantidade <= 15) status = "baixo";

      return {
        id, codigoModelo, nome, categoria, quantidade,
        preco, entrada, saida, fluxoLiquido, totalMovimentacao,
        giroEstoque, valorEstoque, status, itemOriginal: p
      };
    });
  }, [produtos]);

  // ─── Categorias e modelos únicos para filtro ────────────────────
  const categorias = useMemo(() => {
    const cats = new Set();
    dadosMovimentacao.forEach((p) => { if (p.categoria) cats.add(p.categoria); });
    return Array.from(cats).sort();
  }, [dadosMovimentacao]);

  const modelos = useMemo(() => {
    const mods = new Set();
    dadosMovimentacao.forEach((p) => { if (p.codigoModelo) mods.add(p.codigoModelo); });
    return Array.from(mods).sort();
  }, [dadosMovimentacao]);

  // ─── Aplicar filtros nos produtos ───────────────────────────────
  const dadosFiltrados = useMemo(() => {
    let lista = dadosMovimentacao;

    if (filtroTipo === "ENTRADA") lista = lista.filter((p) => p.entrada > 0);
    if (filtroTipo === "SAIDA") lista = lista.filter((p) => p.saida > 0);
    if (filtroTipo === "CRITICO") lista = lista.filter((p) => p.status === "critico" || p.status === "esgotado");

    if (filtroCategoria !== "TODAS") {
      lista = lista.filter((p) => p.categoria.toLowerCase() === filtroCategoria.toLowerCase());
    }

    if (filtroModelo) {
      lista = lista.filter((p) => p.codigoModelo === filtroModelo);
    }

    if (busca.trim()) {
      const b = busca.toLowerCase();
      lista = lista.filter((p) =>
        String(p.id).toLowerCase().includes(b) ||
        p.codigoModelo.toLowerCase().includes(b) ||
        p.nome.toLowerCase().includes(b) ||
        p.categoria.toLowerCase().includes(b)
      );
    }

    lista = [...lista].sort((a, b) => {
      const mult = ordenacao.direcao === "asc" ? 1 : -1;
      if (typeof a[ordenacao.campo] === "number") {
        return (a[ordenacao.campo] - b[ordenacao.campo]) * mult;
      }
      return String(a[ordenacao.campo]).localeCompare(String(b[ordenacao.campo])) * mult;
    });

    return lista;
  }, [dadosMovimentacao, filtroTipo, filtroCategoria, filtroModelo, busca, ordenacao]);

  // ─── Filtro para histórico de movimentações ─────────────────────
  const historicoFiltrado = useMemo(() => {
    let lista = historicoMovimentacoes;

    if (filtroTipo === "ENTRADA") lista = lista.filter((m) => m.tipo === "ENTRADA");
    if (filtroTipo === "SAIDA") lista = lista.filter((m) => m.tipo === "SAIDA");

    if (filtroModelo) {
      lista = lista.filter((m) => String(m.codigoModelo || "").toLowerCase() === filtroModelo.toLowerCase());
    }

    if (busca.trim()) {
      const b = busca.toLowerCase();
      lista = lista.filter((m) =>
        String(m.codigoModelo || "").toLowerCase().includes(b) ||
        String(m.codigoLote || "").toLowerCase().includes(b) ||
        String(m.marca || "").toLowerCase().includes(b) ||
        String(m.observacao || "").toLowerCase().includes(b) ||
        String(m.produtoNome || "").toLowerCase().includes(b)
      );
    }

    return lista;
  }, [historicoMovimentacoes, filtroTipo, filtroModelo, busca]);

  // ─── Métricas de movimentação consolidadas ──────────────────────
  const metricas = useMemo(() => {
    const totalEntradas = dadosMovimentacao.reduce((acc, p) => acc + (Number(p.entrada) || 0), 0);
    const totalSaidas = dadosMovimentacao.reduce((acc, p) => acc + (Number(p.saida) || 0), 0);
    const fluxoLiquidoTotal = totalEntradas - totalSaidas;
    const produtosComMovimentacao = dadosMovimentacao.filter((p) => p.totalMovimentacao > 0).length;
    const produtosSemMovimentacao = dadosMovimentacao.filter((p) => p.totalMovimentacao === 0).length;

    return { totalEntradas, totalSaidas, fluxoLiquidoTotal, produtosComMovimentacao, produtosSemMovimentacao };
  }, [dadosMovimentacao]);

  // ─── Formatar moeda ─────────────────────────────────────────────
  const formatarMoeda = (valor) => {
    const num = Number(valor);
    if (isNaN(num)) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // ─── Alternar ordenação ─────────────────────────────────────────
  const alternarOrdenacao = (campo) => {
    setOrdenacao((prev) => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === "desc" ? "asc" : "desc"
    }));
  };

  // ─── Renderizar indicador de ordenação ──────────────────────────
  const renderSortIcon = (campo) => {
    if (ordenacao.campo !== campo) return <MoveIcons.Minus size={12} className="mov-sort-inactive" />;
    return ordenacao.direcao === "desc"
      ? <MoveIcons.ChevronDown size={14} className="mov-sort-active" />
      : <MoveIcons.ChevronUp size={14} className="mov-sort-active" />;
  };

  // ─── Calcular largura máxima da barra visual ────────────────────
  const maxMov = useMemo(() => {
    return Math.max(1, ...dadosMovimentacao.map((p) => Math.max(p.entrada, p.saida)));
  }, [dadosMovimentacao]);

  // Abrir modal com modelo selecionado
  const abrirModalComProduto = (prod = null, tipo = "ENTRADA") => {
    const p = prod || produtos[0];
    setModalForm({
      tipo,
      codigoModelo: p ? (p.codigoModelo || "") : "",
      quantidade: "1",
      codigoLote: "LOTE-" + new Date().getFullYear() + "-01",
      marca: p ? (p.categoria || "") : "",
      observacao: ""
    });
    setModalAberto(true);
  };

  // Submeter movimentação avançada
  const handleSubmitModal = async (e) => {
    e.preventDefault();
    if (!modalForm.codigoModelo) return;

    if (onRegistrarMovimentacaoAvancada) {
      await onRegistrarMovimentacaoAvancada(modalForm);
    } else if (onMovimentar) {
      const prodEncontrado = produtos.find((p) => p.codigoModelo === modalForm.codigoModelo);
      await onMovimentar(modalForm.tipo.toLowerCase(), Number(modalForm.quantidade), prodEncontrado);
    }
    setModalAberto(false);
  };

  if (produtos.length === 0) return null;

  return (
    <div className="mov-panel">
      {/* ─── HEADER DO PAINEL ─── */}
      <div className="mov-panel-header">
        <div className="mov-panel-title-area">
          <div className="mov-panel-icon">
            <MoveIcons.Activity size={20} />
          </div>
          <div>
            <h2 className="mov-panel-title">Painel de Movimentações de Estoque</h2>
            <p className="mov-panel-desc">Controle visual e em tempo real de entradas, saídas e fluxo por lote, marca e modelo</p>
          </div>
        </div>

        <div className="mov-header-actions">
          <button
            type="button"
            onClick={() => abrirModalComProduto(null, "ENTRADA")}
            className="btn btn-default btn-sm mov-btn-nova-mov"
            title="Registrar nova entrada ou saída com lote e marca"
          >
            <MoveIcons.Plus size={15} />
            Registrar Movimentação
          </button>
        </div>
      </div>

      {/* ─── CARDS DE MÉTRICAS DE MOVIMENTAÇÃO ─── */}
      <div className="mov-metrics-grid">
        <div className="mov-metric-card mov-metric-entrada">
          <div className="mov-metric-icon-wrap mov-icon-entrada">
            <MoveIcons.ArrowDownLeft size={20} />
          </div>
          <div className="mov-metric-info">
            <span className="mov-metric-value">{metricas.totalEntradas} un</span>
            <span className="mov-metric-label">Total Entradas</span>
          </div>
          <div className="mov-metric-sparkline mov-spark-entrada">
            <MoveIcons.TrendingUp size={28} />
          </div>
        </div>

        <div className="mov-metric-card mov-metric-saida">
          <div className="mov-metric-icon-wrap mov-icon-saida">
            <MoveIcons.ArrowUpRight size={20} />
          </div>
          <div className="mov-metric-info">
            <span className="mov-metric-value">{metricas.totalSaidas} un</span>
            <span className="mov-metric-label">Total Saídas</span>
          </div>
          <div className="mov-metric-sparkline mov-spark-saida">
            <MoveIcons.TrendingDown size={28} />
          </div>
        </div>

        <div className={`mov-metric-card ${metricas.fluxoLiquidoTotal >= 0 ? "mov-metric-positivo" : "mov-metric-negativo"}`}>
          <div className={`mov-metric-icon-wrap ${metricas.fluxoLiquidoTotal >= 0 ? "mov-icon-positivo" : "mov-icon-negativo"}`}>
            <MoveIcons.Repeat size={20} />
          </div>
          <div className="mov-metric-info">
            <span className="mov-metric-value">
              {metricas.fluxoLiquidoTotal >= 0 ? "+" : ""}{metricas.fluxoLiquidoTotal} un
            </span>
            <span className="mov-metric-label">Fluxo Líquido</span>
          </div>
          <div className={`mov-metric-sparkline ${metricas.fluxoLiquidoTotal >= 0 ? "mov-spark-entrada" : "mov-spark-saida"}`}>
            {metricas.fluxoLiquidoTotal >= 0 ? <MoveIcons.TrendingUp size={28} /> : <MoveIcons.TrendingDown size={28} />}
          </div>
        </div>

        <div className="mov-metric-card mov-metric-geral">
          <div className="mov-metric-icon-wrap mov-icon-geral">
            <MoveIcons.BarChart size={20} />
          </div>
          <div className="mov-metric-info">
            <span className="mov-metric-value">{metricas.produtosComMovimentacao}</span>
            <span className="mov-metric-label">Produtos c/ Movimentação</span>
          </div>
          {metricas.produtosSemMovimentacao > 0 && (
            <div className="mov-metric-badge-parado">
              {metricas.produtosSemMovimentacao} sem fluxo
            </div>
          )}
        </div>
      </div>

      {/* ─── FILTROS E ABAS DE VISUALIZAÇÃO ─── */}
      <div className="mov-filters-bar">
        <div className="mov-filters-left">
          {/* Alternador de Visão: Produtos vs Histórico */}
          <div className="mov-view-tabs">
            <button
              type="button"
              onClick={() => setAbaAtiva("PRODUTOS")}
              className={`mov-view-tab ${abaAtiva === "PRODUTOS" ? "mov-view-tab-active" : ""}`}
            >
              <MoveIcons.Layers size={13} /> Fluxo por Produto
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva("HISTORICO")}
              className={`mov-view-tab ${abaAtiva === "HISTORICO" ? "mov-view-tab-active" : ""}`}
            >
              <MoveIcons.Clock size={13} /> Histórico Geral ({historicoMovimentacoes.length})
            </button>
          </div>

          {/* Filtro por tipo */}
          <div className="mov-filter-tabs">
            {[
              { value: "TODOS", label: "Todos" },
              { value: "ENTRADA", label: "Entradas" },
              { value: "SAIDA", label: "Saídas" },
              ...(abaAtiva === "PRODUTOS" ? [{ value: "CRITICO", label: "Críticos" }] : [])
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFiltroTipo(tab.value)}
                className={`mov-filter-tab ${filtroTipo === tab.value ? "mov-tab-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtro por categoria (quando na visão de produtos) */}
          {abaAtiva === "PRODUTOS" && categorias.length > 0 && (
            <div className="mov-filter-select-wrap">
              <MoveIcons.Layers size={14} />
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="mov-filter-select"
              >
                <option value="TODAS">Todas as Categorias</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por modelo */}
          {modelos.length > 0 && (
            <div className="mov-filter-select-wrap">
              <MoveIcons.Tag size={14} />
              <select
                value={filtroModelo}
                onChange={(e) => setFiltroModelo(e.target.value)}
                className="mov-filter-select"
              >
                <option value="">Todos os Modelos</option>
                {modelos.map((mod) => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mov-filters-right">
          {/* Busca */}
          <div className="mov-search-wrap">
            <MoveIcons.Search size={14} />
            <input
              type="text"
              placeholder={abaAtiva === "PRODUTOS" ? "Buscar produto, modelo..." : "Buscar lote, modelo, obs..."}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="mov-search-input"
            />
            {busca && (
              <button onClick={() => setBusca("")} className="mov-search-clear">
                <MoveIcons.X size={12} />
              </button>
            )}
          </div>

          <span className="mov-results-badge">
            {abaAtiva === "PRODUTOS"
              ? `${dadosFiltrados.length} ${dadosFiltrados.length === 1 ? "produto" : "produtos"}`
              : `${historicoFiltrado.length} ${historicoFiltrado.length === 1 ? "registro" : "registros"}`}
          </span>
        </div>
      </div>

      {/* ─── TABELA DE FLUXO POR PRODUTO ─── */}
      {abaAtiva === "PRODUTOS" && (
        <div className="mov-table-wrap">
          {dadosFiltrados.length > 0 ? (
            <table className="mov-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("id")}>
                      # {renderSortIcon("id")}
                    </button>
                  </th>
                  <th style={{ width: "120px" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("codigoModelo")}>
                      Modelo {renderSortIcon("codigoModelo")}
                    </button>
                  </th>
                  <th>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("nome")}>
                      Produto {renderSortIcon("nome")}
                    </button>
                  </th>
                  <th style={{ width: "120px" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("categoria")}>
                      Categoria {renderSortIcon("categoria")}
                    </button>
                  </th>
                  <th style={{ width: "95px", textAlign: "center" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("quantidade")} style={{ justifyContent: "center" }}>
                      Estoque {renderSortIcon("quantidade")}
                    </button>
                  </th>
                  <th style={{ width: "210px" }}>
                    <span className="mov-th-label">Fluxo Visual (Entrada / Saída)</span>
                  </th>
                  <th style={{ width: "85px", textAlign: "center" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("entrada")} style={{ justifyContent: "center" }}>
                      Entr. {renderSortIcon("entrada")}
                    </button>
                  </th>
                  <th style={{ width: "85px", textAlign: "center" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("saida")} style={{ justifyContent: "center" }}>
                      Saída {renderSortIcon("saida")}
                    </button>
                  </th>
                  <th style={{ width: "90px", textAlign: "center" }}>
                    <button className="mov-th-btn" onClick={() => alternarOrdenacao("fluxoLiquido")} style={{ justifyContent: "center" }}>
                      Fluxo {renderSortIcon("fluxoLiquido")}
                    </button>
                  </th>
                  <th style={{ width: "115px", textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.map((item) => {
                  const entradaPct = (item.entrada / maxMov) * 100;
                  const saidaPct = (item.saida / maxMov) * 100;
                  const isExpandido = expandido === item.id;

                  // Movimentações específicas deste produto
                  const movsDesteProduto = historicoMovimentacoes.filter((m) => {
                    const cod = String(item.codigoModelo || "").toLowerCase();
                    const mCod = String(m.codigoModelo || "").toLowerCase();
                    const idM = String(m.produtoId || "");
                    const idI = String(item.id || "");
                    return (cod && mCod && cod === mCod) || (idI && idM && idI === idM);
                  });

                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`mov-row ${item.status === "esgotado" ? "mov-row-esgotado" : item.status === "critico" ? "mov-row-critico" : ""}`}>
                        {/* ID */}
                        <td className="mov-cell-id">#{item.id}</td>

                        {/* Código Modelo */}
                        <td>
                          <span className="mov-modelo-tag">{item.codigoModelo || "—"}</span>
                        </td>

                        {/* Nome do Produto */}
                        <td>
                          <div className="mov-product-cell">
                            <div className={`mov-product-dot mov-dot-${item.status}`} />
                            <span className="mov-product-name">{item.nome}</span>
                          </div>
                        </td>

                        {/* Categoria */}
                        <td>
                          <span className="mov-cat-pill">{item.categoria}</span>
                        </td>

                        {/* Estoque Atual */}
                        <td style={{ textAlign: "center" }}>
                          <span className={`mov-estoque-badge mov-est-${item.status}`}>
                            {item.quantidade} un
                          </span>
                        </td>

                        {/* Barra Visual de Fluxo */}
                        <td>
                          <div className="mov-flow-chart">
                            <div className="mov-flow-row">
                              <span className="mov-flow-label mov-flow-in">E</span>
                              <div className="mov-flow-bar-track">
                                <div
                                  className="mov-flow-bar mov-flow-bar-in"
                                  style={{ width: `${Math.max(entradaPct, item.entrada > 0 ? 4 : 0)}%` }}
                                >
                                  {item.entrada > 0 && <span className="mov-bar-value">{item.entrada}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="mov-flow-row">
                              <span className="mov-flow-label mov-flow-out">S</span>
                              <div className="mov-flow-bar-track">
                                <div
                                  className="mov-flow-bar mov-flow-bar-out"
                                  style={{ width: `${Math.max(saidaPct, item.saida > 0 ? 4 : 0)}%` }}
                                >
                                  {item.saida > 0 && <span className="mov-bar-value">{item.saida}</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Entrada numérica */}
                        <td style={{ textAlign: "center" }}>
                          <span className="mov-num mov-num-in" title={`Total de entradas: ${item.entrada} un`}>
                            <MoveIcons.ArrowDownLeft size={12} />
                            {item.entrada}
                          </span>
                        </td>

                        {/* Saída numérica */}
                        <td style={{ textAlign: "center" }}>
                          <span className="mov-num mov-num-out" title={`Total de saídas: ${item.saida} un`}>
                            <MoveIcons.ArrowUpRight size={12} />
                            {item.saida}
                          </span>
                        </td>

                        {/* Fluxo Líquido */}
                        <td style={{ textAlign: "center" }}>
                          <span className={`mov-flux ${item.fluxoLiquido > 0 ? "mov-flux-pos" : item.fluxoLiquido < 0 ? "mov-flux-neg" : "mov-flux-zero"}`}>
                            {item.fluxoLiquido > 0 ? "+" : ""}{item.fluxoLiquido}
                          </span>
                        </td>

                        {/* Ações Rápidas: +1 Entrada, -1 Saída e Detalhes */}
                        <td>
                          <div className="mov-row-actions">
                            {onMovimentar && (
                              <>
                                <button
                                  type="button"
                                  className="mov-mini-btn mov-mini-plus"
                                  onClick={() => onMovimentar("entrada", 1, item.itemOriginal)}
                                  title={`Adicionar +1 Entrada em "${item.nome}"`}
                                >
                                  +1
                                </button>
                                <button
                                  type="button"
                                  className="mov-mini-btn mov-mini-minus"
                                  onClick={() => onMovimentar("saida", 1, item.itemOriginal)}
                                  title={`Dar baixa de -1 Saída em "${item.nome}"`}
                                  disabled={item.quantidade <= 0}
                                >
                                  -1
                                </button>
                              </>
                            )}
                            <button
                              className="mov-expand-btn"
                              onClick={() => setExpandido(isExpandido ? null : item.id)}
                              title={isExpandido ? "Recolher detalhes" : "Ver histórico e detalhes"}
                            >
                              <MoveIcons.Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Linha expandida com detalhes e mini-histórico */}
                      {isExpandido && (
                        <tr className="mov-row-detail">
                          <td colSpan={10}>
                            <div className="mov-detail-panel">
                              <div className="mov-detail-grid">
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Preço Unitário</span>
                                  <span className="mov-detail-value">{formatarMoeda(item.preco)}</span>
                                </div>
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Valor em Estoque</span>
                                  <span className="mov-detail-value">{formatarMoeda(item.valorEstoque)}</span>
                                </div>
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Total Movimentado</span>
                                  <span className="mov-detail-value">{item.totalMovimentacao} un</span>
                                </div>
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Giro de Estoque</span>
                                  <span className="mov-detail-value">{item.giroEstoque}%</span>
                                </div>
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Status</span>
                                  <span className={`mov-estoque-badge mov-est-${item.status}`}>
                                    {item.status === "esgotado" ? "Esgotado" : item.status === "critico" ? "Crítico" : item.status === "baixo" ? "Baixo" : "Normal"}
                                  </span>
                                </div>
                                <div className="mov-detail-item">
                                  <span className="mov-detail-label">Proporção E/S</span>
                                  <div className="mov-detail-ratio">
                                    <div className="mov-ratio-bar">
                                      <div
                                        className="mov-ratio-fill-in"
                                        style={{ width: `${item.totalMovimentacao > 0 ? (item.entrada / item.totalMovimentacao) * 100 : 50}%` }}
                                      />
                                      <div
                                        className="mov-ratio-fill-out"
                                        style={{ width: `${item.totalMovimentacao > 0 ? (item.saida / item.totalMovimentacao) * 100 : 50}%` }}
                                      />
                                    </div>
                                    <span className="mov-ratio-text">
                                      {item.entrada}E / {item.saida}S
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Mini-histórico de movimentações deste produto */}
                              <div className="mov-sub-history">
                                <div className="mov-sub-history-header">
                                  <span className="mov-sub-history-title">
                                    <MoveIcons.Clock size={13} /> Movimentações Recentes deste Item ({movsDesteProduto.length})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => abrirModalComProduto(item.itemOriginal, "ENTRADA")}
                                    className="btn btn-outline btn-xs"
                                  >
                                    <MoveIcons.Plus size={12} /> Registrar Movimentação neste Modelo
                                  </button>
                                </div>

                                {movsDesteProduto.length > 0 ? (
                                  <div className="mov-sub-history-list">
                                    {movsDesteProduto.slice(0, 5).map((m, idx) => (
                                      <div key={m.id || idx} className="mov-sub-history-row">
                                        <span className={`badge ${m.tipo === "ENTRADA" ? "badge-success" : "badge-danger"}`}>
                                          {m.tipo === "ENTRADA" ? <MoveIcons.ArrowDownLeft size={11} /> : <MoveIcons.ArrowUpRight size={11} />}
                                          {m.tipo === "ENTRADA" ? "Entrada" : "Saída"} {m.quantidade} un
                                        </span>
                                        <span className="mov-sub-history-lote">
                                          Lote: <strong>{m.codigoLote || "PADRAO"}</strong>
                                        </span>
                                        <span className="mov-sub-history-data">{m.dataMovimentacao || "Recente"}</span>
                                        <span className="mov-sub-history-obs">{m.observacao || "Sem observação"}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="mov-sub-history-empty">
                                    Nenhuma movimentação individual registrada separadamente ainda.
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="mov-empty">
              <div className="mov-empty-icon">
                <MoveIcons.Activity size={24} />
              </div>
              <p className="mov-empty-title">Nenhuma movimentação encontrada</p>
              <p className="mov-empty-desc">
                Ajuste os filtros ou registre novas movimentações para visualizar o fluxo de estoque.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── TABELA DE HISTÓRICO GERAL DE MOVIMENTAÇÕES ─── */}
      {abaAtiva === "HISTORICO" && (
        <div className="mov-table-wrap">
          {historicoFiltrado.length > 0 ? (
            <table className="mov-table">
              <thead>
                <tr>
                  <th style={{ width: "140px" }}>Data / Hora</th>
                  <th style={{ width: "105px", textAlign: "center" }}>Tipo</th>
                  <th style={{ width: "130px" }}>Cód. Modelo</th>
                  <th>Produto / Descrição</th>
                  <th style={{ width: "130px" }}>Lote</th>
                  <th style={{ width: "110px" }}>Marca</th>
                  <th style={{ width: "95px", textAlign: "center" }}>Quantidade</th>
                  <th style={{ width: "95px", textAlign: "center" }}>Saldo Após</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody>
                {historicoFiltrado.map((m, idx) => (
                  <tr key={m.id || idx} className="mov-row">
                    <td style={{ fontSize: "0.78125rem", fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))" }}>
                      {m.dataMovimentacao || "—"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span className={`badge ${m.tipo === "ENTRADA" ? "badge-success" : "badge-danger"}`} style={{ minWidth: "75px" }}>
                        {m.tipo === "ENTRADA" ? <MoveIcons.ArrowDownLeft size={11} /> : <MoveIcons.ArrowUpRight size={11} />}
                        {m.tipo === "ENTRADA" ? "Entrada" : "Saída"}
                      </span>
                    </td>
                    <td>
                      <span className="mov-modelo-tag">{m.codigoModelo || "—"}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {m.produtoNome || m.codigoModelo || "Produto"}
                    </td>
                    <td>
                      <span className="mov-lote-tag">{m.codigoLote || "PADRAO"}</span>
                    </td>
                    <td>
                      <span className="category-pill">{m.marca || "Geral"}</span>
                    </td>
                    <td style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                      <span style={{ color: m.tipo === "ENTRADA" ? "#10b981" : "hsl(var(--destructive))" }}>
                        {m.tipo === "ENTRADA" ? "+" : "-"}{m.quantidade} un
                      </span>
                    </td>
                    <td style={{ textAlign: "center", fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))" }}>
                      {m.saldoApos !== null && m.saldoApos !== undefined ? `${m.saldoApos} un` : "—"}
                    </td>
                    <td style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))" }}>
                      {m.observacao || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mov-empty">
              <div className="mov-empty-icon">
                <MoveIcons.Clock size={24} />
              </div>
              <p className="mov-empty-title">Nenhum registro de movimentação no histórico</p>
              <p className="mov-empty-desc">
                Clique no botão "Registrar Movimentação" acima para lançar uma entrada ou saída por lote, marca e modelo.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── MODAL DE REGISTRO DE MOVIMENTAÇÃO (LOTE, MARCA, MODELO) ─── */}
      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
            <div className="card-header">
              <h3 className="card-title">
                {modalForm.tipo === "ENTRADA" ? (
                  <span style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MoveIcons.ArrowDownLeft size={18} /> Registrar Entrada de Estoque
                  </span>
                ) : (
                  <span style={{ color: "hsl(var(--destructive))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MoveIcons.ArrowUpRight size={18} /> Registrar Saída de Estoque
                  </span>
                )}
              </h3>
              <button onClick={() => setModalAberto(false)} className="btn btn-ghost btn-icon">
                <MoveIcons.X size={16} />
              </button>
            </div>

            <div className="card-content">
              <form onSubmit={handleSubmitModal}>
                {/* Tipo de Movimentação */}
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label">Tipo da Operação</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => setModalForm((prev) => ({ ...prev, tipo: "ENTRADA" }))}
                      className={`btn ${modalForm.tipo === "ENTRADA" ? "btn-default" : "btn-outline"}`}
                      style={{
                        backgroundColor: modalForm.tipo === "ENTRADA" ? "#10b981" : "",
                        borderColor: modalForm.tipo === "ENTRADA" ? "#10b981" : "",
                        color: modalForm.tipo === "ENTRADA" ? "#fff" : ""
                      }}
                    >
                      <MoveIcons.ArrowDownLeft size={14} /> Entrada (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalForm((prev) => ({ ...prev, tipo: "SAIDA" }))}
                      className={`btn ${modalForm.tipo === "SAIDA" ? "btn-default" : "btn-outline"}`}
                      style={{
                        backgroundColor: modalForm.tipo === "SAIDA" ? "hsl(var(--destructive))" : "",
                        borderColor: modalForm.tipo === "SAIDA" ? "hsl(var(--destructive))" : "",
                        color: modalForm.tipo === "SAIDA" ? "#fff" : ""
                      }}
                    >
                      <MoveIcons.ArrowUpRight size={14} /> Saída (-)
                    </button>
                  </div>
                </div>

                {/* Seleção do Produto / Código de Modelo */}
                <div className="form-group" style={{ marginBottom: "0.875rem" }}>
                  <label className="form-label">
                    <span>Produto / Modelo *</span>
                  </label>
                  <select
                    value={modalForm.codigoModelo}
                    onChange={(e) => {
                      const mod = e.target.value;
                      const prodEncontrado = produtos.find((p) => p.codigoModelo === mod);
                      setModalForm((prev) => ({
                        ...prev,
                        codigoModelo: mod,
                        marca: prodEncontrado ? (prodEncontrado.categoria || prev.marca) : prev.marca
                      }));
                    }}
                    className="shadcn-input"
                    required
                  >
                    <option value="">Selecione o produto...</option>
                    {produtos.map((p) => (
                      <option key={p.codigo ?? p.id} value={p.codigoModelo}>
                        {p.codigoModelo ? `[${p.codigoModelo}] ` : ""}{p.nome || p.descricao} — Saldo: {p.quantidade} un
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.875rem" }}>
                  {/* Quantidade */}
                  <div className="form-group">
                    <label className="form-label">Quantidade *</label>
                    <input
                      type="number"
                      min="1"
                      value={modalForm.quantidade}
                      onChange={(e) => setModalForm((prev) => ({ ...prev, quantidade: e.target.value }))}
                      className="shadcn-input"
                      placeholder="Ex: 10"
                      required
                    />
                  </div>

                  {/* Código do Lote */}
                  <div className="form-group">
                    <label className="form-label">Código do Lote</label>
                    <input
                      type="text"
                      value={modalForm.codigoLote}
                      onChange={(e) => setModalForm((prev) => ({ ...prev, codigoLote: e.target.value }))}
                      className="shadcn-input"
                      placeholder="Ex: LOTE-2026-A"
                    />
                  </div>
                </div>

                {/* Marca / Fornecedor */}
                <div className="form-group" style={{ marginBottom: "0.875rem" }}>
                  <label className="form-label">Marca / Fornecedor</label>
                  <input
                    type="text"
                    value={modalForm.marca}
                    onChange={(e) => setModalForm((prev) => ({ ...prev, marca: e.target.value }))}
                    className="shadcn-input"
                    placeholder="Ex: Samsung, Apple, Dell, Geral"
                  />
                </div>

                {/* Observação */}
                <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                  <label className="form-label">Observação / Nota Fiscal</label>
                  <input
                    type="text"
                    value={modalForm.observacao}
                    onChange={(e) => setModalForm((prev) => ({ ...prev, observacao: e.target.value }))}
                    className="shadcn-input"
                    placeholder="Ex: Recebimento fornecedor NF 1042 / Baixa por venda"
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setModalAberto(false)}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{
                      backgroundColor: modalForm.tipo === "ENTRADA" ? "#10b981" : "hsl(var(--destructive))",
                      color: "#fff"
                    }}
                  >
                    {modalForm.tipo === "ENTRADA" ? "+ Confirmar Entrada" : "- Confirmar Saída"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovimentacaoEstoque;
