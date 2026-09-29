import React, { useState, useEffect, useMemo } from "react";

// --- ÍCONES SVG SHADCN ESTILO LUCIDE (100% nativos sem dependências externas) ---
const Icons = {
  User: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  MapPin: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Id: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="14" x="3" y="5" rx="2" /><path d="M7 15h4M15 15h2M7 11h2" />
    </svg>
  ),
  Search: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Plus: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5v14" />
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
  Users: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
};

// Objeto pessoa padrão
const pessoaVazia = {
  id: "",
  codigo: "",
  nome: "",
  cidade: ""
};

// Utilitário para normalizar qualquer objeto vindo da API
const normalizarPessoa = (item) => {
  if (!item || typeof item !== "object") return null;
  const identificador =
    item.codigo !== undefined && item.codigo !== null && item.codigo !== ""
      ? item.codigo
      : item.id !== undefined && item.id !== null && item.id !== ""
      ? item.id
      : item._id ?? "";
  return {
    ...item,
    id: identificador,
    codigo: identificador,
    nome: item.nome ?? "",
    cidade: item.cidade ?? ""
  };
};

export default function App() {
  // --- ESTADOS PRINCIPAIS ---
  const [pessoa, setPessoa] = useState(pessoaVazia);
  const [pessoas, setPessoas] = useState([]);
  const [botao, setBotao] = useState(true); // true = cadastrar, false = alterar/remover/cancelar
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // --- CONFIGURAÇÃO DA API (com persistência no localStorage) ---
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem("pessoa_api_url") || "http://localhost:8080";
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
    localStorage.setItem("pessoa_api_url", urlLimpa);
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

  // --- FUNÇÃO AUXILIAR DE REQUISIÇÃO ---
  const fetchApi = async (path, options = {}) => {
    const baseUrl = apiUrl.trim().replace(/\/+$/, "");
    const urlFinal = baseUrl.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}${path}`;
    return fetch(urlFinal, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  };

  // --- 1. LISTAR / OBTER PESSOAS DO BANCO DE DADOS (GET) ---
  const obterPessoas = async (mostrarToastSucesso = false) => {
    setCarregando(true);
    setStatusConexao("verificando");
    try {
      // Prioridade das rotas Spring Boot / REST:
      // 1. /listar (clássico do Spring Boot)
      // 2. / (raiz)
      // 3. /pessoas
      let resposta = null;
      const rotasGet = ["/listar", "/", "/pessoas"];
      
      for (const rota of rotasGet) {
        try {
          const r = await fetchApi(rota);
          if (r && r.ok) {
            resposta = r;
            break;
          }
        } catch {
          // segue para a próxima rota se houver erro de rede
        }
      }

      if (resposta && resposta.ok) {
        const dados = await resposta.json();
        const listaBruta = Array.isArray(dados)
          ? dados
          : (dados.content || dados.data || dados.pessoas || []);
        
        const listaNormalizada = listaBruta.map(normalizarPessoa).filter(Boolean);
        setPessoas(listaNormalizada);
        setStatusConexao("online");
        if (mostrarToastSucesso) {
          dispararToast(
            "Conectado com sucesso!",
            `${listaNormalizada.length} registro(s) sincronizados com o backend.`,
            "success"
          );
        }
      } else {
        throw new Error("Não foi possível carregar a lista de pessoas.");
      }
    } catch (erro) {
      setStatusConexao("offline");
      dispararToast(
        "Aguardando conexão com " + apiUrl,
        "Certifique-se de que sua API está ativa e com CORS liberado (@CrossOrigin), ou use o proxy /api.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  };

  // Executa o carregamento inicial ao mudar apiUrl
  useEffect(() => {
    obterPessoas();
  }, [apiUrl]);

  // Atualizar campo do formulário
  const atualizarPessoa = (e) => {
    const { name, value } = e.target;
    setPessoa((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "id" ? { codigo: value } : {})
    }));
  };

  // --- 2. CADASTRAR PESSOA (POST) ---
  const cadastrar = async (e) => {
    if (e) e.preventDefault();

    if (!pessoa.nome.trim() || !pessoa.cidade.trim()) {
      dispararToast("Campos obrigatórios", "Por favor, preencha o Nome e a Cidade.", "error");
      return;
    }

    setCarregando(true);
    try {
      const payload = {
        nome: pessoa.nome.trim(),
        cidade: pessoa.cidade.trim()
      };

      // Tenta rotas em ordem comum: /cadastrar (Spring Boot Ralf Lima), /, /pessoas
      const rotasPost = ["/cadastrar", "/", "/pessoas"];
      let resposta = null;
      let erroValidacao = null;

      for (const rota of rotasPost) {
        try {
          const r = await fetchApi(rota, {
            method: "POST",
            body: JSON.stringify(payload)
          });

          // Se a API retornou erro de validação (400 ou 422), captura a mensagem direta do Spring Boot
          if (r && (r.status === 400 || r.status === 422)) {
            erroValidacao = await extrairMensagemErro(r, "Dados inválidos segundo a API.");
            resposta = r;
            break;
          }

          if (r && (r.ok || r.status === 201 || r.status === 200)) {
            resposta = r;
            break;
          }
        } catch {
          // Continua tentando caso haja erro de rota
        }
      }

      if (erroValidacao) {
        dispararToast("Validação da API", erroValidacao, "error");
        return;
      }

      if (resposta && (resposta.ok || resposta.status === 201 || resposta.status === 200)) {
        dispararToast("Pessoa cadastrada!", `${pessoa.nome} foi salvo com sucesso.`, "success");
        cancelar();
        await obterPessoas();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao cadastrar.") : "Servidor não respondeu.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast(
        "Erro no cadastro",
        erro.message || "Verifique se o backend está em execução.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  };

  // --- 3. SELECIONAR PESSOA NA TABELA ---
  const selecionar = (p) => {
    const norm = normalizarPessoa(p);
    setPessoa({
      id: norm.id,
      codigo: norm.codigo,
      nome: norm.nome,
      cidade: norm.cidade
    });
    setBotao(false); // Ativa botões Alterar, Remover, Cancelar
    dispararToast("Pessoa selecionada", `Editando: ${norm.nome} (#${norm.id})`, "info");
  };

  // --- 4. ALTERAR DADOS (PUT) ---
  const alterar = async (e) => {
    if (e) e.preventDefault();

    const idVal = pessoa.codigo !== "" ? pessoa.codigo : pessoa.id;
    if (idVal === "" || idVal === undefined || idVal === null) {
      dispararToast("Nenhuma pessoa selecionada", "Selecione uma pessoa na tabela para alterar.", "error");
      return;
    }

    if (!pessoa.nome.trim() || !pessoa.cidade.trim()) {
      dispararToast("Campos obrigatórios", "Nome e Cidade não podem ficar em branco.", "error");
      return;
    }

    setCarregando(true);
    try {
      const idNumerico = Number(idVal) || idVal;
      // Envia TANTO 'codigo' quanto 'id' no payload para compatibilidade universal
      const payload = {
        codigo: idNumerico,
        id: idNumerico,
        nome: pessoa.nome.trim(),
        cidade: pessoa.cidade.trim()
      };

      // Tenta rotas em ordem comum: /alterar (Spring Boot Ralf Lima), /, /pessoas/{id}, /pessoas
      const rotasPut = ["/alterar", "/", `/pessoas/${idVal}`, "/pessoas"];
      let resposta = null;
      let erroValidacao = null;

      for (const rota of rotasPut) {
        try {
          const r = await fetchApi(rota, {
            method: "PUT",
            body: JSON.stringify(payload)
          });

          if (r && (r.status === 400 || r.status === 422)) {
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

      if (resposta && resposta.ok) {
        dispararToast("Alterado com sucesso!", `Registro de ${pessoa.nome} atualizado.`, "success");
        cancelar();
        await obterPessoas();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao atualizar registro.") : "Falha na conexão.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast("Erro na alteração", erro.message || "Falha na conexão com a API.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 5. REMOVER PESSOA (DELETE) ---
  const confirmarRemover = async () => {
    const idVal = pessoa.codigo !== "" ? pessoa.codigo : pessoa.id;
    if (idVal === "" || idVal === undefined || idVal === null) return;

    setCarregando(true);
    setModalRemover(false);
    try {
      // Prioridade das rotas DELETE:
      // 1. /remover/{codigo} (Spring Boot Ralf Lima)
      // 2. /{codigo}
      // 3. /pessoas/{id}
      const rotasDelete = [`/remover/${idVal}`, `/${idVal}`, `/pessoas/${idVal}`];
      let resposta = null;

      for (const rota of rotasDelete) {
        try {
          const r = await fetchApi(rota, {
            method: "DELETE"
          });

          if (r && (r.ok || r.status === 200 || r.status === 204)) {
            resposta = r;
            break;
          }
        } catch {
          // Continua
        }
      }

      if (resposta && (resposta.ok || resposta.status === 200 || resposta.status === 204)) {
        dispararToast("Pessoa removida!", "O registro foi excluído do banco de dados.", "success");
        cancelar();
        await obterPessoas();
      } else {
        const msg = resposta ? await extrairMensagemErro(resposta, "Erro ao excluir registro.") : "Falha ao conectar com o banco.";
        throw new Error(msg);
      }
    } catch (erro) {
      dispararToast("Erro ao remover", erro.message || "Falha ao conectar com o banco de dados.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // --- 6. CANCELAR / RESETAR ---
  const cancelar = () => {
    setPessoa(pessoaVazia);
    setBotao(true); // Volta para botão Cadastrar
  };

  // --- 7. FERRAMENTA DE DIAGNÓSTICO DE ENDPOINTS ---
  const executarDiagnostico = async () => {
    setTestandoDiagnostico(true);
    setDiagnosticoApi(null);
    const resultados = [];
    const rotasParaTestar = [
      { rota: "/listar", metodo: "GET" },
      { rota: "/", metodo: "GET" },
      { rota: "/pessoas", metodo: "GET" }
    ];

    let online = false;
    let usaCodigo = false;
    let usaId = false;

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
              if (arr[0].id !== undefined) usaId = true;
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
            detalhe: "Rota respondeu com status diferente de 200"
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
      usaId,
      resultados
    });
    setTestandoDiagnostico(false);
  };

  // Filtragem em tempo real na tabela
  const pessoasFiltradas = useMemo(() => {
    if (!termoBusca.trim()) return pessoas;
    const busca = termoBusca.toLowerCase();
    return pessoas.filter(
      (p) =>
        String(p.codigo || p.id || "").includes(busca) ||
        (p.nome && p.nome.toLowerCase().includes(busca)) ||
        (p.cidade && p.cidade.toLowerCase().includes(busca))
    );
  }, [pessoas, termoBusca]);

  // Carregar dados de teste caso o backend ainda esteja offline
  const carregarMockParaTeste = () => {
    setPessoas([
      { id: 1, codigo: 1, nome: "Lucas Mendes", cidade: "São Paulo" },
      { id: 2, codigo: 2, nome: "Beatriz Santos", cidade: "Rio de Janeiro" },
      { id: 3, codigo: 3, nome: "Carlos Eduardo", cidade: "Belo Horizonte" },
      { id: 4, codigo: 4, nome: "Mariana Costa", cidade: "Curitiba" }
    ]);
    dispararToast("Dados de demonstração carregados", "Exibindo pessoas para testes de interface.", "info");
  };

  return (
    <div className="app-container">
      {/* HEADER / NAVBAR ESTILO SHADCN */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon-wrapper">
              <Icons.Users size={18} />
            </div>
            <div>
              <div className="brand-title">
                Cadastro de Pessoas
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
              onClick={() => obterPessoas(true)}
              className="btn btn-outline btn-icon"
              title="Recarregar dados do banco"
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
          <h1 className="hero-title">Gerenciador de Pessoas</h1>
          <p className="hero-subtitle">
            Interface integrada ao banco de dados em <code style={{ color: "hsl(var(--primary))" }}>{apiUrl}</code>.
            Cadastre, selecione, atualize e remova registros com atualização instantânea.
          </p>
        </div>

        <div className="app-grid">
          {/* PAINEL LATERAL: FORMULÁRIO DE CADASTRO / EDIÇÃO */}
          <div className="shadcn-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2 className="card-title">
                  {botao ? (
                    <>
                      <Icons.Plus size={18} /> Novo Cadastro
                    </>
                  ) : (
                    <>
                      <Icons.Edit size={18} /> Editar Pessoa #{pessoa.codigo || pessoa.id}
                    </>
                  )}
                </h2>
                <p className="card-description">
                  {botao
                    ? "Preencha as informações para registrar no banco"
                    : "Modifique os campos e clique em Alterar ou Remover"}
                </p>
              </div>

              {!botao && (
                <span className="badge badge-warning">Modo Edição</span>
              )}
            </div>

            <div className="card-content">
              <form onSubmit={botao ? cadastrar : alterar}>
                {/* CAMPO: ID / CÓDIGO (Visível apenas em edição ou automático) */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Código (ID)</span>
                    <span className="form-label-hint">Gerado pelo banco</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <Icons.Id size={16} />
                    </span>
                    <input
                      type="text"
                      name="id"
                      value={pessoa.codigo || pessoa.id || ""}
                      onChange={atualizarPessoa}
                      placeholder={botao ? "Automático (Auto-Increment)" : "Código / ID da Pessoa"}
                      className="shadcn-input with-icon"
                      readOnly
                    />
                  </div>
                </div>

                {/* CAMPO: NOME */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Nome Completo *</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <Icons.User size={16} />
                    </span>
                    <input
                      type="text"
                      name="nome"
                      value={pessoa.nome}
                      onChange={atualizarPessoa}
                      placeholder="Ex: Ana Clara Silva"
                      className="shadcn-input with-icon"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* CAMPO: CIDADE */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Cidade *</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <Icons.MapPin size={16} />
                    </span>
                    <input
                      type="text"
                      name="cidade"
                      value={pessoa.cidade}
                      onChange={atualizarPessoa}
                      placeholder="Ex: São Paulo"
                      className="shadcn-input with-icon"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO: CADASTRAR OU (ALTERAR, REMOVER, CANCELAR) */}
                <div className="form-actions-grid">
                  {botao ? (
                    <button
                      type="submit"
                      className="btn btn-default btn-full"
                      disabled={carregando}
                    >
                      <Icons.Plus size={16} />
                      Cadastrar no Banco
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
                          Alterar
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalRemover(true)}
                          className="btn btn-destructive"
                          disabled={carregando}
                        >
                          <Icons.Trash size={15} />
                          Remover
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

          {/* PAINEL DIREITO: TABELA DE PESSOAS REGISTRADAS COM BUSCA */}
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
                    placeholder="Pesquisar por nome, cidade ou ID..."
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

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="badge badge-outline">
                  {pessoasFiltradas.length} {pessoasFiltradas.length === 1 ? "registro" : "registros"}
                </span>
                <button
                  onClick={() => obterPessoas(true)}
                  className="btn btn-secondary btn-sm"
                  title="Atualizar lista do servidor"
                >
                  <Icons.Refresh size={14} className={carregando ? "animate-spin" : ""} />
                  Atualizar
                </button>
              </div>
            </div>

            {/* TABELA RESPONSIVA */}
            <div className="table-container">
              {pessoasFiltradas.length > 0 ? (
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
                    {pessoasFiltradas.map((item, index) => {
                      const identificador = item.codigo !== undefined && item.codigo !== null && item.codigo !== "" 
                        ? item.codigo 
                        : item.id !== undefined && item.id !== null && item.id !== ""
                        ? item.id
                        : index + 1;
                      const estaSelecionado =
                        !botao &&
                        String(pessoa.codigo || pessoa.id) === String(identificador);

                      return (
                        <tr
                          key={item.codigo ?? item.id ?? index}
                          className={estaSelecionado ? "row-selected" : ""}
                        >
                          <td className="id-cell">#{identificador}</td>
                          <td>
                            <div className="user-name-cell">
                              <div className="user-avatar-placeholder">
                                {item.nome ? item.nome.charAt(0).toUpperCase() : "P"}
                              </div>
                              <span>{item.nome}</span>
                            </div>
                          </td>
                          <td>
                            <span className="city-pill">
                              <Icons.MapPin size={13} />
                              {item.cidade}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => selecionar(item)}
                                className={`btn btn-sm ${
                                  estaSelecionado ? "btn-default" : "btn-outline"
                                }`}
                                title="Selecionar para editar ou excluir"
                              >
                                <Icons.Edit size={13} />
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
                  <div className="empty-icon-box">
                    <Icons.Users size={24} />
                  </div>
                  <div className="empty-title">
                    {termoBusca ? "Nenhum resultado encontrado" : "Nenhuma pessoa cadastrada ainda"}
                  </div>
                  <p className="empty-text">
                    {termoBusca
                      ? `Não encontramos registros correspondentes a "${termoBusca}".`
                      : "Use o formulário ao lado para cadastrar pessoas no banco de dados."}
                  </p>
                  {!termoBusca && statusConexao === "offline" && (
                    <button
                      onClick={carregarMockParaTeste}
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Carregar dados de exemplo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMAÇÃO DE REMOÇÃO (SHADCN DIALOG) */}
      {modalRemover && (
        <div className="modal-overlay" onClick={() => setModalRemover(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: "hsl(var(--destructive))" }}>
                <Icons.Trash size={18} /> Confirmar Exclusão
              </h3>
              <button
                onClick={() => setModalRemover(false)}
                className="btn btn-ghost btn-icon"
              >
                <Icons.X size={16} />
              </button>
            </div>
            <div className="card-content">
              <p style={{ fontSize: "0.9375rem", marginBottom: "1rem" }}>
                Tem certeza que deseja remover o cadastro de <strong>{pessoa.nome}</strong> (#{pessoa.codigo || pessoa.id}) de <strong>{pessoa.cidade}</strong>?
              </p>
              <p style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", marginBottom: "1.5rem" }}>
                Essa ação enviará uma requisição <code>DELETE</code> ao endpoint do backend e não poderá ser desfeita.
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
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIGURAÇÃO DA API (SHADCN DIALOG COM DIAGNÓSTICO) */}
      {mostrarConfigApi && (
        <div className="modal-overlay" onClick={() => setMostrarConfigApi(false)}>
          <div className="modal-card" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title">
                <Icons.Database size={18} /> Conexão & Diagnóstico da API
              </h3>
              <button
                onClick={() => setMostrarConfigApi(false)}
                className="btn btn-ghost btn-icon"
              >
                <Icons.X size={16} />
              </button>
            </div>
            <div className="card-content">
              <p style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem" }}>
                Configure o endereço base da sua API REST e teste a comunicação direta com os endpoints.
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
                  /api (Proxy Vite anti-CORS)
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
                  <span style={{ fontWeight: 600 }}>Testador de Endpoints:</span>
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
                      <span style={{ color: diagnosticoApi.online ? "#10b981" : "hsl(var(--destructive))", fontWeight: 600 }}>
                        {diagnosticoApi.online ? "● API Respondendo" : "● Não Conectado"}
                      </span>
                      {diagnosticoApi.online && (
                        <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                          (Detectado: {diagnosticoApi.usaCodigo ? "campo 'codigo' (Spring Boot)" : ""} {diagnosticoApi.usaId ? "campo 'id'" : ""})
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
                    Clique em "Executar Diagnóstico" para testar <code>/listar</code>, <code>/</code> e <code>/pessoas</code> na URL configurada.
                  </p>
                )}
              </div>

              {/* Dica de CORS para Spring Boot */}
              <div
                style={{
                  backgroundColor: "hsla(var(--primary), 0.03)",
                  padding: "0.75rem 1rem",
                  borderRadius: "calc(var(--radius) - 0.25rem)",
                  border: "1px dashed hsl(var(--border))",
                  fontSize: "0.75rem",
                  color: "hsl(var(--muted-foreground))",
                  marginBottom: "1.25rem"
                }}
              >
                <div style={{ fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: "0.25rem" }}>
                  💡 Dica para Spring Boot:
                </div>
                <div>1. No seu <code>@RestController</code>, adicione a anotação:</div>
                <code style={{ display: "block", margin: "0.25rem 0", color: "hsl(var(--primary))" }}>
                  @CrossOrigin(origins = "*")
                </code>
                <div>2. Ou mude a URL da API acima para <code>/api</code> (o Vite encaminha sem erro de CORS).</div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarConfigApi(false);
                    obterPessoas(true);
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
          <div
            key={t.id}
            className={`toast toast-${t.tipo}`}
          >
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
        Interface desenvolvida com React 19+ e Design System shadcn/ui • Conexão com backend <code>localhost:8080</code>
      </footer>
    </div>
  );
}
