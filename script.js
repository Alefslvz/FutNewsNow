//RECOLHER SIDEBAR

function toggleSidebar() {
  var sidebar = document.querySelector(".sidebar-lateral");
  var body = document.body;

  sidebar.classList.toggle("recolhida");
  body.classList.toggle("sidebar-recolhida");

  var isRecolhida = sidebar.classList.contains("recolhida");
  localStorage.setItem("sidebarRecolhida", isRecolhida);
}

var sidebarRecolhidaSalva = localStorage.getItem("sidebarRecolhida") === "true";
var sidebar = document.querySelector(".sidebar-lateral");
if (sidebarRecolhidaSalva && sidebar) {
  sidebar.classList.add("recolhida");
  document.body.classList.add("sidebar-recolhida");
}

//BOTÃO VOLTAR AO TOPO

var btnTopo = document.createElement("button");
btnTopo.innerHTML = "↑";
btnTopo.className = "btn-topo";
document.body.appendChild(btnTopo);

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    btnTopo.style.display = "flex";
  } else {
    btnTopo.style.display = "none";
  }
});

btnTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//MODO ESCURO

window.addEventListener("DOMContentLoaded", function () {
  var btnDark = document.getElementById("darkModeSidebarBtn");

  if (btnDark) {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      btnDark.innerHTML =
        '<span class="icone">☀️</span><span>Modo Claro</span>';
    }

    btnDark.onclick = function () {
      if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        btnDark.innerHTML =
          '<span class="icone">🌙</span><span>Modo Escuro</span>';
        localStorage.setItem("darkMode", "false");
      } else {
        document.body.classList.add("dark-mode");
        btnDark.innerHTML =
          '<span class="icone">☀️</span><span>Modo Claro</span>';
        localStorage.setItem("darkMode", "true");
      }
    };
  }
});

//LOGIN/REGISTRO

function abrirModal(event) {
  if (event) event.preventDefault();
  document.getElementById("modalLogin").classList.add("aberto");
}

function fecharModal() {
  document.getElementById("modalLogin").classList.remove("aberto");
  document.getElementById("erroLogin").innerHTML = "";
  document.getElementById("erroRegistro").innerHTML = "";
  document.getElementById("loginUsuario").value = "";
  document.getElementById("loginSenha").value = "";
  document.getElementById("regUsuario").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regSenha").value = "";
}

function mostrarAba(aba) {
  var abaLogin = document.getElementById("abaLogin");
  var abaRegistro = document.getElementById("abaRegistro");
  var btnLogin = document.getElementById("abaLoginBtn");
  var btnRegistro = document.getElementById("abaRegistroBtn");

  if (aba === "login") {
    abaLogin.style.display = "block";
    abaRegistro.style.display = "none";
    btnLogin.style.background = "#0b3d2e";
    btnRegistro.style.background = "#555";
  } else {
    abaLogin.style.display = "none";
    abaRegistro.style.display = "block";
    btnLogin.style.background = "#555";
    btnRegistro.style.background = "#0b3d2e";
  }
}

function fazerLogin() {
  var usuario = document.getElementById("loginUsuario").value;
  var senha = document.getElementById("loginSenha").value;

  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  var usuarioEncontrado = usuarios.find(function (u) {
    return u.usuario === usuario && u.senha === senha;
  });

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    atualizarPerfil(usuarioEncontrado.usuario);
    document.getElementById("modalLogin").classList.remove("aberto");
    alert("✅ Bem-vindo de volta, " + usuario + "!");
  } else {
    document.getElementById("erroLogin").innerHTML =
      "❌ Usuário ou senha inválidos!";
  }
}

function fazerRegistro() {
  var usuario = document.getElementById("regUsuario").value;
  var email = document.getElementById("regEmail").value;
  var senha = document.getElementById("regSenha").value;

  if (!usuario || !email || !senha) {
    document.getElementById("erroRegistro").innerHTML =
      "❌ Preencha todos os campos!";
    return;
  }

  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  var usuarioExiste = usuarios.find(function (u) {
    return u.usuario === usuario;
  });

  if (usuarioExiste) {
    document.getElementById("erroRegistro").innerHTML = "❌ Usuário já existe!";
    return;
  }

  var novoUsuario = {
    usuario: usuario,
    email: email,
    senha: senha,
  };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
  atualizarPerfil(usuario);
  document.getElementById("modalLogin").classList.remove("aberto");
  alert("🎉 Cadastro realizado! Bem-vindo, " + usuario + "!");
}

function fazerLogout() {
  localStorage.removeItem("usuarioLogado");
  atualizarPerfil(null);
  alert("👋 Você saiu da sua conta");
}

function atualizarPerfil(usuario) {
  var avatar = document.getElementById("perfilAvatar");
  var nome = document.getElementById("perfilNome");
  var status = document.getElementById("perfilStatus");

  if (usuario) {
    avatar.innerHTML = usuario.charAt(0).toUpperCase();
    nome.innerHTML = usuario;
    status.innerHTML = "Logado ✓";
    status.style.color = "#1db954";
  } else {
    avatar.innerHTML = "👤";
    nome.innerHTML = "Visitante";
    status.innerHTML = "Clique para entrar";
    status.style.color = "rgba(255,255,255,0.7)";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  var usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    var dados = JSON.parse(usuarioSalvo);
    atualizarPerfil(dados.usuario);
  }
});

var modal = document.getElementById("modalLogin");
if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      fecharModal();
    }
  });
}

//FUNCIONALIDADE DE BUSCA

var searchInputs = document.querySelectorAll(".search-box input");
searchInputs.forEach(function (input) {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var termo = this.value;
      if (termo && termo.trim() !== "") {
        alert("🔍 Buscando por: " + termo);
      } else {
        alert("⚠️ Digite algo para buscar");
      }
    }
  });
});

//BANCO DE NOTÍCIAS

var noticiasIniciais = [
  {
    id: 1,
    titulo: "Filipe Luís não é mais treinador do Flamengo",
    imagem: "img/filipe-luis-demitido.jpg",
    data: "03/03/2026",
    categoria: "Futebol Brasileiro",
    conteudo:
      "<p>O Flamengo anunciou na noite desta terça-feira (03) que Filipe Luís não é mais o treinador da equipe principal. A decisão foi tomada em comum acordo entre as partes após uma reunião na Gávea.</p><p>O ex-lateral, que assumiu o cargo no início da temporada, deixa o clube após 15 partidas, com 8 vitórias, 4 empates e 3 derrotas.</p><p>Em nota oficial, o Flamengo agradeceu os serviços prestados e deseja sorte na sequência de sua carreira. O clube já iniciou a busca por um novo comandante.</p>",
  },
  {
    id: 2,
    titulo: "Final do Campeonato Carioca 2026",
    imagem: "img/fla-flu.png",
    data: "02/03/2026",
    categoria: "Futebol Brasileiro",
    conteudo:
      "<p>A decisão do Campeonato Carioca de 2026 já tem data e transmissão confirmadas. Flamengo e Fluminense decidem o título estadual em dois jogos emocionantes.</p><p>O primeiro jogo acontece no próximo sábado, no Maracanã, com transmissão ao vivo para todo o Brasil.</p>",
  },
  {
    id: 3,
    titulo: "Mesmo com nova polêmica no Choque-Rei, Verdão avança",
    imagem: "img/choque-rei-palmeiras-sao-paulo.png",
    data: "02/03/2026",
    categoria: "Futebol Brasileiro",
    conteudo:
      "<p>O Palmeiras venceu o São Paulo por 2 a 1 em um jogo marcado por mais uma polêmica de arbitragem. O Verdão garantiu vaga na próxima fase da competição.</p><p>O lance polêmico aconteceu aos 35 do segundo tempo, quando a arbitragem marcou pênalti contestado pelos são-paulinos.</p>",
  },
  {
    id: 4,
    titulo: "Ex-árbitros analisam polêmicas",
    imagem: "img/polemica.jpg",
    data: "02/03/2026",
    categoria: "Arbitragem",
    conteudo:
      "<p>Especialistas em arbitragem se reuniram para analisar as decisões contestadas nos últimos clássicos do futebol brasileiro.</p><p>As análises apontam acertos e erros da arbitragem em lances decisivos das últimas rodadas.</p>",
  },
];

if (!localStorage.getItem("noticias")) {
  localStorage.setItem("noticias", JSON.stringify(noticiasIniciais));
}
