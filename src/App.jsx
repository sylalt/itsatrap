import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import photoRecords from './photos.json';
const assetBase = /\/dist(?:\/|$)/.test(window.location.pathname) ? '../' : '';
const assetUrl = (path) => `${assetBase}${path}`;
const brandLogo = assetUrl('assets/its-a-trap-logo.png');
const heroLogo = assetUrl('assets/its-a-trap-logo-hero.png');
const featurePosterDesktop = assetUrl('assets/its-a-trap-2026-poster-landscape.png');
const featurePosterMobile = assetUrl('assets/its-a-trap-2026-poster-portrait.png');
const pressEmail = 'Producao@grvve.com';
const photos = photoRecords.map((photo) => ({ ...photo, src: assetUrl(photo.src) }));
const storyGalleryPhotos = photos.filter(photo => photo.storyGallery);
const archiveGallery = [
  { src: 'assets/archive-2018-artist-unidentified-a.jpg', year: '2018', titleEn: 'Unidentified artist', titlePt: 'Artista por identificar', detailEn: '2018', detailPt: '2018', altEn: 'Unidentified artist in a live performance photograph', altPt: 'Artista não identificado numa fotografia de atuação ao vivo' },
  { src: 'assets/archive-2018-artist-unidentified-b.jpg', year: '2018', titleEn: 'Unidentified artist', titlePt: 'Artista por identificar', detailEn: '2018', detailPt: '2018', altEn: 'Unidentified artist in a black-and-white live performance photograph', altPt: 'Artista não identificado numa fotografia a preto e branco de atuação ao vivo' },
  { src: 'assets/archive-2018-jacin-trill.jpg', year: '2018', titleEn: 'Jacin Trill', titlePt: 'Jacin Trill', detailEn: 'It’s a Trap · Time Out Market Lisboa · 2018', detailPt: 'It’s a Trap · Time Out Market Lisboa · 2018', altEn: 'Jacin Trill performing at It’s a Trap at Time Out Market Lisboa in 2018', altPt: 'Jacin Trill a atuar na It’s a Trap, no Time Out Market Lisboa, em 2018' },
  { src: 'assets/archive-2018-nga.jpg', year: '2018', titleEn: 'NGA', titlePt: 'NGA', detailEn: 'It’s a Trap · Time Out Market Lisboa · 2018', detailPt: 'It’s a Trap · Time Out Market Lisboa · 2018', altEn: 'NGA performing at It’s a Trap at Time Out Market Lisboa in 2018', altPt: 'NGA a atuar na It’s a Trap, no Time Out Market Lisboa, em 2018' },
  { src: 'assets/archive-2019-third-anniversary-crowd.jpg', year: '2019', titleEn: 'Third Anniversary', titlePt: '3.º Aniversário', detailEn: '2019', detailPt: '2019', altEn: 'Crowd at It’s a Trap’s third anniversary in 2019', altPt: 'Público no terceiro aniversário da It’s a Trap, em 2019' },
  { src: 'assets/archive-2019-mc-igu.jpg', year: '2019', titleEn: 'MC Igu', titlePt: 'MC Igu', detailEn: 'Estúdio Time Out · 2019', detailPt: 'Estúdio Time Out · 2019', altEn: 'MC Igu performing at Estúdio Time Out in 2019', altPt: 'MC Igu a atuar no Estúdio Time Out, em 2019' },
  { src: 'assets/archive-2019-yuri-nr5.jpg', year: '2019', titleEn: 'Yuri NR5', titlePt: 'Yuri NR5', detailEn: 'Third Anniversary · December 2019', detailPt: 'Terceiro aniversário · dezembro de 2019', altEn: 'Yuri NR5 performing at the third anniversary in December 2019', altPt: 'Yuri NR5 a atuar no terceiro aniversário, em dezembro de 2019' },
  { src: 'assets/archive-2020-pierre-bourne.jpg', year: '2020', titleEn: 'Pierre Bourne', titlePt: 'Pierre Bourne', detailEn: 'Estúdio Time Out, Lisbon · 20 February 2020', detailPt: 'Estúdio Time Out, Lisboa · 20 de fevereiro de 2020', altEn: 'Pierre Bourne performing at Estúdio Time Out in Lisbon on 20 February 2020', altPt: 'Pierre Bourne a atuar no Estúdio Time Out, em Lisboa, a 20 de fevereiro de 2020' },
];
const unverifiedArchivePhotos = [
  { src: 'assets/archive-undated-stage-blue-light.jpg', altEn: 'Performer on stage under blue light trails', altPt: 'Artista em palco sob rastos de luz azul' },
  { src: 'assets/archive-undated-crowd-warm-lights.jpg', altEn: 'Crowd facing a performer under warm stage lights', altPt: 'Público diante de um artista sob luzes quentes' },
  { src: 'assets/archive-undated-two-performers.jpg', altEn: 'Two performers standing together on stage', altPt: 'Dois artistas juntos em palco' },
  { src: 'assets/archive-undated-performer-colour.jpg', altEn: 'Performer in a colourful outfit against a dark stage', altPt: 'Artista com roupa colorida num palco escuro' },
  { src: 'assets/archive-undated-performance-monochrome.jpg', altEn: 'Black-and-white photograph of a performer facing the crowd', altPt: 'Fotografia a preto e branco de um artista perante o público' },
  { src: 'assets/archive-undated-masked-performer.jpg', altEn: 'Masked performer under blue and green stage lights', altPt: 'Artista de máscara sob luzes azuis e verdes' },
];
const ethosPhotos = ['ethos-pluma.png', 'ethos-crowd.png', 'ethos-performance.png']
  .map(file => assetUrl(`assets/${file}`));
const excludedLensPhotos = new Set([
  'community.svg',
  'hands-up.svg',
  'crowd-hero.svg',
  'crowd-stage.png',
  'dj-monochrome.svg',
  'dj-pass-energy.webp',
  'dancefloor-motion.svg',
  'dj-gallery-pink-dj.png',
  'dj-gallery-blue-tent.png',
  'dj-gallery-monochrome.png',
  'behind-the-deck-dj-booth-purple-light.webp',
  'behind-the-deck-dj-booth-blue-tent.webp',
]);
const lensPhotos = photos
  .filter(photo => photo.kind !== 'Poster' && !excludedLensPhotos.has(photo.src.split('/').pop()))
  .sort((a, b) => Number(b.src.endsWith('assets/performance.svg')) - Number(a.src.endsWith('assets/performance.svg')));

const pages = ['2026 Edition', 'Ethos', 'Archive', 'Through the Lens', 'Community'];
const pageRoutes = {
  home: 'Home',
  edition: '2026 Edition',
  ethos: 'Ethos',
  archive: 'Archive',
  lens: 'Through the Lens',
  community: 'Community',
  contact: 'Contact',
  x: 'Past Performances',
};
const pageRouteKeys = Object.fromEntries(
  Object.entries(pageRoutes).map(([route, page]) => [page, route]),
);

const pressArticles = [
  {
    date: '2023-02-24',
    outlet: 'NiT',
    title: 'It’s a Trap: festa de hip hop regressa com estreia em Portugal de French The Kid',
    url: 'https://www.nit.pt/cultura/musica/its-trap-festa-de-hip-hop-esta-de-volta-com-estreia-em-portugal-de-french-the-kid',
    summary: {
      en: 'French The Kid’s Portuguese debut at Lisboa ao Vivo.',
      pt: 'A estreia de French The Kid em Portugal, no Lisboa ao Vivo.',
    },
  },
  {
    date: '2021-12-16',
    outlet: 'NiT',
    title: 'Lisboa recebe mega festa de trap este sábado',
    url: 'https://www.nit.pt/cultura/musica/lisboa-recebe-mega-festa-de-trap-este-sabado',
    image: 'https://www.nit.pt/wp-content/uploads/2021/12/6cb97df18ad1f55c23f4d0bbfc7211e2.jpg',
    imageCredit: 'NiT',
    summary: {
      en: 'Coverage of the fifth anniversary at Lisboa ao Vivo.',
      pt: 'Notícia sobre o quinto aniversário no Lisboa ao Vivo.',
    },
  },
  {
    date: '2019-09-18',
    outlet: 'Gerador',
    title: 'Conversa com João Moura, Oseias e Young Boda: “Não digam que o Hip Hop está a morrer, está bem longe disso”',
    url: 'https://gerador.eu/conversa-com-joao-moura-oseias-e-young-boda-nao-digam-que-o-hip-hop-esta-a-morrer-esta-bem-longe-disso/',
    image: 'https://gerador.eu/wp-content/uploads/2019/09/web_its_a_trap_perfil-3.jpg',
    imageCredit: 'Gerador',
    summary: {
      en: 'An interview on It’s a Trap’s beginnings, community and emerging artists.',
      pt: 'Uma entrevista sobre o início da It’s a Trap, a comunidade e artistas emergentes.',
    },
  },
  {
    date: '2019-08-19',
    outlet: 'Time Out',
    title: 'Festival Iminente traz Common e outros artistas a Lisboa',
    url: 'https://www.timeout.pt/lisboa/pt/noticias/festival-iminente-traz-common-e-outros-artistas-a-lisboa-081919',
    summary: {
      en: 'The Iminente programme includes a curation by It’s a Trap.',
      pt: 'O programa do Iminente inclui uma curadoria da It’s a Trap.',
    },
  },
  {
    date: '2019-04-09',
    outlet: 'NiT',
    title: 'It’s a Trap: a festa tendência do hip hop está de volta a Lisboa',
    url: 'https://www.nit.pt/cultura/musica/its-trap-festa-tendencia-do-hip-hop-esta-volta-lisboa',
    image: 'https://www.nit.pt/wp-content/uploads/2019/04/2a860fe7f5fb3c624d296bf59d78488a.jpg',
    imageCredit: 'NiT',
    summary: {
      en: 'Comethazine headlines an edition at Lisboa ao Vivo.',
      pt: 'Comethazine lidera uma edição no Lisboa ao Vivo.',
    },
  },
  {
    date: '2019-01-28',
    outlet: 'Rimas e Batidas',
    title: 'It’s a Trap no Estúdio Time Out: um peixe fora d’água em noite de estreia',
    url: 'https://www.rimasebatidas.pt/its-a-trap-no-estudio-time-out-um-peixe-fora-dagua-em-noite-de-estreia/',
    image: 'https://www.rimasebatidas.pt/wp-content/uploads/2019/02/ItsATrap_11Lit3s_53.jpg',
    imageCredit: 'Rimas e Batidas / Beatriz Santos',
    summary: {
      en: 'A review of the One Step Forward collaboration and its atmosphere.',
      pt: 'Uma crítica à colaboração One Step Forward e ao ambiente da noite.',
    },
  },
  {
    date: '2018-12-20',
    outlet: 'NiT',
    title: 'It’s a Trap: este sábado há uma festa épica de rap em Lisboa',
    url: 'https://www.nit.pt/cultura/musica/its-trap-sabado-ha-festa-epica-rap-lisboa',
    summary: {
      en: 'The second anniversary at Labirinto and Unknown T’s Portuguese debut.',
      pt: 'O segundo aniversário no Labirinto e a estreia de Unknown T em Portugal.',
    },
  },
  {
    date: '2018-08-29',
    outlet: 'BANTUMEN',
    title: 'IT’S A TRAP com NGA, uma semana antes do novo álbum',
    url: 'https://www.bantumen.com/en/artigo/nga-its-a-trap/',
    summary: {
      en: 'Coverage of an NGA edition at Time Out Market.',
      pt: 'Notícia sobre uma edição com NGA no Time Out Market.',
    },
  },
  {
    date: '2018-03-22',
    outlet: 'NiT',
    title: 'Fãs de hip hop: esta sexta-feira há uma festa para vocês',
    url: 'https://www.nit.pt/cultura/musica/fas-hip-hop-esta-sexta-feira-ha-festa-voces',
    summary: {
      en: 'An edition with Landim and Vado, and Syl’s DJ debut.',
      pt: 'Uma edição com Landim e Vado, e a estreia de Syl como DJ.',
    },
  },
  {
    date: '2017-06-23',
    outlet: 'Time Out',
    title: 'Time Out Market: o melhor dos próximos dias',
    url: 'https://www.timeout.pt/lisboa/pt/blog/time-out-market-o-melhor-dos-proximos-dias-062317',
    summary: {
      en: 'An early announcement for a party at Time Out Market.',
      pt: 'Um dos primeiros anúncios de uma festa no Time Out Market.',
    },
  },
];

const pressArticlesWithImagesFirst = [
  ...pressArticles.filter(article => article.image),
  ...pressArticles.filter(article => !article.image),
];

function pageFromLocation() {
  return pageRoutes[window.location.hash.slice(1)] || 'Home';
}

function daysUntilEvent() {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date());
  const localDate = Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)]));
  const today = Date.UTC(localDate.year, localDate.month - 1, localDate.day);
  const eventDay = Date.UTC(2026, 11, 19);
  return Math.max(0, Math.round((eventDay - today) / 86_400_000));
}

const copy = {
  en: {
    language: 'Português',
    languageLabel: 'Switch language to Portuguese',
    navLabel: 'Main navigation',
    tickets: 'Tickets',
    home: {
      eyebrow: 'THE PORTUGUESE TRAP MOVEMENT / LISBON',
      newEdition: 'NEW EDITION',
      intro: <>Loud music. Good people.<br />A night that belongs to the crowd.</>,
      explore: 'Explore the edition',
      ethos: 'Meet the movement',
      announcement: 'DATE + VENUE + LINEUP — ANNOUNCEMENT COMING',
      ticker: 'TRAP / RAP / COMMUNITY / LISBON / AFTER DARK',
      chapter: '01 / THE NEXT CHAPTER',
      crowd: <>See you<br /><em>in the mosh.</em></>,
      nextChapter: 'The 2026 edition is taking shape. This is where the lineup, tickets and everything you need for the night will appear.',
      when: 'WHEN',
      where: 'WHERE',
      toBeAnnounced: 'To be announced',
      details: '2026 details & FAQs',
      readEthos: 'Read our ethos',
      memories: '02 / THE NIGHTS LIVE ON',
      archive: <>From the <em>archive.</em></>,
      exploreArchive: 'Explore archive',
      contentComing: 'ARCHIVE / CONTENT COMING',
      discoverScene: 'Discover the scene ↗',
      ticketEyebrow: '10 YEARS OF IT’S A TRAP · LISBON',
      ticketHeading: 'GET TICKETS',
      ticketDate: '19 DECEMBER 2026',
      ticketDay: 'DAY TO GO',
      ticketDays: 'DAYS TO GO',
      ticketCta: 'GET TICKETS',
      community: 'KEEP THE CONNECTION',
      communityHeading: <>The night ends.<br /><em>The community doesn’t.</em></>,
      communityInvite: 'Join the conversation. Suggest an artist. Bring an idea to the table.',
      findPeople: 'Find your people',
    },
    ethos: {
      eyebrow: 'THE ATTITUDE BEHIND THE NOISE',
      heading: <>More than<br />a <em>night out.</em></>,
      intro: 'Trap at the centre. A whole scene around it. A place for the music, the people and the energy that forms when they come together.',
      proposed: 'Proposed ethos for the new edition — for organiser review.',
      values: [
        ['01 / MUSIC FIRST', 'A space for trap, rap and the sounds that push the culture forward.'],
        ['02 / COME AS YOU ARE', 'Respect personal space, identities and boundaries. Ask before touching or photographing someone.'],
        ['03 / LOOK AFTER EACH OTHER', 'No harassment or discrimination. A clearly identified support contact and reporting process will be published before the event.'],
      ],
      story: <>A story <em>still growing.</em></>,
      storyText: 'The full story of It’s a Trap will live here, built with the people who made it happen. Historical dates, voices and quotes are awaiting verification and approval.',
    },
    edition: {
      eyebrow: '10 YEARS OF IT’S A TRAP / LISBON',
      title: <>2026<br /><em>EDITION.</em></>,
      intro: 'Ten years after It’s a Trap began, Lisbon meets the next chapter of Portuguese trap. On 19 December, the energy that brought a scene together returns—alongside the new voices carrying it forward.',
      date: 'DATE',
      venue: 'VENUE',
      eventDate: '19 December 2026',
      eventVenue: 'Disaster',
      storyHeading: <>A scene <em>in motion.</em></>,
      storyText: 'From the roots and golden years to the next generation, Portuguese trap has always moved through the people in the room: familiar sounds finding new life, discoveries becoming memories, and each crowd making the story its own. This anniversary is a reunion with that energy—and a revival looking ahead.',
      lineup: <>The soundtrack <em>across generations.</em></>,
      lineupIntro: 'Oseias, Syl, Guima, Trillseco, Osyl and Bobby Johnson—with Oseias b2b Syl.',
      djs: ['Oseias', 'Syl', 'Guima', 'Trillseco', 'Osyl', 'Bobby Johnson'],
      surpriseHeading: <>Stay open to <em>the unexpected.</em></>,
      surpriseText: 'Surprise artist appearances will be woven into the DJ sets at different moments. Identities and timings stay unannounced—part of the night’s discoveries, not a separately scheduled live show.',
      knowBefore: <>Know before <em>you go.</em></>,
      faqs: [
        ['What time does it start?', 'Door and entry details will be shared when confirmed. Surprise appearances are woven into the DJ sets; no identities or timings will be announced.'],
        ['Where can I buy tickets?', 'The official ticket link will appear here when sales open.'],
        ['Is there an age restriction?', 'Age restrictions and ID requirements are still to be confirmed.'],
        ['What about accessibility?', 'Venue access, facilities and an accessibility enquiry contact will be confirmed before ticket sales.'],
        ['Need support during the night?', 'The event support contact, reporting process and venue rules will be published here.'],
      ],
    },
    archive: {
      eyebrow: 'PAST NIGHTS / LASTING ENERGY',
      title: <>THE<br /><em>ARCHIVE.</em></>,
      intro: 'Posters and lineups from previous editions.',
      collection: 'COLLECTION IN PROGRESS',
      verified: 'Verified years and event records coming soon.',
      note: 'These are original placeholder graphics, not historical event posters. Year-by-year browsing and event records will appear as the archive is populated.',
    },
    lens: {
      eyebrow: '',
      title: <>THROUGH<br /><em>THE LENS.</em></>,
      intro: 'The dance floor, seen from the inside.',
      press: <>In the <em>press.</em></>,
      coverage: 'Selected news, interviews, reviews and features about It’s a Trap.',
      contact: 'Photography & press enquiries',
    },
    community: {
      eyebrow: 'BE PART OF WHAT COMES NEXT',
      group: <>The night ends.<br /><em>The community doesn’t.</em></>,
      news: 'Join the WhatsApp group for news, conversations and ideas beyond the dance floor.',
      whatsapp: 'Join the WhatsApp group',
      spotify: 'Add to the It’s a Trap playlist',
      photoAlt: 'A performer and the crowd sharing the dance floor',
      photoCaption: 'Lisbon, together on the dance floor.',
      agreement: 'A few things we share',
      rules: [
        'Respect every identity and personal boundary.',
        'No harassment, hate speech or discrimination.',
        'No spam or unsolicited promotion.',
      ],
    },
    contact: {
      eyebrow: 'LET’S CONNECT',
      title: <>GET IN<br /><em>TOUCH.</em></>,
      topics: 'Bookings · Partnerships · Press · Photography',
      intro: 'For press and photography enquiries, email:',
      emailLabel: 'Email press and photography',
    },
    footer: {
      tagline: 'LISBON. LOUD. TOGETHER.',
      contact: 'Contact',
      instagram: 'Instagram',
      community: 'Community',
      notice: '2026 WEBSITE CONCEPT · EVENT DETAILS TO BE CONFIRMED'
    },
    artistRequest: 'Artist request',
  },
  pt: {
    language: 'English',
    languageLabel: 'Mudar o idioma para inglês',
    navLabel: 'Navegação principal',
    tickets: 'Bilhetes',
    home: {
      eyebrow: 'O MOVIMENTO PORTUGUÊS DE TRAP / LISBOA',
      newEdition: 'NOVA EDIÇÃO',
      intro: <>Música alta. Gente boa.<br />Uma noite para todos.</>,
      explore: 'Descobre a edição',
      ethos: 'Conhece o movimento',
      announcement: 'DATA + LOCAL + CARTAZ — EM BREVE',
      ticker: 'TRAP / RAP / COMUNIDADE / LISBOA / PELA NOITE DENTRO',
      chapter: '01 / O PRÓXIMO CAPÍTULO',
      crowd: <>Vemo-nos<br /><em>no mosh.</em></>,
      nextChapter: 'A edição de 2026 está a ganhar forma. Aqui vais encontrar o cartaz, os bilhetes e tudo o que precisas de saber para a noite.',
      when: 'QUANDO',
      where: 'ONDE',
      toBeAnnounced: 'A anunciar',
      details: 'Detalhes de 2026 e perguntas frequentes',
      readEthos: 'Lê o nosso manifesto',
      memories: '02 / AS NOITES CONTINUAM VIVAS',
      archive: <>Do <em>arquivo.</em></>,
      exploreArchive: 'Explora o arquivo',
      contentComing: 'ARQUIVO / CONTEÚDOS EM BREVE',
      discoverScene: 'Descobre a cena ↗',
      ticketEyebrow: '10 ANOS DE IT’S A TRAP · LISBOA',
      ticketHeading: 'BILHETES',
      ticketDate: '19 DE DEZEMBRO DE 2026',
      ticketDay: 'DIA PARA O EVENTO',
      ticketDays: 'DIAS PARA O EVENTO',
      ticketCta: 'COMPRAR BILHETES',
      community: 'MANTÉM A LIGAÇÃO',
      communityHeading: <>A noite acaba.<br /><em>A comunidade continua.</em></>,
      communityInvite: 'Junta-te à conversa. Sugere um artista. Traz uma ideia.',
      findPeople: 'Encontra a tua gente',
    },
    ethos: {
      eyebrow: 'A ATITUDE POR TRÁS DO SOM',
      heading: <>Mais do que<br />uma <em>noite.</em></>,
      intro: 'Trap no centro. Uma cena inteira à sua volta. Um espaço para a música, as pessoas e a energia que nascem quando se encontram.',
      proposed: 'Manifesto proposto para a nova edição — sujeito a validação pela organização.',
      values: [
        ['01 / A MÚSICA EM PRIMEIRO', 'Um espaço para trap, rap e os sons que empurram a cena para a frente.'],
        ['02 / VEM COMO ESTÁS', 'Respeita o espaço, as identidades e os limites de cada pessoa. Pergunta antes de tocar ou fotografar alguém.'],
        ['03 / CUIDAMOS UNS DOS OUTROS', 'Não há lugar para assédio nem discriminação. Antes do evento, serão divulgados os contactos de apoio e o processo para reportar situações.'],
      ],
      story: <>Uma história <em>a crescer.</em></>,
      storyText: 'A história completa da It’s a Trap vai viver aqui, construída com as pessoas que a fizeram acontecer. Datas históricas, vozes e citações aguardam verificação e aprovação.',
    },
    edition: {
      eyebrow: '10 ANOS DE IT’S A TRAP / LISBOA',
      title: <>EDIÇÃO<br /><em>2026.</em></>,
      intro: 'Dez anos depois de a It’s a Trap ter começado, Lisboa prepara-se para o próximo capítulo do trap português. A 19 de dezembro, regressa a energia que uniu a cena e chegam novas vozes para a levar mais longe.',
      date: 'DATA',
      venue: 'LOCAL',
      eventDate: '19 de dezembro de 2026',
      eventVenue: 'Disaster',
      storyHeading: <>Uma cena <em>em movimento.</em></>,
      storyText: 'Das raízes e dos anos dourados à nova geração, o trap português construiu-se com as pessoas que enchem as salas: sons familiares que ganham nova vida, descobertas que se transformam em memórias e cada público a escrever a sua parte da história. Este aniversário é um reencontro com essa energia e um novo impulso para o futuro.',
      lineup: <>A banda sonora <em>de várias gerações.</em></>,
      lineupIntro: 'Oseias, Syl, Guima, Trillseco, Osyl e Bobby Johnson — com Oseias b2b Syl.',
      djs: ['Oseias', 'Syl', 'Guima', 'Trillseco', 'Osyl', 'Bobby Johnson'],
      surpriseHeading: <>À espera <em>do inesperado.</em></>,
      surpriseText: 'Haverá aparições surpresa de artistas em diferentes momentos dos sets dos DJs. As identidades e os horários ficam por revelar: as surpresas fazem parte dos sets, não são um espetáculo ao vivo marcado à parte.',
      knowBefore: <>Antes de <em>chegares.</em></>,
      faqs: [
        ['A que horas começa?', 'A abertura de portas e os detalhes de entrada serão divulgados quando estiverem confirmados. As identidades e os horários das aparições surpresa não serão anunciados; estas acontecem durante os sets dos DJs.'],
        ['Onde posso comprar bilhetes?', 'O link oficial para os bilhetes será publicado aqui quando as vendas começarem.'],
        ['Há idade mínima?', 'A idade mínima e os requisitos de identificação ainda serão confirmados.'],
        ['E a acessibilidade?', 'A acessibilidade do espaço, as instalações disponíveis e um contacto para esclarecimento de dúvidas serão confirmados antes da abertura das vendas.'],
        ['E se precisares de apoio durante a noite?', 'Os contactos de apoio, o processo para reportar situações e as regras do espaço serão publicados aqui.'],
      ],
    },
    archive: {
      eyebrow: 'NOITES PASSADAS / ENERGIA QUE FICA',
      title: <>O<br /><em>ARQUIVO.</em></>,
      intro: 'Cartazes e programações de edições anteriores.',
      filters: ['Tudo', 'Cartaz', 'Programação'],
      collection: 'COLEÇÃO EM CONSTRUÇÃO',
      verified: 'Em breve: anos e registos de eventos verificados.',
      note: 'Estas imagens são gráficos provisórios, não cartazes históricos do evento. A navegação por ano e evento vai aparecer à medida que o arquivo for preenchido.',
      categories: ['Tudo', 'Cartaz', 'Programação'],
    },
    lens: {
      eyebrow: '',
      title: <>ATRAVÉS<br /><em>DA LENTE.</em></>,
      intro: 'A pista vista por dentro. Um espaço para as pessoas que registam a cena em fotografia.',
      press: <>Na <em>imprensa.</em></>,
      coverage: 'Uma seleção de notícias, entrevistas, críticas e reportagens sobre a It’s a Trap.',
      contact: 'Contactos para fotografia e imprensa',
    },
    community: {
      eyebrow: 'FAZ PARTE DO QUE VEM A SEGUIR',
      group: <>A noite acaba.<br /><em>A comunidade não.</em></>,
      news: 'Junta-te ao grupo de WhatsApp para novidades, conversas e ideias para lá da pista.',
      whatsapp: 'Junta-te ao grupo de WhatsApp',
      spotify: 'Adicionar à playlist It’s a Trap',
      photoAlt: 'Um artista e o público partilham a pista de dança',
      photoCaption: 'Lisboa, juntos na pista.',
      agreement: 'O que partilhamos',
      rules: [
        'Respeita todas as identidades e os limites pessoais.',
        'Não são permitidos assédio, discurso de ódio ou discriminação.',
        'Sem spam nem promoção não solicitada.',
      ],
    },
    contact: {
      eyebrow: 'VAMOS FALAR',
      title: <>VAMOS<br /><em>FALAR.</em></>,
      topics: 'Reservas · Parcerias · Imprensa · Fotografia',
      intro: 'Para questões de imprensa e fotografia, envia um email para:',
      emailLabel: 'Contactar a equipa de imprensa e fotografia',
    },
    footer: {
      tagline: 'LISBOA. MÚSICA ALTA. JUNTOS.',
      contact: 'Contactos',
      instagram: 'Instagram',
      community: 'Comunidade',
      notice: 'CONCEITO DE SITE 2026 · DETALHES DO EVENTO POR CONFIRMAR',
    },
  },
};

function App() {
  const [page, setPage] = useState(pageFromLocation);
  const [showAllPress, setShowAllPress] = useState(false);
  const [daysToEvent, setDaysToEvent] = useState(daysUntilEvent);
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem('itsatrap-language') === 'pt' ? 'pt' : 'en';
    } catch {
      return 'en';
    }
  });
  const t = copy[language];
  const isPortuguese = language === 'pt';

  useEffect(() => {
    const interval = window.setInterval(() => setDaysToEvent(daysUntilEvent()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    function syncPageWithLocation() {
      setPage(pageFromLocation());
      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', syncPageWithLocation);
    window.addEventListener('popstate', syncPageWithLocation);
    return () => {
      window.removeEventListener('hashchange', syncPageWithLocation);
      window.removeEventListener('popstate', syncPageWithLocation);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = isPortuguese ? 'pt-PT' : 'en';
    document.title = isPortuguese ? 'It’s a Trap — Lisboa / 2026' : 'It’s a Trap — Lisbon / 2026';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = isPortuguese
        ? 'It’s a Trap — edição 2026, manifesto, arquivo e comunidade.'
        : 'It’s a Trap — 2026 edition, ethos, archive and community. Website concept.';
    }
    try {
      window.localStorage.setItem('itsatrap-language', language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [isPortuguese, language]);

  function go(nextPage) {
    const route = pageRouteKeys[nextPage];
    if (!route) {
      throw new Error(`Unknown page: ${nextPage}`);
    }
    if (window.location.hash !== `#${route}`) {
      window.history.pushState(null, '', `#${route}`);
    }
    setPage(nextPage);
    window.scrollTo(0, 0);
  }

  function toggleLanguage() {
    setLanguage(isPortuguese ? 'en' : 'pt');
  }

  const button = (text, target, className = 'button') => (
    <button className={className} onClick={() => go(target)}>{text} ↗</button>
  );

  const words = (en, pt) => isPortuguese ? pt : en;
  const shot = (i, caption, cls = '') => (
    <figure className={`storyShot ${cls}`}>
      <img loading="lazy" src={photos[i].src} alt={isPortuguese ? (photos[i].altPt || photos[i].alt) : photos[i].alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
  const ethos = (
    <>
      <span className="eyebrow">{words('THE MUSIC BRINGS US IN. THE PEOPLE BRING US BACK.', 'A MÚSICA APROXIMA-NOS. AS PESSOAS FAZEM-NOS REGRESSAR.')}</span>
      <h2>
        {words('A crowd. A shared energy.', 'Uma multidão. Uma energia partilhada.')}
        <br />
        <em>{words('A community.', 'Uma comunidade.')}</em>
      </h2>
      <p>{words('Come for the music. Find your people. Look after each other.', 'Vem pela música. Encontra os teus. Cuida dos outros.')}</p>
    </>
  );

  return (
    <>
      <header>
        <button className="wordmark logoWordmark" aria-label={words('It’s a Trap — Home','It’s a Trap — Início')} onClick={() => go('Home')}><img src={brandLogo} alt="It’s a Trap" /></button>
        <nav aria-label={t.navLabel}>
          {pages.map((item) => (
            <button key={item} aria-current={page === item ? 'page' : undefined} onClick={() => go(item)}>
              {item === '2026 Edition' ? (isPortuguese ? 'Edição 2026' : item)
                : item === 'Through the Lens' ? (isPortuguese ? 'Através da lente' : item)
                  : item === 'Community' ? (isPortuguese ? 'Comunidade' : item)
                    : item === 'Archive' ? (isPortuguese ? 'Arquivo' : item)
                      : item === 'Ethos' ? (isPortuguese ? 'Manifesto' : item) : item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-label={t.languageLabel}
            lang={isPortuguese ? 'en' : 'pt-PT'}
          >
            {t.language}
          </button>
          {button(t.tickets, '2026 Edition', 'button small')}
        </div>
      </header>

      <main>
{page==='Home'?<>
<section className="hero immersive"><div className="heroBackdrop"><img src={photos[0].src} alt={isPortuguese ? (photos[0].altPt || photos[0].alt) : photos[0].alt}/></div><div className="heroCopy"><span className="eyebrow">{words('LISBON / THE PORTUGUESE TRAP MOVEMENT','LISBOA / O MOVIMENTO PORTUGUÊS DE TRAP')}</span><h1 className="heroLogo"><img src={heroLogo} alt="It’s a Trap" fetchPriority="high" /></h1><div className="actions heroActions">{button(words('2026 edition','Edição 2026'),'2026 Edition')}{button(words('See Past Editions','Explorar edições anteriores'),'Archive','textbutton')}</div></div></section><section className="ticketCountdown" aria-labelledby="ticketCountdownTitle"><div className="ticketCountdownPanel"><div className="ticketCountdownCopy"><span className="eyebrow">{t.home.ticketEyebrow}</span><h2 id="ticketCountdownTitle">{t.home.ticketHeading}</h2><p className="ticketCountdownDate">{t.home.ticketDate}</p></div><div className="ticketCountdownAction"><div className="ticketCountdownCounter" aria-label={`${daysToEvent} ${daysToEvent === 1 ? t.home.ticketDay : t.home.ticketDays}`}><strong aria-hidden="true">{daysToEvent}</strong><span>{daysToEvent === 1 ? t.home.ticketDay : t.home.ticketDays}</span></div>{button(t.home.ticketCta, '2026 Edition')}</div></div></section>
<figure className="featurePosterWrap">
  <picture>
    <source media="(max-width: 700px)" srcSet={featurePosterMobile} />
    <img className="featurePoster" src={featurePosterDesktop} alt={words('It’s a Trap 10th anniversary poster for 19 December in Lisbon, featuring Disaster.','Cartaz do 10.º aniversário da It’s a Trap, a 19 de dezembro, em Lisboa, no Disaster.')} loading="lazy" decoding="async" />
  </picture>
</figure>
<div className="photoBreak">{shot(3,'')}</div>
<section className="storyChapter"><span className="eyebrow">{words('03 / PASS THE ENERGY ON','03 / PASSA A ENERGIA')}</span><h2>{words('Behind the decks.','Atrás da mesa de mistura.')}<br/><em>{words('Inside the moment.','Dentro do momento.')}</em></h2><div className="djGallery">{storyGalleryPhotos.map(photo=><figure className="storyShot" key={photo.src}><img loading="lazy" src={photo.src} alt={isPortuguese ? (photo.altPt || photo.alt) : photo.alt}/></figure>)}</div><div className="actions">{button(words('Through the Lens','Através da lente'),'Through the Lens','textbutton')}</div></section>
<section className="quietEthos">{ethos}{button(words('Our ethos','O nosso manifesto'),'Ethos','textbutton')}</section><section className="communityCall" style={{backgroundImage:`linear-gradient(#111b,#111e),url("${photos[4].src}")`}}><span className="eyebrow">{words('THE CONNECTION CONTINUES','A LIGAÇÃO CONTINUA')}</span><h2>{words('See you','Encontramo-nos')}<br/><em>{words('in the mosh.','no mosh.')}</em></h2>{button(words('Join the community','Junta-te à comunidade'),'Community')}</section></>:null}

        {page === '2026 Edition' && (
          <section>
            <span className="eyebrow">{t.edition.eyebrow}</span>
            <h1 className="pagetitle">{t.edition.title}</h1>
            <p>{t.edition.intro}</p>
            <div className="facts">
              <span>{t.edition.date}<b>{t.edition.eventDate}</b></span>
              <span>{t.edition.venue}<b>{t.edition.eventVenue}</b></span>
            </div>
            <div className="editionStory">
              <h2>{t.edition.storyHeading}</h2>
              <p>{t.edition.storyText}</p>
            </div>
            <h2>{t.edition.lineup}</h2>
            <p className="lineupIntro">{t.edition.lineupIntro}</p>
            <ul className="lineupGrid" aria-label={isPortuguese ? 'DJs' : 'DJs'}>
              {t.edition.djs.map((dj) => <li key={dj}>{dj}</li>)}
            </ul>
            <aside className="surpriseNote">
              <h3>{t.edition.surpriseHeading}</h3>
              <p>{t.edition.surpriseText}</p>
            </aside>
            <h2>{t.edition.knowBefore}</h2>
            {t.edition.faqs.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </section>
        )}

{page==='Ethos'&&<section className="ethosPage">
  <div className="ethosMasthead">
    <span className="eyebrow">{words('LX, PORTUGAL','LX, PORTUGAL')}</span>
    <h1>{words('A party shaped','Uma festa feita')}<br/><em>{words('by its people.','pelas pessoas.')}</em></h1>
    <p>{words('Founded in 2016, It’s a Trap marks its 10th anniversary in 2026. Its story lives in the music and the people who filled the rooms.','Fundada em 2016, a It’s a Trap celebra 10 anos em 2026. A sua história vive na música e nas pessoas que enchiam as salas.')}</p>
  </div>
  <div className="ethosHistory">
    <article className="ethosChapter">
      <div className="ethosChapterCopy">
        <span className="eyebrow">{words('01 / A SCENE TAKES SHAPE','01 / UMA CENA GANHA FORMA')}</span>
        <p>{words('It’s a Trap has its own place in Lisbon’s hip-hop nightlife: a party that grew into something bigger through the people who kept showing up. Founded in 2016 by João Moura and Rodrigo Balona, it brought Rap Notícias and GRVVE together, and grew alongside a generation of Portuguese trap artists and listeners. In April 2019, NiT called it “uma das maiores tendências do hip hop em Portugal”—one of the biggest trends in Portuguese hip-hop. The growing crowds and larger editions tell the story of a party becoming a reference point in the scene.','A It’s a Trap conquistou um lugar próprio na noite hip-hop de Lisboa: uma festa que se tornou algo maior graças às pessoas que continuaram a aparecer. Fundada em 2016 por João Moura e Rodrigo Balona, juntou a Rap Notícias e a GRVVE e cresceu com uma geração de artistas e ouvintes portugueses de trap. Em abril de 2019, a NiT descreveu-a como “uma das maiores tendências do hip hop em Portugal”. As multidões cada vez maiores e as edições de maior dimensão contam a história de uma festa que se tornou uma referência na cena.')}</p>
      </div>
      <figure className="ethosPhoto">
        <img src={ethosPhotos[0]} alt={words('A Portuguese rapper performs as the crowd watches from the front of the stage.','Um rapper português atua perante o público junto ao palco.')} />
      </figure>
    </article>
    <article className="ethosChapter ethosChapterReverse">
      <div className="ethosChapterCopy">
        <span className="eyebrow">{words('02 / ROOM TO BE YOURSELF','02 / ESPAÇO PARA SERMOS NÓS PRÓPRIOS')}</span>
        <p>{words('The dance floor mattered just as much as the music. Writing about the January 2019 edition at Estúdio Time Out, journalist João Daniel Marques noticed how naturally all kinds of clothes and self-expression fit into the crowd: “Não há comportamento ou outfit que destoe”—no behaviour or outfit seems out of place. People could dress, move and enjoy the music in their own way, among others who got it. Difference became a way to connect, not a reason to stand apart.','A pista de dança importava tanto como a música. Ao escrever sobre a edição de janeiro de 2019 no Estúdio Time Out, o jornalista João Daniel Marques reparou na naturalidade com que diferentes estilos e formas de expressão se integravam na multidão: “Não há comportamento ou outfit que destoe”. Cada pessoa podia vestir-se, dançar e viver a música à sua maneira, rodeada de outras que a compreendiam. A diferença tornava-se uma forma de ligação, não um motivo para ficar de fora.')}</p>
      </div>
      <figure className="ethosPhoto">
        <img src={ethosPhotos[1]} alt={words('A DJ wearing a tiara performs in front of pink and blue lights.','Uma DJ com uma tiara atua diante de luzes cor-de-rosa e azuis.')} />
      </figure>
    </article>
    <article className="ethosChapter">
      <div className="ethosChapterCopy">
        <span className="eyebrow">{words('03 / AN OPEN DOOR','03 / UMA PORTA ABERTA')}</span>
        <p>{words('There was room to take part, too. In a September 2019 interview with Gerador, the organisers recalled how artists got early opportunities through casual invitations and connections between DJs, performers and friends. Yuzi, Sippinpurpp and Lon3r Johny were among the emerging names tied to those nights. As João Moura put it: “se aparecer algum outsider que realmente é bom, vai ser abraçado”—if a talented outsider showed up, they’d be welcomed. You didn’t need a grand introduction; sometimes being there and sharing your work was enough to get started.','Também havia espaço para participar. Numa entrevista à Gerador, em setembro de 2019, os organizadores lembraram como alguns artistas tiveram as primeiras oportunidades através de convites informais e das ligações entre DJs, artistas e amigos. Yuzi, Sippinpurpp e Lon3r Johny foram alguns dos nomes emergentes associados a essas noites. Como disse João Moura: “se aparecer algum outsider que realmente é bom, vai ser abraçado”. Não era preciso uma grande apresentação; às vezes, estar presente e partilhar o trabalho era o primeiro passo.')}</p>
        <p>{words('The party also brought Portuguese talent together with artists from abroad. Its second anniversary brought Unknown T to Portugal; later editions featured Comethazine and French The Kid. Portuguese DJs and artists shared those lineups, putting the local scene in conversation with what was happening in rap, trap and drill elsewhere.','A festa também aproximou o talento português de artistas internacionais. O segundo aniversário trouxe Unknown T a Portugal; edições posteriores contaram com Comethazine e French The Kid. DJs e artistas portugueses partilharam esses cartazes, pondo a cena local em diálogo com o que acontecia no rap, trap e drill além-fronteiras.')}</p>
      </div>
      <figure className="ethosPhoto">
        <img src={ethosPhotos[2]} alt={words('A performer shares a moment with the crowd under green lights.','Um artista partilha um momento com o público sob luzes verdes.')} />
      </figure>
    </article>
    <div className="ethosClosing">
      <span className="eyebrow">{words('A COMMUNITY THAT TRAVELLED','UMA COMUNIDADE QUE SE MOVEU')}</span>
      <p>{words('It’s a Trap moved between Lisbon venues, from Estúdio Time Out at Mercado da Ribeira to Labirinto and Lisboa ao Vivo. The locations changed; the community and sound gave the nights their continuity. Coverage of the fifth anniversary in 2021, and of further editions in 2023, shows a party that lasted beyond the first rush of excitement. It became an emblematic gathering in Lisbon’s trap scene—not a stand-in for the city’s entire nightlife, but a distinct part of it.','A It’s a Trap passou por vários espaços de Lisboa, do Estúdio Time Out no Mercado da Ribeira ao Labirinto e ao Lisboa ao Vivo. Os locais mudavam; a comunidade e a música davam continuidade às noites. A cobertura do quinto aniversário, em 2021, e de novas edições em 2023 mostra uma festa que sobreviveu ao entusiasmo inicial. Tornou-se um encontro emblemático da cena trap lisboeta — não um retrato de toda a noite da cidade, mas uma parte com identidade própria.')}</p>
      <p>{words('Taken together, these accounts help explain why some young people may have found a refuge here: a place to recognise themselves in the music, find others with the same tastes and imagine a way in. They describe room for self-expression, community and chances for emerging artists. They don’t tell us who was in the crowd or prove that everyone was safe from discrimination or harassment. “Safe haven” is best understood as the sense of belonging the atmosphere could offer, not as a guarantee about every person’s experience.','Lidos em conjunto, estes relatos ajudam a perceber porque é que alguns jovens poderão ter encontrado aqui um refúgio: um lugar para se reconhecerem na música, encontrarem pessoas com gostos em comum e imaginarem uma forma de participar. Os relatos falam de liberdade de expressão, comunidade e oportunidades para artistas emergentes. Não dizem quem estava na pista nem provam que todas as pessoas estavam protegidas contra a discriminação ou o assédio. “Refúgio seguro” descreve melhor o sentimento de pertença que o ambiente podia proporcionar — não uma garantia sobre a experiência de cada pessoa.')}</p>
    </div>
    <aside className="ethosSources" aria-label={words('Sources for quoted passages','Fontes dos excertos citados')}>
      <span>{words('Sources','Fontes')}</span>
      <ul>
        <li><a href="https://www.nit.pt/cultura/musica/its-trap-festa-tendencia-do-hip-hop-esta-volta-lisboa" target="_blank" rel="noopener noreferrer">NiT — It’s a Trap: a festa tendência do hip hop está de volta a Lisboa (2019)</a></li>
        <li><a href="https://www.rimasebatidas.pt/its-a-trap-no-estudio-time-out-um-peixe-fora-dagua-em-noite-de-estreia/" target="_blank" rel="noopener noreferrer">Rimas e Batidas — It’s a Trap no Estúdio Time Out: um peixe fora d’água em noite de estreia (2019)</a></li>
        <li><a href="https://gerador.eu/conversa-com-joao-moura-oseias-e-young-boda-nao-digam-que-o-hip-hop-esta-a-morrer-esta-bem-longe-disso/" target="_blank" rel="noopener noreferrer">Gerador — Conversa com João Moura, Oseias e Young Boda (2019)</a></li>
      </ul>
    </aside>
  </div>
</section>}
        {page === 'Archive' && (
          <section className="archivePage">
            <span className="eyebrow">{t.archive.eyebrow}</span>
            <h1 className="pagetitle">{t.archive.title}</h1>
            <p>{t.archive.intro}</p>
            <div className="archive-curated" />
            <a className="archivePageLink" href="#x">{words('Browse the photo archive', 'Explorar o arquivo fotográfico')} ↗</a>
          </section>
        )}

        {page === 'Through the Lens' && (
          <section className="lensPage">
            {t.lens.eyebrow && <span className="eyebrow">{t.lens.eyebrow}</span>}
            <h1 className="pagetitle">{t.lens.title}</h1>
            <p>{t.lens.intro}</p>
            <figure className="lensHeroPhoto">
              <img loading="lazy" src={assetUrl('assets/dj-4466.jpg')} alt={words('A packed It’s a Trap crowd facing the stage beneath the festival tent','Público da It’s a Trap junto ao palco, numa tenda cheia')} />
              <figcaption className="lensCaption">
                <span>{words('Photos or videos from the night?','Fotografias ou vídeos da noite?')}</span>
                <a href="https://www.instagram.com/itsatrap.official/" target="_blank" rel="noopener noreferrer">{words('Send them to @itsatrap.official','Envia para @itsatrap.official')} ↗</a>
              </figcaption>
            </figure>
            <div className="lensPressHeading">
              <h2>{t.lens.press}</h2>
              <p>{t.lens.coverage}</p>
            </div>
            <div className="pressGrid">
              {pressArticlesWithImagesFirst
                .slice(0, showAllPress ? pressArticles.length : 4)
                .map(article => (
                <article className={`pressCard${article.image ? ' hasPressImage' : ''}`} key={article.url}>
                  {article.image && (
                    <a className="pressImageLink" href={article.url} target="_blank" rel="noopener noreferrer" aria-label={article.title}>
                      <img src={article.image} alt="" loading="lazy" />
                    </a>
                  )}
                  <div className="pressCopy">
                    <div className="pressMeta">
                      <span>{article.outlet}</span>
                      <time dateTime={article.date}>
                        {new Intl.DateTimeFormat(isPortuguese ? 'pt-PT' : 'en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(`${article.date}T00:00:00`))}
                      </time>
                    </div>
                    {article.imageCredit && <span className="pressImageCredit">{words('Photo: ', 'Fotografia: ')}{article.imageCredit}</span>}
                    <h3><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                    <p>{words(article.summary.en, article.summary.pt)}</p>
                  </div>
                </article>
              ))}
            </div>
            {pressArticles.length > 4 && (
              <button className="pressToggle textbutton" type="button" aria-expanded={showAllPress} onClick={() => setShowAllPress(!showAllPress)}>
                {showAllPress ? words('View Less', 'Ver menos') : words('View More', 'Ver mais')}
              </button>
            )}
            <div className="actions lensActions">
              <a className="textbutton" href={`mailto:${pressEmail}`}>{t.lens.contact} ↗</a>
              {button(words('Explore past editions', 'Explorar edições anteriores'), 'Archive')}
            </div>
          </section>
        )}

        {page === 'Community' && (
          <section className="communityPage">
            <span className="eyebrow">{t.community.eyebrow}</span>
            <div className="split inner communityLayout">
              <div className="communityIntro">
                <h1 className="communityHeadline">{t.community.group}</h1>
                <p>{t.community.news}</p>
                <div className="communityActions">
                  <a className="button whatsappButton" href="https://chat.whatsapp.com/Jo2MBEVAQsXGkzQWwtBZNd" target="_blank" rel="noopener noreferrer">{t.community.whatsapp}</a>
                  <a className="button communitySpotify" href="https://open.spotify.com/playlist/28ScGDb85kOXLTG1YBHOdL?si=89570df84afe4c36&amp;pt=32dfa671e3af5d07669751eebd91174a" target="_blank" rel="noopener noreferrer">{t.community.spotify}</a>
                </div>
              </div>
              <figure className="communityPhoto">
                <img src={assetUrl('assets/community-photo.png')} alt={t.community.photoAlt} loading="lazy" />
                <figcaption>{t.community.photoCaption}</figcaption>
              </figure>
            </div>
            <div className="agreement communityAgreement inner">
              <h2>{t.community.agreement}</h2>
              <ul>{t.community.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            </div>
          </section>
        )}

        {page === 'Contact' && (
          <section>
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h1 className="pagetitle">{t.contact.title}</h1>
            <p>{t.contact.topics}</p>
            <p>{t.contact.intro}</p>
            <p><a className="contactEmail" href={`mailto:${pressEmail}`}>{t.contact.emailLabel} ↗</a></p>
            <a className="button" href="https://www.instagram.com/itsatrap.official/" target="_blank" rel="noreferrer">@itsatrap.official ↗</a>
          </section>
        )}

        {page === 'Past Performances' && (
          <section className="sectionXPage photoArchivePage">
            <div className="photoArchiveHeader">
              <span className="eyebrow">{words('PAST NIGHTS / PHOTO ARCHIVE', 'NOITES PASSADAS / ARQUIVO FOTOGRÁFICO')}</span>
              <h1 className="pagetitle">{words(<>PAST <em>PERFORMANCES.</em></>, <>ATUAÇÕES <em>PASSADAS.</em></>)}</h1>
              <p>{words('Live photographs from It’s a Trap nights. Captions use only artist, event and date details recorded in the project archive.', 'Fotografias de atuações e noites da It’s a Trap. As legendas incluem apenas os nomes, eventos e datas registados no arquivo do projeto.')}</p>
              <p className="photoArchiveNote">{words('Some archive images have no verified artist or event details. Photo credits will be added when confirmed.', 'Algumas imagens não têm artista ou evento identificados no arquivo. Os créditos fotográficos serão acrescentados quando estiverem confirmados.')}</p>
              <nav className="photoArchiveYears" aria-label={words('Browse archive by year', 'Explorar o arquivo por ano')}>
                {['2018', '2019', '2020'].map(year => <button key={year} type="button" onClick={() => document.getElementById(`archive-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{year}</button>)}
                <button type="button" onClick={() => document.getElementById('archive-undated')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{words('Undated', 'Sem data')}</button>
              </nav>
            </div>
            {['2018', '2019', '2020'].map(year => (
              <section className="photoArchiveYear" id={`archive-${year}`} key={year} aria-labelledby={`archive-title-${year}`}>
                <div className="photoArchiveYearHeading">
                  <span className="eyebrow">{words('YEAR', 'ANO')}</span>
                  <h2 id={`archive-title-${year}`}>{year}</h2>
                </div>
                <div className="photoArchiveGrid">
                  {archiveGallery.filter(photo => photo.year === year).map(photo => (
                    <figure className="photoArchiveCard" key={photo.src}>
                      <div className="photoArchiveImage">
                        <img src={assetUrl(photo.src)} alt={isPortuguese ? photo.altPt : photo.altEn} loading="lazy" decoding="async" />
                      </div>
                      <figcaption>
                        <strong>{isPortuguese ? photo.titlePt : photo.titleEn}</strong>
                        <span>{isPortuguese ? photo.detailPt : photo.detailEn}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}
            <section className="photoArchiveYear" id="archive-undated" aria-labelledby="archive-title-undated">
              <div className="photoArchiveYearHeading">
                <span className="eyebrow">{words('DETAILS NOT RECORDED', 'DADOS NÃO REGISTADOS')}</span>
                <h2 id="archive-title-undated">{words('Undated photographs', 'Fotografias sem data')}</h2>
              </div>
              <p className="photoArchiveNote">{words('The project archive does not identify the artist, event or date for these images, so no names or dates are attached.', 'O arquivo do projeto não identifica o artista, o evento ou a data destas imagens; por isso, não lhes são atribuídos nomes nem datas.')}</p>
              <div className="photoArchiveGrid">
                {unverifiedArchivePhotos.map(photo => (
                  <figure className="photoArchiveCard photoArchiveUncaptioned" key={photo.src}>
                    <div className="photoArchiveImage">
                      <img src={assetUrl(photo.src)} alt={isPortuguese ? photo.altPt : photo.altEn} loading="lazy" decoding="async" />
                    </div>
                  </figure>
                ))}
              </div>
            </section>
          </section>
        )}
      </main>

      <footer>
        <button className="wordmark logoWordmark footerLogo" aria-label={words('It’s a Trap — Home','It’s a Trap — Início')} onClick={() => go('Home')}><img src={brandLogo} alt="It’s a Trap" loading="lazy" /></button>
        <p>{t.footer.tagline}</p>
        <div>
          <button onClick={() => go('Contact')}>{t.footer.contact} ↗</button>
          <a href="https://www.instagram.com/itsatrap.official/" target="_blank" rel="noreferrer">{t.footer.instagram} ↗</a>
          <button onClick={() => go('Community')}>{t.footer.community} ↗</button>
        </div>
        <small>{t.footer.notice}</small>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
