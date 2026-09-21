/* ==========================================================
   VISITE ÁGUAS DE LINDÓIA — Comportamento
   ========================================================== */

gsap.registerPlugin(ScrollTrigger);
const img = (seed, w, h) => `https://picsum.photos/seed/lindoia-${seed}/${w}/${h}`;

/* ---------- smooth scroll ---------- */
try {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
} catch (e) { console.warn('Lenis indisponível', e); }

/* ---------- navbar ---------- */
ScrollTrigger.create({
  start: 80, end: 99999,
  onUpdate: self => document.getElementById('topbar').classList.toggle('solid', self.scroll() > 80)
});

const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  burger.classList.toggle('on');
  drawer.classList.toggle('on');
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('on'); drawer.classList.remove('on');
}));

/* ---------- parallax ---------- */
gsap.to('#heroBg', {
  yPercent: 18, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});
gsap.from('#quote', {
  yPercent: 30, opacity: .3, ease: 'none',
  scrollTrigger: { trigger: '.pull-quote', start: 'top bottom', end: 'bottom top', scrub: true }
});
gsap.to('.intro-photo.small', {
  y: -50, ease: 'none',
  scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true }
});

/* ---------- entrada do hero ---------- */
gsap.timeline({ delay: .25 })
  .from('.reveal-hero', { y: 44, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12 });

/* ---------- reveal genérico ---------- */
function bindReveals(scope = document) {
  scope.querySelectorAll('.reveal').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
}

/* ---------- contadores ---------- */
document.querySelectorAll('.stat .n').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  ScrollTrigger.create({
    trigger: el, start: 'top 92%', once: true,
    onEnter: () => {
      const obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { el.textContent = prefix + Math.floor(obj.v) + suffix; } });
    }
  });
});

/* ==========================================================
   DADOS
   ========================================================== */

const categorias = [
  { s: 'cat-hotel',  t: 'Hotéis',      d: 'Encontre hotéis para diferentes estilos de viagem.', a: '#hoteis' },
  { s: 'cat-pousada',t: 'Pousadas',    d: 'Charme, conforto e experiências mais intimistas.', a: '#pousadas' },
  { s: 'cat-gastro', t: 'Gastronomia', d: 'Restaurantes, cafés, bares e sabores da cidade.', a: '#gastronomia' },
  { s: 'cat-compras',t: 'Compras',     d: 'Lojas, produtos, artesanato e experiências de compras.', a: '#compras' },
  { s: 'cat-atrac',  t: 'Atrações',    d: 'Conheça os lugares e experiências que fazem parte da cidade.', a: '#experiencias' },
  { s: 'cat-evento', t: 'Eventos',     d: 'Confira o que acontece em Águas de Lindóia.', a: '#eventos' }
];

const hoteis = [
  { s:'h1', n:'Grande Hotel das Termas', cat:'Hotel · Centro', tags:['hotel','centro','premium'], d:'Clássico da cidade, a poucos passos da fonte central, com piscina termal coberta.', loc:'Centro', preco:'R$ 420 / noite', serv:['Piscina termal','Café da manhã','Estacionamento'], destaque:true },
  { s:'h2', n:'Resort Vale Verde', cat:'Resort · Família', tags:['resort','familia','pet'], d:'Área de lazer completa, monitoria infantil e pensão completa inclusa.', loc:'Rodovia SP-360', preco:'R$ 690 / noite', serv:['Pensão completa','Kids club','Pet friendly'], destaque:false },
  { s:'h3', n:'Hotel Serra Azul', cat:'Hotel · Romântico', tags:['hotel','romantico','premium'], d:'Suítes com vista para o vale e spa de águas termais só para hóspedes.', loc:'Alto da Serra', preco:'R$ 560 / noite', serv:['Spa','Vista panorâmica','Adults only'], destaque:true },
  { s:'h4', n:'Hotel Fonte Nova', cat:'Hotel · Centro', tags:['hotel','centro','familia'], d:'Bom custo-benefício a duas quadras do calçadão, ideal para estadias curtas.', loc:'Centro', preco:'R$ 280 / noite', serv:['Café da manhã','Wi-Fi','Estacionamento'], destaque:false },
  { s:'h5', n:'Lindóia Palace Resort', cat:'Resort · Premium', tags:['resort','premium','familia'], d:'O maior complexo de lazer da região, com sete piscinas e teatro próprio.', loc:'Saída para Lindóia', preco:'R$ 810 / noite', serv:['7 piscinas','Teatro','All inclusive'], destaque:false },
  { s:'h6', n:'Chalés do Bosque', cat:'Hotel · Pet friendly', tags:['hotel','pet','romantico'], d:'Chalés individuais em meio à mata, com lareira e varanda privativa.', loc:'Bairro do Bosque', preco:'R$ 450 / noite', serv:['Lareira','Pet friendly','Café na varanda'], destaque:false }
];

const pousadas = [
  { s:'p1', n:'Pousada Recanto das Águas', cat:'Pousada', tags:[], d:'Sete quartos, jardim interno e café da manhã servido na mesa.', loc:'Vila Santa Terezinha', preco:'R$ 240 / noite', serv:['Café caseiro','Jardim','Wi-Fi'], destaque:true },
  { s:'p2', n:'Pousada Villa Lindóia', cat:'Pousada', tags:[], d:'Casa restaurada dos anos 40, decoração de época e atendimento familiar.', loc:'Centro histórico', preco:'R$ 310 / noite', serv:['Casa histórica','Café da manhã','Bicicletas'], destaque:false },
  { s:'p3', n:'Pousada Alto da Serra', cat:'Pousada', tags:[], d:'No ponto mais alto da cidade, com o melhor pôr do sol da região.', loc:'Alto da Serra', preco:'R$ 275 / noite', serv:['Vista','Piscina','Trilha'], destaque:false }
];

const gastronomia = [
  { s:'g1', n:'Cantina Bella Serra', cat:'Restaurante · Italiano', tags:['restaurante'], d:'Massas frescas feitas na casa, cardápio que muda com a estação.', loc:'Rua das Flores, 210', preco:'$$', serv:['Aberto 12h–23h','(19) 3824-0000','@bellaserra'], destaque:true },
  { s:'g2', n:'Café da Fonte', cat:'Café', tags:['cafe','doces'], d:'Pães de fermentação natural e café de produtores da região.', loc:'Praça Central', preco:'$', serv:['Aberto 8h–19h','(19) 3824-1111','@cafedafonte'], destaque:false },
  { s:'g3', n:'Bar do Zé', cat:'Bar', tags:['bar'], d:'Petiscos, cerveja gelada e música ao vivo nas sextas e sábados.', loc:'Rua XV, 45', preco:'$$', serv:['Aberto 17h–01h','(19) 3824-2222','@bardoze'], destaque:false },
  { s:'g4', n:'Forno a Lenha Lindóia', cat:'Pizzaria', tags:['pizzaria'], d:'Pizzas de borda fina assadas em forno a lenha desde 1987.', loc:'Av. Brasil, 900', preco:'$$', serv:['Aberto 18h–00h','(19) 3824-3333','@fornolindoia'], destaque:false },
  { s:'g5', n:'Casa da Roça', cat:'Culinária regional', tags:['regional'], d:'Comida caipira servida no fogão a lenha, com buffet aos domingos.', loc:'Estrada da Serra, km 4', preco:'$$', serv:['Aberto 11h–16h','(19) 3824-4444','@casadaroca'], destaque:true },
  { s:'g6', n:'Terroir Restaurante', cat:'Gastronomia sofisticada', tags:['sofisticada'], d:'Menu-degustação de seis tempos com ingredientes da serra.', loc:'Alto da Serra', preco:'$$$', serv:['Jantar 19h–23h','Reserva obrigatória','@terroir.lindoia'], destaque:false }
];

const compras = [
  { s:'c1', n:'Ateliê Fio de Lindóia', cat:'Artesanato', tags:['artesanato','presente'], d:'Peças em crochê e tecelagem feitas por artesãs da cidade.', loc:'Rua das Flores, 88', preco:'', serv:['Seg–Sáb 9h–18h'], destaque:true },
  { s:'c2', n:'Loja Água & Terra', cat:'Souvenirs', tags:['souvenir','presente'], d:'Lembranças da cidade, cerâmicas e produtos com identidade local.', loc:'Praça Central', preco:'', serv:['Todos os dias 9h–20h'], destaque:false },
  { s:'c3', n:'Empório da Serra', cat:'Produtos regionais', tags:['regional'], d:'Doces, queijos, cachaças e cafés produzidos na região.', loc:'Av. Brasil, 340', preco:'', serv:['Seg–Sáb 8h–19h'], destaque:false },
  { s:'c4', n:'Bazar Casa Lindóia', cat:'Decoração', tags:['decoracao','presente'], d:'Objetos de casa e peças de mesa assinadas por designers paulistas.', loc:'Rua XV, 120', preco:'', serv:['Ter–Sáb 10h–19h'], destaque:false },
  { s:'c5', n:'Moda Serra Boutique', cat:'Moda', tags:['moda'], d:'Roupas de inverno e malhas próprias para o clima de serra.', loc:'Calçadão', preco:'', serv:['Seg–Sáb 9h–18h'], destaque:false },
  { s:'c6', n:'Mercado Municipal', cat:'Comércio local', tags:['regional','souvenir'], d:'Hortifrúti, flores e bancas de produtos artesanais.', loc:'Rua do Mercado', preco:'', serv:['Todos os dias 7h–17h'], destaque:false }
];

const experiencias = [
  { s:'e1', t:'Teleférico e Morro do Cruzeiro', d:'Subida panorâmica até o mirante mais alto da cidade, com vista para todo o vale.', info:['Diariamente','9h–17h','Ingresso na bilheteria'] },
  { s:'e2', t:'Balneário Municipal', d:'Banhos termais, duchas e piscina de água mineral no coração da cidade.', info:['Ter–Dom','8h–18h'] },
  { s:'e3', t:'Trilhas da Serra', d:'Percursos leves e médios em meio à mata, com nascentes pelo caminho.', info:['Livre','Guia opcional'] },
  { s:'e4', t:'Parque das Fontes', d:'Área verde com as fontes históricas que deram origem à estância.', info:['Diariamente','7h–18h','Entrada gratuita'] }
];

const eventos = [
  { d:'12', m:'Out', cat:'musica', t:'Festival de Inverno de Águas de Lindóia', desc:'Três dias de shows em palcos espalhados pelo centro.', local:'Praça Central', hora:'19h', ing:'Gratuito' },
  { d:'19', m:'Out', cat:'gastronomia', t:'Rota do Sabor', desc:'Menus especiais em 18 restaurantes participantes.', local:'Vários endereços', hora:'12h–22h', ing:'Consumo livre' },
  { d:'26', m:'Out', cat:'esporte', t:'Corrida das Águas 10K', desc:'Percurso pelas ruas históricas com largada no balneário.', local:'Balneário Municipal', hora:'7h', ing:'Inscrição online' },
  { d:'02', m:'Nov', cat:'cultura', t:'Feira de Artesanato da Serra', desc:'Mais de 60 expositores da região em dois dias de feira.', local:'Centro de Eventos', hora:'10h–20h', ing:'Gratuito' },
  { d:'09', m:'Nov', cat:'familia', t:'Domingo no Parque', desc:'Oficinas, piquenique e contação de histórias para crianças.', local:'Parque das Fontes', hora:'9h–16h', ing:'Gratuito' }
];

const roteiros = [
  { s:'r1', n:'Roteiro 01', t:'Fim de semana romântico', d:'Spa termal, jantar com vista e pôr do sol no mirante — dois dias sem pressa.' },
  { s:'r2', n:'Roteiro 02', t:'Viagem em família', d:'Parques, piscinas, teleférico e endereços que funcionam com crianças pequenas.' },
  { s:'r3', n:'Roteiro 03', t:'Gastronomia', d:'Seis refeições, do café da manhã caseiro ao menu-degustação da serra.' },
  { s:'r4', n:'Roteiro 04', t:'Natureza', d:'Trilhas, nascentes e mirantes para quem quer o dia inteiro ao ar livre.' },
  { s:'r5', n:'Roteiro 05', t:'24 horas em Águas de Lindóia', d:'O essencial da cidade em um único dia, com horários já encaixados.' },
  { s:'r6', n:'Roteiro 06', t:'Fim de semana completo', d:'Sexta à noite a domingo à tarde, equilibrando descanso e passeio.' }
];

const destaques = [
  { s:'d1', k:'Guia rápido', t:'5 lugares para conhecer antes de ir embora', d:'Os pontos que todo visitante de primeira viagem deveria marcar no mapa.' },
  { s:'d2', k:'Onde comer', t:'Os endereços que os moradores realmente frequentam', d:'Fora da rota turística, seis casas com cozinha honesta e preço justo.' },
  { s:'d3', k:'Onde ficar', t:'Como escolher entre hotel, resort e pousada', d:'O que muda em preço, serviço e localização em cada tipo de hospedagem.' },
  { s:'d4', k:'Fim de semana', t:'O que fazer quando chove na serra', d:'Programas cobertos que salvam o roteiro sem estragar a viagem.' },
  { s:'d5', k:'A dois', t:'Experiências para casal em Águas de Lindóia', d:'De banho termal privativo a jantar com vista para o vale.' },
  { s:'d6', k:'Agenda', t:'A programação da cidade nos próximos 30 dias', d:'Tudo o que está marcado, organizado por data e categoria.' }
];

const pontosMapa = [
  { tipo:'hoteis',    cor:'#C8A65B', nome:'Grande Hotel das Termas', x:28, y:34 },
  { tipo:'hoteis',    cor:'#C8A65B', nome:'Resort Vale Verde',       x:68, y:22 },
  { tipo:'pousadas',  cor:'#8FD3E3', nome:'Pousada Villa Lindóia',   x:44, y:52 },
  { tipo:'restaurantes', cor:'#E8DCC8', nome:'Cantina Bella Serra',  x:36, y:66 },
  { tipo:'restaurantes', cor:'#E8DCC8', nome:'Terroir Restaurante',  x:74, y:60 },
  { tipo:'bares',     cor:'#2E9AB8', nome:'Bar do Zé',               x:52, y:40 },
  { tipo:'lojas',     cor:'#A5764E', nome:'Empório da Serra',        x:60, y:74 },
  { tipo:'atracoes',  cor:'#FFFFFF', nome:'Teleférico',              x:18, y:62 },
  { tipo:'atracoes',  cor:'#FFFFFF', nome:'Balneário Municipal',     x:46, y:28 },
  { tipo:'eventos',   cor:'#C8A65B', nome:'Centro de Eventos',       x:82, y:44 }
];

/* ==========================================================
   RENDERIZAÇÃO
   ========================================================== */

/* categorias */
document.getElementById('catGrid').innerHTML = categorias.map(c => `
  <a class="cat-card reveal" href="${c.a}">
    <img src="${img(c.s, 600, 800)}" alt="${c.t} em Águas de Lindóia" loading="lazy">
    <div class="cat-body">
      <h3>${c.t}</h3>
      <p>${c.d}</p>
      <span class="go">Ver todos →</span>
    </div>
  </a>`).join('');

/* cards de estabelecimento */
function cardHTML(i) {
  return `<article class="card reveal" data-tags="${(i.tags || []).join(' ')}">
    <div class="card-img">
      <img src="${img(i.s, 600, 420)}" alt="${i.n}" loading="lazy">
      ${i.destaque ? '<span class="selo">Destaque Visite Águas de Lindóia</span>' : ''}
    </div>
    <div class="card-body">
      <div class="card-cat">${i.cat}</div>
      <h3>${i.n}</h3>
      <p>${i.d}</p>
      <div class="tags">${i.serv.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <div class="card-meta"><span>📍 ${i.loc}</span></div>
      <div class="card-foot">
        <span class="price">${i.preco || ''}</span>
        <a href="#" class="btn btn-line">Conhecer</a>
      </div>
    </div>
  </article>`;
}

function renderCards(id, data, filtro = 'all') {
  const list = filtro === 'all' ? data : data.filter(i => (i.tags || []).includes(filtro));
  document.getElementById(id).innerHTML = list.map(cardHTML).join('');
  bindReveals();
}

renderCards('hoteisGrid', hoteis);
renderCards('pousadasGrid', pousadas);
renderCards('gastroGrid', gastronomia);
renderCards('comprasGrid', compras);

/* experiências */
document.getElementById('expGrid').innerHTML = experiencias.map(e => `
  <article class="exp reveal">
    <img src="${img(e.s, 800, 600)}" alt="${e.t}" loading="lazy">
    <div class="exp-body">
      <h3>${e.t}</h3>
      <p>${e.d}</p>
      <div class="exp-info">${e.info.map(x => `<span>${x}</span>`).join('')}</div>
    </div>
  </article>`).join('');

/* eventos */
function renderEventos(filtro = 'all') {
  const list = filtro === 'all' ? eventos : eventos.filter(e => e.cat === filtro);
  document.getElementById('evList').innerHTML = list.length ? list.map(e => `
    <article class="ev">
      <div class="ev-date"><div class="d">${e.d}</div><div class="m">${e.m}</div></div>
      <div class="ev-main">
        <span class="ev-cat">${e.cat}</span>
        <h3>${e.t}</h3>
        <p>${e.desc}</p>
        <div class="ev-meta"><span>📍 ${e.local}</span><span>🕐 ${e.hora}</span><span>🎟 ${e.ing}</span></div>
      </div>
      <a href="#" class="btn btn-line">Saiba mais</a>
    </article>`).join('')
    : '<article class="ev"><div class="ev-main"><p>Nenhum evento nesta categoria por enquanto. Volte em breve.</p></div></article>';
}
renderEventos();

/* roteiros */
document.getElementById('routeRail').innerHTML = roteiros.map(r => `
  <a class="route" href="#">
    <img src="${img(r.s, 600, 800)}" alt="${r.t}" loading="lazy">
    <div class="route-body">
      <span class="n">${r.n}</span>
      <h3>${r.t}</h3>
      <p>${r.d}</p>
    </div>
  </a>`).join('');

/* destaques editoriais */
document.getElementById('edGrid').innerHTML = destaques.map(d => `
  <a class="ed reveal" href="#">
    <div class="ed-img"><img src="${img(d.s, 600, 380)}" alt="${d.t}" loading="lazy"></div>
    <div class="ed-body">
      <div class="k">${d.k}</div>
      <h3>${d.t}</h3>
      <p>${d.d}</p>
    </div>
  </a>`).join('');

/* instagram */
document.getElementById('igGrid').innerHTML = Array.from({ length: 12 }, (_, i) => `
  <a class="ig" href="https://instagram.com" target="_blank" rel="noopener">
    <img src="${img('ig' + i, 400, 400)}" alt="Foto de Águas de Lindóia publicada por visitantes" loading="lazy">
  </a>`).join('');

/* mapa */
const tiposMapa = [
  { k:'todos', n:'Todos os pontos', c:'#C8A65B' },
  { k:'hoteis', n:'Hotéis', c:'#C8A65B' },
  { k:'pousadas', n:'Pousadas', c:'#8FD3E3' },
  { k:'restaurantes', n:'Restaurantes', c:'#E8DCC8' },
  { k:'bares', n:'Bares', c:'#2E9AB8' },
  { k:'lojas', n:'Lojas', c:'#A5764E' },
  { k:'atracoes', n:'Atrações', c:'#FFFFFF' },
  { k:'eventos', n:'Eventos', c:'#C8A65B' }
];
document.getElementById('mapSide').innerHTML = tiposMapa.map((t, i) => `
  <button class="map-filter ${i === 0 ? 'on' : ''}" data-tipo="${t.k}">
    <span class="dot" style="background:${t.c}"></span>${t.n}
  </button>`).join('');

function renderMapa(tipo = 'todos') {
  const list = tipo === 'todos' ? pontosMapa : pontosMapa.filter(p => p.tipo === tipo);
  document.getElementById('mapCanvas').innerHTML = list.map(p => `
    <div class="pin" style="left:${p.x}%;top:${p.y}%">
      <div class="pin-dot" style="background:${p.cor}"></div>
      <div class="pin-label">${p.nome}</div>
    </div>`).join('');
}
renderMapa();

document.querySelectorAll('.map-filter').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.map-filter').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    renderMapa(b.dataset.tipo);
  });
});

/* ---------- filtros das listagens ---------- */
const mapaFiltros = {
  hoteis: () => ['hoteisGrid', hoteis],
  gastronomia: () => ['gastroGrid', gastronomia],
  compras: () => ['comprasGrid', compras]
};

document.querySelectorAll('.filters').forEach(group => {
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
      const g = group.dataset.group;
      if (g === 'eventos') { renderEventos(chip.dataset.filter); return; }
      const [id, data] = mapaFiltros[g]();
      renderCards(id, data, chip.dataset.filter);
    });
  });
});

/* ---------- newsletter ---------- */
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Inscrição confirmada';
  e.target.reset();
  setTimeout(() => { btn.textContent = 'Quero receber'; }, 3500);
});

/* ---------- final ---------- */
bindReveals();
window.addEventListener('load', () => ScrollTrigger.refresh());
