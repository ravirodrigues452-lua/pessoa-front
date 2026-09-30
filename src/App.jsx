import React, { useState, useEffect, useMemo } from "react";

// --- ÍCONES SVG ESTILO LUCIDE / SHADCN (100% nativos sem dependências externas) ---
const Icons = {
  Package: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  Boxes: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
      <path d="m7 16.5-4.74-2.85" />
      <path d="m7 16.5 5-3" />
      <path d="M7 16.5v5.17" />
      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
      <path d="m17 16.5-5-3" />
      <path d="m17 16.5 4.74-2.85" />
      <path d="M17 16.5v5.17" />
      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
      <path d="M12 8 7.26 5.15" />
      <path d="m12 8 4.74-2.85" />
      <path d="M12 13.5V8" />
    </svg>
  ),
  Tag: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
  DollarSign: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Id: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="14" x="3" y="5" rx="2" />
      <path d="M7 15h4M15 15h2M7 11h2" />
    </svg>
  ),
  Search: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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
  Edit: ({ size = 15, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  Trash: ({ size = 15, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  ),
  Refresh: ({ size = 15, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" />
    </svg>
  ),
  Sun: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  Check: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Alert: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
  AlertTriangle: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  X: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Database: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Sliders: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
    </svg>
  ),
  Barcode: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14M5 5v14M15 5v14" />
    </svg>
  )
};

// Objeto de produto padrão para formulário
const produtoVazio = {
  id: "",
  codigo: "",
  codigoModelo: "",
  nome: "",
  categoria: "",
  quantidade: "",
  preco: ""
};

// Utilitário para normalizar qualquer objeto vindo da API de estoque
const normalizarProduto = (item) => {
  if (!item || typeof item !== "object") return null;

  const identificador =
    item.codigo !== undefined && item.codigo !== null && item.codigo !== ""
      ? item.codigo
      : item.id !== undefined && item.id !== null && item.id !== ""
      ? item.id
      : item._id ?? "";

  const codigoModelo = item.codigoModelo ?? item.codigo_modelo ?? item.codModelo ?? "";
  const nome = item.nome ?? item.descricao ?? "";
  const categoria = item.categoria ?? "Geral";
  const quantidade = Number(item.quantidade ?? item.qtd ?? item.estoque ?? 0);
  const preco = Number(item.preco ?? item.valor ?? 0);

  return {
    ...item,
    id: identificador,
    codigo: identificador,
    codigoModelo: String(codigoModelo),
    nome: nome,
    descricao: nome,
    categoria: categoria,
    quantidade: isNaN(quantidade) ? 0 : quantidade,
    preco: isNaN(preco) ? 0 : preco,
    valor: isNaN(preco) ? 0 : preco
  };
};

export default function App() {
  // --- ESTADOS PRINCIPAIS ---
  const [produto, setProduto] = useState(produtoVazio);
  const [produtos, setProdutos] = useState([]);
  const [botao, setBotao] = useState(true); // true = cadastrar, false = alterar/remover/cancelar
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODAS");
  const [carregando, setCarregando] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // --- CONFIGURAÇÃO DA API (com persistência no localStorage) ---
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem("estoque_api_url") || "http://localhost:8080";
  });
  const [statusConexao, setStatusConexao] = useState("verificando"); // 'online' | 'offline' | 'verificando'
  const [mostrarConfigApi, setMostrarConfigApi] = useState(false);
  const [modalRemover, setModalRemover] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [diagnosticoApi, setDiagnosticoApi] = useState(null);
  const [testandoDiagnostico, setTestandoDiagnostico] = useState(false);

  // Sincronizar URL da API no localStorage
  const salvarApiUrl = (novaUrl) => {
    const urlLimpa = novaUrl.trim().replace(/\/+$/, "");
    setApiUrl(urlLimpa);
    localStorage.setItem("estoque_api_url", urlLimpa);
  };

  // Alternar tema escuro/claro com persistência
  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [temaEscuro]);

  // Sistema de Notificações Toast
  const dispararToast = (titulo, desc, tipo = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, titulo, desc, tipo }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Função auxiliar para extrair mensagem amigável de erro da resposta HTTP
  const extrairMensagemErro = async (resposta, fallbackMsg) => {
    if (!resposta) return fallbackMsg;
    try {
      const clone = resposta.clone();
      const json = await clone.json();
      if (json.mensagem) return json.mensagem;
      if (json.message) return json.message;
      if (json.error) return json.error;
      if (Array.isArray(json.errors)) return json.errors.join(", ");
    } catch {
      try {
        const texto = await resposta.text();
        if (texto && texto.length > 0 && texto.length < 200) return texto;
      } catch {}
    }
    return fallbackMsg;
  };

  // --- REQUISIÇÃO AUXILIAR COM CABEÇALHOS JSON ---
  const fetchApi = async (path, options = {}) => {
    const baseUrl = apiUrl.trim().replace(/\/+$/, "");
    const urlFinal = `${baseUrl}${path}`;
    return fetch(urlFinal, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  };

  // --- 1. LISTAR / OBTER PRODUTOS DO ESTOQUE (GET) ---
  const obterProdutos = async (mostrarToastSucesso = false) => {
    setCarregando(true);
    setStatusConexao("verificando");
    try {
      // Prioridade das rotas do backend ProdutoControle:
      // 1. / (raiz padrão configurada no ProdutoControle)
      // 2. /produtos
      // 3. /selecionar
      // 4. /estoque
      // 5. /listar
      let resposta = null;
      const rotasGet = ["/", "/produtos", "/selecionar", "/estoque", "/listar"];

      for (const rota of rotasGet) {
        try {
          const r = await fetchApi(rota);
          if (r && r.ok) {
            resposta = r;
            break;
          }
        } catch {
          // Tenta próxima rota
        }
      }

      if (resposta && resposta.ok) {
        const dados = await resposta.json();
        const listaBruta = Array.isArray(dados)
          ? dados
          : (dados.content || dados.data || dados.produtos || []);

        const listaNormalizada = listaBruta.map(normalizarProduto).filter(Boolean);
        setProdutos(listaNormalizada);
        setStatusConexao("online");
        if (mostrarToastSucesso) {
          dispararToast(
            "Estoque Atualizado!",
            `${listaNormalizada.length} produto(s) sincronizados com o banco de dados.`,
            "success"
          );
        }
      } else {
        throw new Error("Não foi possível carregar os produtos do estoque.");
      }
    } catch (erro) {
      setStatusConexao("offline");
      dispararToast(
        "Aguardando conexão com " + apiUrl,
        "Certifique-se de que a API Spring Boot está ativa na porta 8080.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  };

  // Carrega ao mudar a URL da API
  useEffect(() => {
    obterProdutos();
  }, [apiUrl]);

  // Atualizar campo do formulário
  const atualizarCampo = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "id" ? { codigo: value } : {})
    }));
  };

  // --- 2. CADASTRAR PRODUTO NO ESTOQUE (POST) ---
  const cadastrar = async (e) => {
    if (e) e.preventDefault();

    if (!produto.codigoModelo || !produto.codigoModelo.trim()) {
      dispararToast("Campo obrigatório", "Preencha o código de modelo do produto.", "error");
      return;
    }

    if (!produto.nome.trim()) {
      dispararToast("Campo obrigatório", "Preencha a descrição ou nome do produto.", "error");
      return;
    }

    if (!produto.categoria.trim()) {
      dispararToast("Campo obrigatório", "Informe a categoria do produto.", "error");
      return;
    }

    setCarregando(true);
    try {
      const qtdNum = produto.quantidade !== "" ? parseInt(produto.quantidade, 10) : 0;
      const precoNum = produto.preco !== "" ? parseFloat(String(produto.preco).replace(",", ".")) : 0.0;

      // Payload compatível com a entidade Produto do Spring Boot
      const payload = {
        codigoModelo: produto.codigoModelo.trim(),
        nome: produto.nome.trim(),
        descricao: produto.nome.trim(),
        categoria: produto.categoria.trim(),
        quantidade: isNaN(qtdNum) ? 0 : qtdNum,
        preco: isNaN(precoNum) ? 0.0 : precoNum,
        valor: isNaN(precoNum) ? 0.0 : precoNum
      };

      const rotasPost = ["/cadastrar", "/produtos", "/"];
      let resposta = null;
      let erroValidacao = null;

      for (const rota of rotasPost) {
        try {
          const r = await fetchApi(rota, {
            method: "POST",
            body: JSON.stringify(payload)
          });

          if (r && (r.status === 400 || r.status === 409 || r.status === 422)) {
            erroValidacao = await extrairMensagemErro(r, "Dados inválidos segundo a API.");
            resposta = r;
            break;
          }

          if (r && (r.ok || r.status === 201 || r.status === 200)) {
            resposta = r;
            break;
          }
        } catch {
          // Continua
        }
      }

      if (erroValidacao) {
        dispararToast("Validação da API", erroValidacao, "error");
        return;
      }

      if (resposta && (resposta.ok || resposta.status === 201 || resposta.status === 200)) {
        dispararToast(
          "Produto cadastrado!",
          `"${produto.nome}" (Modelo: ${produto.codigoModelo.trim()}) foi registrado com sucesso no estoque.`,
          "success"
        );
        cancelar();
        await obterProdutos();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao cadastrar produto.") : "Servidor não respondeu.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast("Erro no cadastro", erro.message || "Falha na conexão com o backend.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 3. SELECIONAR PRODUTO NA TABELA ---
  const selecionar = (p) => {
    const norm = normalizarProduto(p);
    setProduto({
      id: norm.id,
      codigo: norm.codigo,
      codigoModelo: norm.codigoModelo || "",
      nome: norm.nome,
      categoria: norm.categoria,
      quantidade: norm.quantidade,
      preco: norm.preco
    });
    setBotao(false); // Ativa modo Alterar / Remover / Cancelar
    dispararToast("Produto selecionado", `Editando: ${norm.nome} (#${norm.id})`, "info");
  };

  // --- 4. ALTERAR PRODUTO (PUT) ---
  const alterar = async (e) => {
    if (e) e.preventDefault();

    const idVal = produto.codigo !== "" ? produto.codigo : produto.id;
    if (idVal === "" || idVal === undefined || idVal === null) {
      dispararToast("Nenhum produto selecionado", "Selecione um produto na tabela para alterar.", "error");
      return;
    }

    if (!produto.codigoModelo || !produto.codigoModelo.trim()) {
      dispararToast("Campo obrigatório", "Código de modelo do produto não pode ficar em branco.", "error");
      return;
    }

    if (!produto.nome.trim()) {
      dispararToast("Campo obrigatório", "Descrição/nome do produto não pode ficar em branco.", "error");
      return;
    }

    setCarregando(true);
    try {
      const idNumerico = Number(idVal) || idVal;
      const qtdNum = produto.quantidade !== "" ? parseInt(produto.quantidade, 10) : 0;
      const precoNum = produto.preco !== "" ? parseFloat(String(produto.preco).replace(",", ".")) : 0.0;

      const payload = {
        id: idNumerico,
        codigo: idNumerico,
        codigoModelo: produto.codigoModelo.trim(),
        nome: produto.nome.trim(),
        descricao: produto.nome.trim(),
        categoria: produto.categoria.trim() || "Geral",
        quantidade: isNaN(qtdNum) ? 0 : qtdNum,
        preco: isNaN(precoNum) ? 0.0 : precoNum,
        valor: isNaN(precoNum) ? 0.0 : precoNum
      };

      const rotasPut = ["/alterar", `/produtos/${idVal}`, "/produtos", "/"];
      let resposta = null;
      let erroValidacao = null;

      for (const rota of rotasPut) {
        try {
          const r = await fetchApi(rota, {
            method: "PUT",
            body: JSON.stringify(payload)
          });

          if (r && (r.status === 400 || r.status === 409 || r.status === 422)) {
            erroValidacao = await extrairMensagemErro(r, "Dados inválidos ao alterar.");
            resposta = r;
            break;
          }

          if (r && (r.ok || r.status === 200)) {
            resposta = r;
            break;
          }
        } catch {
          // Continua
        }
      }

      if (erroValidacao) {
        dispararToast("Validação da API", erroValidacao, "error");
        return;
      }

      if (resposta && (resposta.ok || resposta.status === 200)) {
        dispararToast(
          "Produto alterado!",
          `O produto #${idVal} (${produto.nome}) foi atualizado no estoque.`,
          "success"
        );
        cancelar();
        await obterProdutos();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao atualizar produto.") : "Falha na resposta da API.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast("Erro na alteração", erro.message || "Falha na conexão com a API.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 5. MOVIMENTAÇÃO RÁPIDA DE ESTOQUE (+1 / -1) ---
  const movimentarEstoque = async (tipoOperacao, quantidadeDelta = 1) => {
    const idVal = produto.codigo !== "" ? produto.codigo : produto.id;
    if (!idVal) return;

    const qtdAtual = parseInt(produto.quantidade || 0, 10);
    if (tipoOperacao === "saida" && qtdAtual < quantidadeDelta) {
      dispararToast("Estoque insuficiente", `Saldo atual é de ${qtdAtual} un. Não é possível retirar ${quantidadeDelta}.`, "error");
      return;
    }

    setCarregando(true);
    try {
      // Tenta rota especializada do ProdutoControle: /produtos/{id}/entrada ou /produtos/{id}/saida
      const rotaEspecializada = `/produtos/${idVal}/${tipoOperacao}?quantidade=${quantidadeDelta}`;
      let sucesso = false;

      try {
        const res = await fetchApi(rotaEspecializada, { method: "POST" });
        if (res && res.ok) {
          sucesso = true;
        }
      } catch {}

      // Fallback: se a rota especializada não responder, altera o produto atualizando a quantidade
      if (!sucesso) {
        const novaQtd = tipoOperacao === "entrada" ? qtdAtual + quantidadeDelta : Math.max(0, qtdAtual - quantidadeDelta);
        const payload = {
          ...produto,
          id: Number(idVal) || idVal,
          codigo: Number(idVal) || idVal,
          quantidade: novaQtd
        };
        await fetchApi("/alterar", { method: "PUT", body: JSON.stringify(payload) });
      }

      dispararToast(
        tipoOperacao === "entrada" ? "Entrada registrada!" : "Saída registrada!",
        `${quantidadeDelta} un ${tipoOperacao === "entrada" ? "adicionada(s)" : "baixada(s)"} no estoque.`,
        "success"
      );

      // Atualiza estado local e recarrega
      const novaQtdLocal = tipoOperacao === "entrada" ? qtdAtual + quantidadeDelta : Math.max(0, qtdAtual - quantidadeDelta);
      setProduto((prev) => ({ ...prev, quantidade: novaQtdLocal }));
      await obterProdutos();
    } catch (err) {
      dispararToast("Erro na movimentação", err.message || "Não foi possível movimentar o estoque.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 6. REMOVER PRODUTO (DELETE) ---
  const confirmarRemover = async () => {
    const idVal = produto.codigo !== "" ? produto.codigo : produto.id;
    if (idVal === "" || idVal === undefined || idVal === null) return;

    setCarregando(true);
    setModalRemover(false);
    try {
      const rotasDelete = [`/remover/${idVal}`, `/produtos/${idVal}`, `/${idVal}`];
      let resposta = null;

      for (const rota of rotasDelete) {
        try {
          const r = await fetchApi(rota, { method: "DELETE" });
          if (r && (r.ok || r.status === 200 || r.status === 204)) {
            resposta = r;
            break;
          }
        } catch {
          // Continua
        }
      }

      if (resposta && (resposta.ok || resposta.status === 200 || resposta.status === 204)) {
        dispararToast("Produto removido!", "O item foi excluído do banco de dados.", "success");
        cancelar();
        await obterProdutos();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao excluir produto.") : "Falha na conexão.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast("Erro ao remover", erro.message || "Falha na comunicação com o banco de dados.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 7. CANCELAR / RESETAR ---
  const cancelar = () => {
    setProduto(produtoVazio);
    setBotao(true); // Volta para botão Cadastrar
  };

  // --- 8. FERRAMENTA DE DIAGNÓSTICO DE ENDPOINTS ---
  const executarDiagnostico = async () => {
    setTestandoDiagnostico(true);
    setDiagnosticoApi(null);
    const resultados = [];
    const rotasParaTestar = [
      { rota: "/produtos", metodo: "GET" },
      { rota: "/", metodo: "GET" },
      { rota: "/status", metodo: "GET" },
      { rota: "/selecionar", metodo: "GET" }
    ];

    let online = false;
    let usaCodigo = false;
    let usaPreco = false;

    for (const item of rotasParaTestar) {
      try {
        const inicio = performance.now();
        const res = await fetchApi(item.rota, { method: item.metodo });
        const tempoMs = Math.round(performance.now() - inicio);

        if (res.ok) {
          online = true;
          let itens = 0;
          try {
            const json = await res.json();
            const arr = Array.isArray(json) ? json : (json.content || json.data || []);
            itens = arr.length;
            if (arr.length > 0) {
              if (arr[0].codigo !== undefined) usaCodigo = true;
              if (arr[0].preco !== undefined || arr[0].valor !== undefined) usaPreco = true;
            }
          } catch {}

          resultados.push({
            rota: item.rota,
            status: `${res.status} OK`,
            tempo: `${tempoMs}ms`,
            sucesso: true,
            detalhe: `${itens} registro(s) retornado(s)`
          });
        } else {
          resultados.push({
            rota: item.rota,
            status: `${res.status} ${res.statusText || ""}`,
            tempo: `${tempoMs}ms`,
            sucesso: false,
            detalhe: "Resposta HTTP com status diferente de 200"
          });
        }
      } catch (err) {
        resultados.push({
          rota: item.rota,
          status: "Falha de Rede / CORS",
          tempo: "-",
          sucesso: false,
          detalhe: err.message || "Sem resposta do servidor"
        });
      }
    }

    setDiagnosticoApi({
      online,
      usaCodigo,
      usaPreco,
      resultados
    });
    setTestandoDiagnostico(false);
  };

  // Lista de categorias únicas para filtro
  const categoriasDisponiveis = useMemo(() => {
    const cats = new Set();
    produtos.forEach((p) => {
      if (p.categoria && p.categoria.trim()) cats.add(p.categoria.trim());
    });
    return Array.from(cats).sort();
  }, [produtos]);

  // Filtragem e busca em tempo real
  const produtosFiltrados = useMemo(() => {
    let lista = produtos;

    // Filtro por categoria
    if (categoriaFiltro !== "TODAS") {
      lista = lista.filter(
        (p) => (p.categoria || "").toLowerCase() === categoriaFiltro.toLowerCase()
      );
    }

    // Busca textual por código, modelo, nome, descrição ou categoria
    if (termoBusca.trim()) {
      const b = termoBusca.toLowerCase();
      lista = lista.filter(
        (p) =>
          String(p.codigo || p.id || "").includes(b) ||
          (p.codigoModelo && p.codigoModelo.toLowerCase().includes(b)) ||
          (p.nome && p.nome.toLowerCase().includes(b)) ||
          (p.descricao && p.descricao.toLowerCase().includes(b)) ||
          (p.categoria && p.categoria.toLowerCase().includes(b))
      );
    }

    return lista;
  }, [produtos, termoBusca, categoriaFiltro]);

  // Métricas de estoque (KPIs)
  const metricas = useMemo(() => {
    const totalItens = produtos.length;
    const totalUnidades = produtos.reduce((acc, p) => acc + (Number(p.quantidade) || 0), 0);
    const valorTotalEstoque = produtos.reduce(
      (acc, p) => acc + (Number(p.quantidade) || 0) * (Number(p.preco) || 0),
      0
    );
    const estoqueCritico = produtos.filter((p) => Number(p.quantidade) <= 5).length;

    return {
      totalItens,
      totalUnidades,
      valorTotalEstoque,
      estoqueCritico
    };
  }, [produtos]);

  // Formatar moeda brasileira (R$)
  const formatarMoeda = (valor) => {
    const num = Number(valor);
    if (isNaN(num)) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // Carregar dados de teste caso o backend ainda esteja offline
  const carregarMockParaTeste = () => {
    setProdutos([
      { id: 1, codigo: 1, codigoModelo: "MOD-TEC-001", nome: "Teclado Mecânico RGB Switch Blue", categoria: "Periféricos", quantidade: 18, preco: 249.9 },
      { id: 2, codigo: 2, codigoModelo: "MOD-MOU-002", nome: "Mouse Gamer Óptico 16000 DPI", categoria: "Periféricos", quantidade: 32, preco: 139.5 },
      { id: 3, codigo: 3, codigoModelo: "MOD-MON-003", nome: "Monitor LED 24\" IPS Full HD 144Hz", categoria: "Monitores", quantidade: 4, preco: 849.0 },
      { id: 4, codigo: 4, codigoModelo: "MOD-CAB-004", nome: "Cabo HDMI 2.1 Ultra High Speed 2m", categoria: "Cabos & Acessórios", quantidade: 0, preco: 45.0 },
      { id: 5, codigo: 5, codigoModelo: "MOD-SSD-005", nome: "SSD NVMe M.2 1TB 3500MB/s", categoria: "Hardware", quantidade: 12, preco: 389.9 },
      { id: 6, codigo: 6, codigoModelo: "MOD-HEA-006", nome: "Headset Gamer 7.1 Surround", categoria: "Áudio", quantidade: 3, preco: 219.0 }
    ]);
    dispararToast("Dados de estoque carregados", "Exibindo itens de demonstração para testes de interface.", "info");
  };

  return (
    <div className="app-container">
      {/* HEADER / NAVBAR ESTILO SHADCN */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon-wrapper">
              <Icons.Package size={20} />
            </div>
            <div>
              <div className="brand-title">
                Controle de Estoque
                <span className="brand-tag">React 19 + shadcn</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            {/* Status da Conexão com localhost:8080 */}
            <div
              className={`badge ${
                statusConexao === "online"
                  ? "badge-success"
                  : statusConexao === "verificando"
                  ? "badge-warning"
                  : "badge-outline"
              }`}
              title={`API Backend: ${apiUrl}`}
            >
              <span className="badge-pulse"></span>
              {statusConexao === "online" ? "localhost:8080 Conectado" : "localhost:8080 Offline"}
            </div>

            {/* Botão para atualizar lista / reconectar */}
            <button
              onClick={() => obterProdutos(true)}
              className="btn btn-outline btn-icon"
              title="Recarregar dados do estoque"
              disabled={carregando}
            >
              <Icons.Refresh size={16} className={carregando ? "animate-spin" : ""} />
            </button>

            {/* Configurar URL da API */}
            <button
              onClick={() => setMostrarConfigApi(true)}
              className="btn btn-outline btn-icon"
              title="Configurações da Conexão"
            >
              <Icons.Sliders size={16} />
            </button>

            {/* Alternador de Tema Dark / Light */}
            <button
              onClick={() => setTemaEscuro(!temaEscuro)}
              className="btn btn-ghost btn-icon"
              title="Alternar Tema Escuro / Claro"
            >
              {temaEscuro ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <div className="hero-banner">
          <h1 className="hero-title">Gestão e Controle de Estoque</h1>
          <p className="hero-subtitle">
            Interface integrada ao banco de dados em <code style={{ color: "hsl(var(--primary))" }}>{apiUrl}</code>.
            Cadastre novos produtos, monitore saldos, altere preços e gerencie o estoque em tempo real.
          </p>
        </div>

        {/* CARDS DE RESUMO / MÉTRICAS (KPIs) */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Icons.Package size={22} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{metricas.totalItens}</span>
              <span className="stat-label">Itens Cadastrados</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
              <Icons.Boxes size={22} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{metricas.totalUnidades} un</span>
              <span className="stat-label">Total em Estoque</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
              <Icons.DollarSign size={22} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{formatarMoeda(metricas.valorTotalEstoque)}</span>
              <span className="stat-label">Valor do Inventário</span>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                color: metricas.estoqueCritico > 0 ? "hsl(var(--destructive))" : "#f59e0b",
                backgroundColor: metricas.estoqueCritico > 0 ? "hsla(var(--destructive), 0.1)" : "rgba(245, 158, 11, 0.1)"
              }}
            >
              <Icons.AlertTriangle size={22} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{metricas.estoqueCritico}</span>
              <span className="stat-label">Alerta de Estoque Baixo</span>
            </div>
          </div>
        </div>

        <div className="app-grid">
          {/* PAINEL LATERAL: FORMULÁRIO DE PRODUTO */}
          <div className="shadcn-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2 className="card-title">
                  {botao ? (
                    <>
                      <Icons.Plus size={18} /> Novo Produto
                    </>
                  ) : (
                    <>
                      <Icons.Edit size={18} /> Editar Produto #{produto.codigo || produto.id}
                    </>
                  )}
                </h2>
                <p className="card-description">
                  {botao
                    ? "Informe os dados do produto para armazenar no estoque"
                    : "Atualize os campos ou realize movimentação rápida de saldo"}
                </p>
              </div>

              {!botao && <span className="badge badge-warning">Modo Edição</span>}
            </div>

            <div className="card-content">
              <form onSubmit={botao ? cadastrar : alterar}>
                {/* CAMPO: CÓDIGO (ID) E CÓDIGO DE MODELO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0.75rem" }}>
                  {/* CAMPO: CÓDIGO (ID) */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Código (ID)</span>
                      <span className="form-label-hint">Auto</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Icons.Id size={16} />
                      </span>
                      <input
                        type="text"
                        name="id"
                        value={produto.codigo || produto.id || ""}
                        onChange={atualizarCampo}
                        placeholder={botao ? "Auto" : "Código"}
                        className="shadcn-input with-icon"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* CAMPO: CÓDIGO DE MODELO */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Código de Modelo *</span>
                      <span className="form-label-hint">Identificador único</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Icons.Barcode size={16} />
                      </span>
                      <input
                        type="text"
                        name="codigoModelo"
                        value={produto.codigoModelo || ""}
                        onChange={atualizarCampo}
                        placeholder="Ex: MOD-8921"
                        className="shadcn-input with-icon"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* CAMPO: DESCRIÇÃO / NOME DO PRODUTO */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Descrição / Nome do Produto *</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <Icons.Package size={16} />
                    </span>
                    <input
                      type="text"
                      name="nome"
                      value={produto.nome}
                      onChange={atualizarCampo}
                      placeholder="Ex: Teclado Mecânico RGB"
                      className="shadcn-input with-icon"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* CAMPO: CATEGORIA */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Categoria *</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <Icons.Tag size={16} />
                    </span>
                    <input
                      type="text"
                      name="categoria"
                      value={produto.categoria}
                      onChange={atualizarCampo}
                      placeholder="Ex: Periféricos, Hardware, Monitores"
                      className="shadcn-input with-icon"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* CAMPOS EM DUAS COLUNAS: QUANTIDADE E PREÇO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {/* QUANTIDADE */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Estoque (Qtd) *</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Icons.Boxes size={16} />
                      </span>
                      <input
                        type="number"
                        min="0"
                        name="quantidade"
                        value={produto.quantidade}
                        onChange={atualizarCampo}
                        placeholder="Ex: 10"
                        className="shadcn-input with-icon"
                        required
                      />
                    </div>
                  </div>

                  {/* PREÇO UNITÁRIO */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Preço Unitário *</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Icons.DollarSign size={16} />
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        name="preco"
                        value={produto.preco}
                        onChange={atualizarCampo}
                        placeholder="Ex: 199.90"
                        className="shadcn-input with-icon"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* MOVIMENTAÇÃO RÁPIDA DE ESTOQUE (QUANDO ESTÁ EDITANDO) */}
                {!botao && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      borderRadius: "calc(var(--radius) - 0.25rem)",
                      backgroundColor: "var(--surface-subtle)",
                      border: "1px solid hsl(var(--border))"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--muted-foreground))", marginBottom: "0.5rem" }}>
                      Movimentação Rápida de Saldo:
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => movimentarEstoque("entrada", 1)}
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1, color: "#10b981", borderColor: "#a7f3d0" }}
                        title="Adicionar +1 unidade no estoque"
                        disabled={carregando}
                      >
                        <Icons.Plus size={14} /> +1 Entrada
                      </button>
                      <button
                        type="button"
                        onClick={() => movimentarEstoque("saida", 1)}
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1, color: "hsl(var(--destructive))", borderColor: "hsla(var(--destructive), 0.3)" }}
                        title="Dar baixa de 1 unidade no estoque"
                        disabled={carregando}
                      >
                        <Icons.Minus size={14} /> -1 Saída
                      </button>
                    </div>
                  </div>
                )}

                {/* BOTÕES DE AÇÃO: CADASTRAR OU (ALTERAR, REMOVER, CANCELAR) */}
                <div className="form-actions-grid">
                  {botao ? (
                    <button
                      type="submit"
                      className="btn btn-default btn-full"
                      disabled={carregando}
                    >
                      <Icons.Plus size={16} />
                      Cadastrar no Estoque
                    </button>
                  ) : (
                    <>
                      <div className="actions-row">
                        <button
                          type="button"
                          onClick={alterar}
                          className="btn btn-default"
                          disabled={carregando}
                        >
                          <Icons.Edit size={15} />
                          Salvar Alterações
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalRemover(true)}
                          className="btn btn-destructive"
                          disabled={carregando}
                        >
                          <Icons.Trash size={15} />
                          Excluir
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={cancelar}
                        className="btn btn-outline btn-full"
                      >
                        <Icons.X size={15} />
                        Cancelar Edição
                      </button>
                    </>
                  )}
                </div>
              </form>

              {/* Dica de conexão caso esteja offline */}
              {statusConexao === "offline" && (
                <div
                  style={{
                    marginTop: "1.25rem",
                    padding: "0.875rem",
                    borderRadius: "calc(var(--radius) - 0.25rem)",
                    backgroundColor: "hsla(var(--destructive), 0.08)",
                    border: "1px solid hsla(var(--destructive), 0.25)",
                    fontSize: "0.8125rem",
                    color: "hsl(var(--destructive))"
                  }}
                >
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <Icons.Alert size={16} style={{ marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <strong>Atenção:</strong> O backend em <code>{apiUrl}</code> não respondeu.
                      <div style={{ marginTop: "0.35rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => setMostrarConfigApi(true)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "inherit",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: 0
                          }}
                        >
                          Configurar Conexão / Testar
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={carregarMockParaTeste}
                          style={{
                            background: "none",
                            border: "none",
                            color: "inherit",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: 0
                          }}
                        >
                          Carregar dados fictícios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PAINEL DIREITO: TABELA DE PRODUTOS */}
          <div className="shadcn-card">
            {/* BARRA DE FERRAMENTAS DA TABELA */}
            <div className="table-toolbar">
              <div className="search-box">
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Icons.Search size={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar por código, descrição ou categoria..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="shadcn-input with-icon"
                  />
                  {termoBusca && (
                    <button
                      onClick={() => setTermoBusca("")}
                      className="btn-ghost btn-icon"
                      style={{ position: "absolute", right: "6px", width: "24px", height: "24px" }}
                    >
                      <Icons.X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Filtro de Categoria e Contador */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                {categoriasDisponiveis.length > 0 && (
                  <select
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                    className="shadcn-input"
                    style={{ height: "2rem", padding: "0 0.5rem", fontSize: "0.8125rem", width: "auto" }}
                  >
                    <option value="TODAS">Todas as Categorias</option>
                    {categoriasDisponiveis.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                )}

                <span className="badge badge-outline">
                  {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "produto" : "produtos"}
                </span>

                <button
                  onClick={() => obterProdutos(true)}
                  className="btn btn-secondary btn-sm"
                  title="Atualizar lista do estoque"
                >
                  <Icons.Refresh size={14} className={carregando ? "animate-spin" : ""} />
                  Atualizar
                </button>
              </div>
            </div>

            {/* TABELA RESPONSIVA DE ESTOQUE */}
            <div className="table-container">
              {produtosFiltrados.length > 0 ? (
                <table className="shadcn-table">
                  <thead>
                    <tr>
                      <th style={{ width: "65px" }}>Código</th>
                      <th style={{ width: "125px" }}>Cód. Modelo</th>
                      <th>Descrição do Produto</th>
                      <th>Categoria</th>
                      <th style={{ textAlign: "center", width: "115px" }}>Estoque</th>
                      <th style={{ textAlign: "right", width: "110px" }}>Preço Un.</th>
                      <th style={{ textAlign: "right", width: "115px" }}>Subtotal</th>
                      <th style={{ width: "105px", textAlign: "right" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((item, index) => {
                      const identificador =
                        item.codigo !== undefined && item.codigo !== null && item.codigo !== ""
                          ? item.codigo
                          : item.id !== undefined && item.id !== null && item.id !== ""
                          ? item.id
                          : index + 1;

                      const estaSelecionado =
                        !botao &&
                        String(produto.codigo || produto.id) === String(identificador);

                      const qtd = Number(item.quantidade) || 0;
                      const preco = Number(item.preco) || 0;
                      const subtotal = qtd * preco;

                      const esgotado = qtd <= 0;
                      const baixo = qtd > 0 && qtd <= 5;

                      return (
                        <tr
                          key={item.codigo ?? item.id ?? index}
                          className={estaSelecionado ? "row-selected" : ""}
                        >
                          <td className="id-cell">#{identificador}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "hsl(var(--primary))",
                                backgroundColor: "hsla(var(--primary), 0.08)",
                                border: "1px solid hsla(var(--primary), 0.2)",
                                padding: "2px 6px",
                                borderRadius: "4px"
                              }}
                              title={`Código de Modelo: ${item.codigoModelo || "Não definido"}`}
                            >
                              {item.codigoModelo || "—"}
                            </span>
                          </td>
                          <td>
                            <div className="user-name-cell">
                              <div
                                className="user-avatar-placeholder"
                                style={{
                                  backgroundColor: esgotado
                                    ? "hsla(var(--destructive), 0.1)"
                                    : baixo
                                    ? "rgba(245, 158, 11, 0.1)"
                                    : "hsla(var(--primary), 0.08)"
                                }}
                              >
                                <Icons.Package size={14} />
                              </div>
                              <span style={{ fontWeight: 600 }}>{item.nome || item.descricao}</span>
                            </div>
                          </td>
                          <td>
                            <span className="category-pill">{item.categoria || "Geral"}</span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span
                              className={`badge ${
                                esgotado ? "badge-danger" : baixo ? "badge-warning" : "badge-success"
                              }`}
                              title={
                                esgotado
                                  ? "Produto esgotado no estoque!"
                                  : baixo
                                  ? "Atenção: Saldo de estoque baixo!"
                                  : "Estoque em nível normal"
                              }
                            >
                              {esgotado ? "Esgotado (0)" : `${qtd} un`}
                            </span>
                          </td>
                          <td style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>
                            {formatarMoeda(preco)}
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              color: "hsl(var(--muted-foreground))"
                            }}
                          >
                            {formatarMoeda(subtotal)}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => selecionar(item)}
                                className={`btn btn-sm ${
                                  estaSelecionado ? "btn-default" : "btn-outline"
                                }`}
                                title="Selecionar para editar saldo ou preço"
                              >
                                <Icons.Edit size={13} />
                                {estaSelecionado ? "Editando" : "Selecionar"}
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
                  <div className="empty-icon-box">
                    <Icons.Package size={24} />
                  </div>
                  <div className="empty-title">
                    {termoBusca || categoriaFiltro !== "TODAS"
                      ? "Nenhum produto encontrado com os filtros atuais"
                      : "Nenhum produto cadastrado no estoque ainda"}
                  </div>
                  <p className="empty-text">
                    {termoBusca || categoriaFiltro !== "TODAS"
                      ? "Tente ajustar o termo de pesquisa ou selecionar outra categoria."
                      : "Use o formulário ao lado para registrar o primeiro item no banco de dados."}
                  </p>
                  {!termoBusca && statusConexao === "offline" && (
                    <button
                      onClick={carregarMockParaTeste}
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Carregar produtos de demonstração
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {modalRemover && (
        <div className="modal-overlay" onClick={() => setModalRemover(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: "hsl(var(--destructive))" }}>
                <Icons.Trash size={18} /> Confirmar Exclusão de Produto
              </h3>
              <button onClick={() => setModalRemover(false)} className="btn btn-ghost btn-icon">
                <Icons.X size={16} />
              </button>
            </div>
            <div className="card-content">
              <p style={{ fontSize: "0.9375rem", marginBottom: "0.75rem" }}>
                Tem certeza que deseja remover o produto <strong>{produto.nome}</strong> (#{produto.codigo || produto.id})?
              </p>
              <div
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  padding: "0.75rem",
                  borderRadius: "calc(var(--radius) - 0.25rem)",
                  fontSize: "0.8125rem",
                  marginBottom: "1.25rem",
                  border: "1px solid hsl(var(--border))"
                }}
              >
                <div>
                  <strong>Código de Modelo:</strong> {produto.codigoModelo || "—"}
                </div>
                <div>
                  <strong>Categoria:</strong> {produto.categoria || "Geral"}
                </div>
                <div>
                  <strong>Estoque Atual:</strong> {produto.quantidade || 0} un
                </div>
                <div>
                  <strong>Preço Unitário:</strong> {formatarMoeda(produto.preco)}
                </div>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", marginBottom: "1.5rem" }}>
                Essa operação enviará uma requisição <code>DELETE</code> ao backend Spring Boot e removerá o item do inventário.
              </p>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setModalRemover(false)}
                  className="btn btn-outline"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarRemover}
                  className="btn btn-destructive"
                  disabled={carregando}
                >
                  <Icons.Trash size={16} />
                  Sim, Excluir Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIGURAÇÃO DA API & DIAGNÓSTICO */}
      {mostrarConfigApi && (
        <div className="modal-overlay" onClick={() => setMostrarConfigApi(false)}>
          <div className="modal-card" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title">
                <Icons.Database size={18} /> Conexão & Diagnóstico da API de Estoque
              </h3>
              <button onClick={() => setMostrarConfigApi(false)} className="btn btn-ghost btn-icon">
                <Icons.X size={16} />
              </button>
            </div>
            <div className="card-content">
              <p style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem" }}>
                Configure o endereço base da sua API REST e teste os endpoints de estoque.
              </p>

              <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                <label className="form-label">URL Base do Servidor</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => salvarApiUrl(e.target.value)}
                  placeholder="http://localhost:8080"
                  className="shadcn-input"
                />
              </div>

              {/* Botões de preenchimento rápido */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <button
                  type="button"
                  onClick={() => salvarApiUrl("http://localhost:8080")}
                  className={`btn btn-sm ${apiUrl === "http://localhost:8080" ? "btn-default" : "btn-secondary"}`}
                >
                  localhost:8080 (Padrão Spring)
                </button>
                <button
                  type="button"
                  onClick={() => salvarApiUrl("/api")}
                  className={`btn btn-sm ${apiUrl === "/api" ? "btn-default" : "btn-secondary"}`}
                  title="Usa o proxy do Vite para ignorar bloqueios de CORS"
                >
                  /api (Proxy Vite)
                </button>
                <button
                  type="button"
                  onClick={() => salvarApiUrl("http://localhost:3000")}
                  className={`btn btn-sm ${apiUrl === "http://localhost:3000" ? "btn-default" : "btn-secondary"}`}
                >
                  localhost:3000 (Node)
                </button>
              </div>

              {/* Painel de Diagnóstico */}
              <div
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  padding: "0.875rem 1rem",
                  borderRadius: "calc(var(--radius) - 0.25rem)",
                  border: "1px solid hsl(var(--border))",
                  fontSize: "0.8125rem",
                  marginBottom: "1.25rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 600 }}>Testador de Endpoints de Estoque:</span>
                  <button
                    type="button"
                    onClick={executarDiagnostico}
                    className="btn btn-outline btn-sm"
                    disabled={testandoDiagnostico}
                  >
                    <Icons.Refresh size={13} className={testandoDiagnostico ? "animate-spin" : ""} />
                    {testandoDiagnostico ? "Testando..." : "Executar Diagnóstico"}
                  </button>
                </div>

                {diagnosticoApi && (
                  <div style={{ marginTop: "0.75rem", borderTop: "1px solid hsl(var(--border))", paddingTop: "0.75rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>
                      <strong>Status Geral:</strong>{" "}
                      <span
                        style={{
                          color: diagnosticoApi.online ? "#10b981" : "hsl(var(--destructive))",
                          fontWeight: 600
                        }}
                      >
                        {diagnosticoApi.online ? "● API Respondendo" : "● Não Conectado"}
                      </span>
                      {diagnosticoApi.online && (
                        <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                          ({diagnosticoApi.usaCodigo ? "campo 'codigo' ativo;" : ""} {diagnosticoApi.usaPreco ? "campo de preço ativo" : ""})
                        </span>
                      )}
                    </div>
                    {diagnosticoApi.resultados.map((res, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.25rem 0",
                          fontSize: "0.75rem",
                          color: res.sucesso ? "#10b981" : "hsl(var(--muted-foreground))"
                        }}
                      >
                        <code>{res.rota}</code>
                        <span>{res.status} ({res.detalhe})</span>
                      </div>
                    ))}
                  </div>
                )}

                {!diagnosticoApi && (
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                    Clique em "Executar Diagnóstico" para testar <code>/produtos</code>, <code>/</code> e <code>/status</code> no backend.
                  </p>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarConfigApi(false);
                    obterProdutos(true);
                  }}
                  className="btn btn-default"
                >
                  Salvar e Reconectar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILHA DE NOTIFICAÇÕES (SHADCN TOAST) */}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.tipo}`}>
            {t.tipo === "success" && <Icons.Check size={18} style={{ color: "#10b981", flexShrink: 0 }} />}
            {t.tipo === "error" && <Icons.Alert size={18} style={{ color: "hsl(var(--destructive))", flexShrink: 0 }} />}
            {t.tipo === "info" && <Icons.Database size={18} style={{ color: "#3b82f6", flexShrink: 0 }} />}

            <div className="toast-content">
              <div className="toast-title">{t.titulo}</div>
              <div className="toast-desc">{t.desc}</div>
            </div>

            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="btn-ghost btn-icon"
              style={{ width: "20px", height: "20px", padding: 0 }}
            >
              <Icons.X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        Controle de Estoque • Desenvolvido com React 19+ e Design System shadcn/ui • Integrado ao backend Spring Boot em <code>localhost:8080</code>
      </footer>
    </div>
  );
}
