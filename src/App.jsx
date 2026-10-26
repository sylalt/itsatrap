import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import photoRecords from './photos.json';
const brandLogo = (/\/dist(?:\/|$)/.test(window.location.pathname) ? '../' : '') + 'assets/its-a-trap-logo.png';
const heroLogo = (/\/dist(?:\/|$)/.test(window.location.pathname) ? '../' : '') + 'assets/its-a-trap-logo-hero.png';
const photos=photoRecords.map(photo=>({...photo,src:(/\/dist(?:\/|$)/.test(window.location.pathname)?'../':'')+photo.src}));

const pages = ['2026 Edition', 'Ethos', 'Archive', 'Through the Lens', 'Community'];
const pageRoutes = {
  home: 'Home',
  edition: '2026 Edition',
  ethos: 'Ethos',
  archive: 'Archive',
  lens: 'Through the Lens',
  community: 'Community',
  contact: 'Contact',
};
const pageRouteKeys = Object.fromEntries(
  Object.entries(pageRoutes).map(([route, page]) => [page, route]),
);

function pageFromLocation() {
  return pageRoutes[window.location.hash.slice(1)] || 'Home';
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
      crowd: <>See you<br /><em>in the crowd.</em></>,
      nextChapter: 'The 2026 edition is taking shape. This is where the lineup, tickets and everything you need for the night will land.',
      when: 'WHEN',
      where: 'WHERE',
      toBeAnnounced: 'To be announced',
      details: '2026 details & FAQs',
      readEthos: 'Read our ethos',
      memories: '02 / THE MEMORIES STAY LOUD',
      archive: <>From the <em>archive.</em></>,
      exploreArchive: 'Explore archive',
      contentComing: 'ARCHIVE / CONTENT COMING',
      discoverScene: 'Discover the scene ↗',
      community: 'KEEP THE CONNECTION',
      communityHeading: <>The night ends.<br /><em>The community doesn’t.</em></>,
      communityInvite: 'Join the conversation. Suggest an artist. Bring an idea.',
      findPeople: 'Find your people',
    },
    ethos: {
      eyebrow: 'THE ATTITUDE BEHIND THE NOISE',
      heading: <>More than<br />a <em>night out.</em></>,
      intro: 'Trap at the centre. A whole scene around it. A place for the music, the people and the energy that happens when they meet.',
      proposed: 'Proposed ethos for the new edition — for organiser review.',
      values: [
        ['01 / MUSIC FIRST', 'A space for trap, rap and the sounds that push them forward.'],
        ['02 / COME AS YOU ARE', 'Respect personal space, identities and boundaries. Ask before touching or photographing someone.'],
        ['03 / LOOK AFTER EACH OTHER', 'No harassment or discrimination. A clearly identified support contact and reporting process will be published before the event.'],
      ],
      story: <>A story <em>still growing.</em></>,
      storyText: 'The full story of It’s a Trap will live here, built with the people who made it happen. Historical dates, voices and quotations are awaiting verification and approval.',
    },
    edition: {
      eyebrow: 'THE NEXT CHAPTER / LISBON',
      title: <>2026<br /><em>EDITION.</em></>,
      date: 'DATE',
      venue: 'VENUE',
      tickets: 'TICKETS',
      ticketsNotOnSale: 'Not on sale yet',
      lineup: <>The <em>lineup.</em></>,
      firstNames: 'FIRST NAMES COMING SOON',
      knowBefore: <>Know before <em>you go.</em></>,
      faqs: [
        ['What time does it start?', 'Doors, performance times and last entry will be published with the event announcement.'],
        ['Where can I buy tickets?', 'The official ticket link will appear here when sales open.'],
        ['Is there an age restriction?', 'The entry age and ID requirements are to be confirmed.'],
        ['What about accessibility?', 'Venue access, facilities and an accessibility enquiry contact will be confirmed before ticket sales.'],
        ['Need support during the night?', 'The event support contact, reporting process and venue rules will be published here.'],
      ],
    },
    archive: {
      eyebrow: 'PAST NIGHTS / LASTING ENERGY',
      title: <>THE<br /><em>ARCHIVE.</em></>,
      intro: 'Posters, lineups and moments from previous editions.',
      filters: ['All', 'Posters', 'Lineups', 'Photographs'],
      collection: 'COLLECTION IN PROGRESS',
      verified: 'Verified years and event records coming soon.',
      note: 'These are original placeholder graphics, not historical event posters. Year and event browsing will appear as the archive is populated.',
    },
    lens: {
      eyebrow: 'THE PEOPLE BEHIND THE CAMERA',
      title: <>THROUGH<br /><em>THE LENS.</em></>,
      intro: 'The dance floor, seen from the inside. A home for the photographers who document the scene.',
      heading: <>Give the eye<br /><em>its credit.</em></>,
      galleries: 'Galleries are awaiting approved images. Every collection will name its photographer and link prominently to their portfolio.',
      press: <>In the <em>press.</em></>,
      coverage: 'Selected coverage will appear here once article titles, dates and links have been checked.',
      contact: 'Photography & press enquiries',
    },
    community: {
      eyebrow: 'BE PART OF WHAT COMES NEXT',
      title: <>YOUR<br /><em>PEOPLE.</em></>,
      group: <>Take it to<br /><em>the group.</em></>,
      news: 'News, conversations and ideas beyond the dance floor.',
      whatsapp: 'WhatsApp · opening soon ↗',
      whatsappNotice: 'The official WhatsApp invitation is coming soon.',
      agreement: 'The community agreement',
      agreementText: 'Respect identities and boundaries. No harassment, hate, spam or unsolicited promotion. Ask before sharing someone’s photographs or personal information.',
      moderation: 'Moderation and reporting details will accompany the invitation.',
      idea: <>Got an <em>idea?</em></>,
      suggestionsIntro: 'Artist requests, collaborations, accessibility or anything else. You can leave your name and email blank.',
      category: 'Category',
      categories: ['Artist request', 'Collaboration', 'Accessibility', 'General feedback'],
      suggestion: 'Your suggestion',
      placeholder: 'Tell us what you have in mind…',
      name: 'Name (optional)',
      email: 'Email (optional)',
      privacy: 'Preview mode: download your suggestion as a file. Nothing is submitted or stored by this website.',
      download: 'Download suggestion ↗',
      downloaded: 'Suggestion downloaded. Nothing has been sent. Submissions will open when the community launches.',
    },
    contact: {
      eyebrow: 'LET’S CONNECT',
      title: <>MAKE<br /><em>CONTACT.</em></>,
      topics: 'Booking · Partnerships · Press · Photography',
      intro: 'Dedicated contact details are coming soon. In the meantime, find It’s a Trap on Instagram.',
    },
    footer: {
      tagline: 'LISBON. LOUD. TOGETHER.',
      contact: 'Contact',
      instagram: 'Instagram',
      community: 'Community',
      notice: '2026 WEBSITE CONCEPT · EVENT DETAILS TO BE CONFIRMED',
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
      intro: <>Música alta. Gente boa.<br />Uma noite que é de todos.</>,
      explore: 'Descobre a edição',
      ethos: 'Conhece o movimento',
      announcement: 'DATA + LOCAL + CARTAZ — EM BREVE',
      ticker: 'TRAP / RAP / COMUNIDADE / LISBOA / PELA NOITE DENTRO',
      chapter: '01 / O PRÓXIMO CAPÍTULO',
      crowd: <>Vemo-nos<br /><em>na pista.</em></>,
      nextChapter: 'A edição de 2026 está a ganhar forma. Aqui vais encontrar o cartaz, os bilhetes e tudo o que precisas de saber para a noite.',
      when: 'QUANDO',
      where: 'ONDE',
      toBeAnnounced: 'A anunciar',
      details: 'Detalhes de 2026 e perguntas frequentes',
      readEthos: 'Lê o nosso manifesto',
      memories: '02 / AS MEMÓRIAS FICAM',
      archive: <>Do <em>arquivo.</em></>,
      exploreArchive: 'Explora o arquivo',
      contentComing: 'ARQUIVO / CONTEÚDOS EM BREVE',
      discoverScene: 'Descobre a cena ↗',
      community: 'MANTÉM A LIGAÇÃO',
      communityHeading: <>A noite acaba.<br /><em>A comunidade continua.</em></>,
      communityInvite: 'Junta-te à conversa. Sugere um artista. Traz uma ideia.',
      findPeople: 'Encontra a tua gente',
    },
    ethos: {
      eyebrow: 'A ATITUDE POR TRÁS DO SOM',
      heading: <>Mais do que<br />uma <em>noite.</em></>,
      intro: 'Trap no centro. Uma cena inteira à sua volta. Um espaço para a música, as pessoas e a energia que nasce quando se juntam.',
      proposed: 'Manifesto proposto para a nova edição — sujeito a validação pela organização.',
      values: [
        ['01 / A MÚSICA EM PRIMEIRO', 'Um espaço para trap, rap e os sons que os fazem avançar.'],
        ['02 / SÊ TU PRÓPRIO', 'Respeita o espaço, a identidade e os limites de cada pessoa. Pergunta antes de tocar ou fotografar alguém.'],
        ['03 / CUIDAMOS UNS DOS OUTROS', 'Não há lugar para assédio nem discriminação. Antes do evento, serão divulgados os contactos de apoio e o processo para reportar situações.'],
      ],
      story: <>Uma história <em>em construção.</em></>,
      storyText: 'A história completa de It’s a Trap será construída aqui com as pessoas que lhe deram vida. As datas, testemunhos e citações do passado aguardam verificação e aprovação.',
    },
    edition: {
      eyebrow: 'O PRÓXIMO CAPÍTULO / LISBOA',
      title: <>EDIÇÃO<br /><em>2026.</em></>,
      date: 'DATA',
      venue: 'LOCAL',
      tickets: 'BILHETES',
      ticketsNotOnSale: 'Ainda não estão à venda',
      lineup: <>O <em>cartaz.</em></>,
      firstNames: 'PRIMEIROS NOMES EM BREVE',
      knowBefore: <>Antes de <em>chegares.</em></>,
      faqs: [
        ['A que horas começa?', 'A abertura de portas, os horários das atuações e a última entrada serão anunciados com os detalhes do evento.'],
        ['Onde posso comprar bilhetes?', 'O link oficial para os bilhetes será publicado aqui quando as vendas começarem.'],
        ['Há idade mínima?', 'A idade mínima e os requisitos de identificação ainda serão confirmados.'],
        ['E a acessibilidade?', 'A acessibilidade do espaço, as instalações e um contacto para questões serão confirmados antes da venda de bilhetes.'],
        ['E se precisar de apoio durante a noite?', 'Os contactos de apoio, o processo para reportar situações e as regras do espaço serão publicados aqui.'],
      ],
    },
    archive: {
      eyebrow: 'NOITES PASSADAS / ENERGIA QUE FICA',
      title: <>O<br /><em>ARQUIVO.</em></>,
      intro: 'Cartazes, alinhamentos e momentos de edições anteriores.',
      filters: ['Tudo', 'Cartazes', 'Alinhamentos', 'Fotografias'],
      collection: 'COLEÇÃO EM CONSTRUÇÃO',
      verified: 'Em breve: anos e registos de eventos verificados.',
      note: 'Estas imagens são ilustrações provisórias, não cartazes históricos do evento. A pesquisa por ano e evento será adicionada à medida que o arquivo for sendo organizado.',
      categories: ['All', 'Posters', 'Lineups', 'Photographs'],
    },
    lens: {
      eyebrow: 'AS PESSOAS POR TRÁS DA CÂMARA',
      title: <>ATRAVÉS<br /><em>DA LENTE.</em></>,
      intro: 'A pista vista por dentro. Um espaço para as pessoas que registam a cena em fotografia.',
      heading: <>Quem fotografa<br /><em>merece crédito.</em></>,
      galleries: 'As galerias aguardam imagens aprovadas. Cada coleção identificará a pessoa fotógrafa e terá um link para o seu portefólio.',
      press: <>Na <em>imprensa.</em></>,
      coverage: 'A cobertura selecionada será publicada aqui depois de confirmarmos os títulos, as datas e os links.',
      contact: 'Contactos de fotografia e imprensa',
    },
    community: {
      eyebrow: 'FAZ PARTE DO QUE VEM A SEGUIR',
      title: <>A TUA<br /><em>GENTE.</em></>,
      group: <>Leva a conversa<br /><em>para o grupo.</em></>,
      news: 'Novidades, conversas e ideias para lá da pista.',
      whatsapp: 'WhatsApp · em breve ↗',
      whatsappNotice: 'O convite oficial para o WhatsApp estará disponível em breve.',
      agreement: 'Acordo da comunidade',
      agreementText: 'Respeita todas as identidades e limites. Não são permitidos assédio, discurso de ódio, spam ou publicidade não solicitada. Pede autorização antes de partilhares fotografias ou dados pessoais de alguém.',
      moderation: 'As informações de moderação e denúncia serão partilhadas com o convite.',
      idea: <>Tens uma <em>ideia?</em></>,
      suggestionsIntro: 'Sugestões de artistas, colaborações, acessibilidade ou qualquer outra ideia. Podes deixar o nome e o email em branco.',
      category: 'Categoria',
      categories: ['Sugestão de artista', 'Colaboração', 'Acessibilidade', 'Comentário geral'],
      suggestion: 'A tua sugestão',
      placeholder: 'Conta-nos a tua ideia…',
      name: 'Nome (opcional)',
      email: 'Email (opcional)',
      privacy: 'Pré-visualização: descarrega a tua sugestão num ficheiro. Este site não a envia nem guarda.',
      download: 'Descarregar sugestão ↗',
      downloaded: 'Sugestão descarregada. Nada foi enviado. O envio de sugestões estará disponível quando a comunidade for lançada.',
    },
    contact: {
      eyebrow: 'VAMOS FALAR',
      title: <>ENTRA<br /><em>EM CONTACTO.</em></>,
      topics: 'Programação · Parcerias · Imprensa · Fotografia',
      intro: 'Os contactos específicos serão divulgados em breve. Entretanto, encontra It’s a Trap no Instagram.',
    },
    footer: {
      tagline: 'LISBOA. ALTA. EM COMUNIDADE.',
      contact: 'Contactos',
      instagram: 'Instagram',
      community: 'Comunidade',
      notice: 'CONCEITO DE SITE 2026 · DETALHES DO EVENTO POR CONFIRMAR',
    },
  },
};

function App() {
  const [page, setPage] = useState(pageFromLocation);
  const [category, setCategory] = useState('All');
  const [notice, setNotice] = useState('');
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
    function syncPageWithLocation() {
      setPage(pageFromLocation());
      setNotice('');
      window.scrollTo(0, 0);
    }

    window.addEventListener('popstate', syncPageWithLocation);
    window.addEventListener('hashchange', syncPageWithLocation);
    return () => {
      window.removeEventListener('popstate', syncPageWithLocation);
      window.removeEventListener('hashchange', syncPageWithLocation);
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
    setNotice('');
    window.scrollTo(0, 0);
  }

  function toggleLanguage() {
    setLanguage(isPortuguese ? 'en' : 'pt');
    setNotice('');
  }

  const button = (text, target, className = 'button') => (
    <button className={className} onClick={() => go(target)}>{text} ↗</button>
  );

  function suggest(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const blob = new Blob([JSON.stringify(Object.fromEntries(formData), null, 2)], {
      type: 'application/json',
    });
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = 'its-a-trap-suggestion.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(t.community.downloaded);
  }

  const words=(en,pt)=>isPortuguese?pt:en;
  const shot=(i,caption,cls='')=><figure className={'storyShot '+cls}><img loading="lazy" src={photos[i].src} alt={photos[i].alt}/>{caption&&<figcaption>{caption}</figcaption>}</figure>;
  const ethos=<><span className="eyebrow">{words('THE MUSIC BRINGS US IN. THE PEOPLE BRING US BACK.','A MÚSICA JUNTA-NOS. AS PESSOAS FAZEM-NOS VOLTAR.')}</span><h2>{words('A crowd. A connection.','Uma multidão. Uma ligação.')}<br/><em>{words('A community.','Uma comunidade.')}</em></h2><p>{words('Come for the music. Find your people. Look after each other.','Vem pela música. Encontra os teus. Cuidem uns dos outros.')}</p></>;

  return (
    <>
      <header>
        <button className="wordmark logoWordmark" aria-label="It’s a Trap — Home" onClick={() => go('Home')}><img src={brandLogo} alt="It’s a Trap" /></button>
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
<section className="hero immersive"><div className="heroBackdrop"><img src={photos[0].src} alt={photos[0].alt}/></div><div className="heroCopy"><span className="eyebrow">LISBON / THE PORTUGUESE TRAP MOVEMENT</span><h1 className="heroLogo"><img src={heroLogo} alt="It’s a Trap" fetchPriority="high" /></h1><div className="actions">{button(words('2026 edition','Edição 2026'),'2026 Edition')}{button(words('Find your people','Encontra os teus'),'Community','textbutton')}</div><small>{words('2026 / DATE + VENUE + LINEUP COMING SOON','2026 / DATA + LOCAL + CARTAZ EM BREVE')}</small></div></section>
<section className="storyChapter"><span className="eyebrow">{words('01 / COME THROUGH','01 / APARECE')}</span><h2>{words('It starts with ','Tudo começa com ')}<em>{words('the crowd.','as pessoas.')}</em></h2><div className="storyDuo">{shot(1,words('That feeling when your song comes on.','Quando começa aquela música.'),'tall')}{shot(5,words('Your people. Your night.','A tua gente. A tua noite.'),'offset')}</div></section>
<section className="storyChapter"><div className="storyHeading"><h2>{words('Everyone brings','Cada pessoa traz')}<br/><em>{words('something.','algo seu.')}</em></h2><span className="eyebrow">{words('02 / THE PEOPLE MAKE THE PARTY','02 / AS PESSOAS FAZEM A FESTA')}</span></div><div className="communityMosaic">{shot(6,words('The faces you came with.','As caras que vieram contigo.'))}{shot(10,words('The moments in between.','Os momentos entre músicas.'))}{shot(4,words('The energy you share.','A energia que partilhamos.'))}{shot(12,words('A night with its own character.','Uma noite com personalidade.'))}</div></section>
<div className="photoBreak">{shot(3,words('One room. All together.','Uma sala. Todos juntos.'))}</div>
<section className="storyChapter"><span className="eyebrow">{words('03 / PASS THE ENERGY ON','03 / PASSA A ENERGIA')}</span><h2>{words('Behind the decks.','Atrás dos pratos.')}<br/><em>{words('Inside the moment.','Dentro do momento.')}</em></h2><div className="djTriptych">{shot(2,'')}{shot(8,'','sunsetCrop')}{shot(7,'')}</div><div className="actions">{button(words('Through the Lens','Através da lente'),words('Through the Lens','Através da lente'),'textbutton')}</div></section>
<section className="storyChapter"><h2>{words('The sound.','O som.')}<br/><em>{words('The release.','A liberdade.')}</em></h2><div className="communityMosaic performers">{shot(15,'')}{shot(14,'')}{shot(11,'')}{shot(16,'')}</div></section>
<section className="quietEthos">{ethos}{button(words('Our ethos','O nosso manifesto'),'Ethos','textbutton')}</section>
<section className="communityCall" style={{backgroundImage:`linear-gradient(#111b,#111e),url("${photos[5].src}")`}}><span className="eyebrow">{words('THE CONNECTION CONTINUES','A LIGAÇÃO CONTINUA')}</span><h2>{words('See you','Encontramo-nos')}<br/><em>{words('in the crowd.','no meio da multidão.')}</em></h2>{button(words('Join the community','Junta-te à comunidade'),'Community')}{button(words('See all photographs','Ver todas as fotografias'),'Archive','textbutton')}</section></>:null}

        {page === '2026 Edition' && (
          <section>
            <span className="eyebrow">{t.edition.eyebrow}</span>
            <h1 className="pagetitle">{t.edition.title}</h1>
            <div className="facts">
              <span>{t.edition.date}<b>{t.home.toBeAnnounced}</b></span>
              <span>{t.edition.venue}<b>{t.home.toBeAnnounced}</b></span>
              <span>{t.edition.tickets}<b>{t.edition.ticketsNotOnSale}</b></span>
            </div>
            <h2>{t.edition.lineup}</h2>
            <div className="announcement">{t.edition.firstNames}<span>↗</span></div>
            <h2>{t.edition.knowBefore}</h2>
            {t.edition.faqs.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </section>
        )}

{page==='Ethos'&&<section className="ethosPage">{ethos}<div className="ethosHistory">
  <p>{words('It’s a Trap has its own place in Lisbon’s hip-hop nightlife: a party that grew into something bigger through the people who kept showing up. Founded in 2016 by João Moura and Rodrigo Balona, it brought Rap Notícias and GRVVE together, and grew alongside a generation of Portuguese trap artists and listeners. In April 2019, NiT called it “uma das maiores tendências do hip hop em Portugal”—one of the biggest trends in Portuguese hip-hop. The growing crowds and larger editions tell the story of a party becoming a reference point in the scene.','A It’s a Trap conquistou um lugar próprio na noite hip-hop de Lisboa: uma festa que se tornou algo maior graças às pessoas que continuaram a aparecer. Fundada em 2016 por João Moura e Rodrigo Balona, juntou a Rap Notícias e a GRVVE e cresceu com uma geração de artistas e ouvintes portugueses de trap. Em abril de 2019, a NiT descreveu-a como “uma das maiores tendências do hip hop em Portugal”. As multidões cada vez maiores e as edições de maior dimensão contam a história de uma festa que se tornou uma referência na cena.')}</p>
  <p>{words('The dance floor mattered just as much as the music. Writing about the January 2019 edition at Estúdio Time Out, journalist João Daniel Marques noticed how naturally all kinds of clothes and self-expression fit into the crowd: “Não há comportamento ou outfit que destoe”—no behaviour or outfit seems out of place. People could dress, move and enjoy the music in their own way, among others who got it. Difference became a way to connect, not a reason to stand apart.','A pista de dança importava tanto como a música. Ao escrever sobre a edição de janeiro de 2019 no Estúdio Time Out, o jornalista João Daniel Marques reparou na naturalidade com que diferentes estilos e formas de expressão se integravam na multidão: “Não há comportamento ou outfit que destoe”. Cada pessoa podia vestir-se, dançar e viver a música à sua maneira, rodeada de outras que a compreendiam. A diferença tornava-se uma forma de ligação, não um motivo para ficar de fora.')}</p>
  <p>{words('There was room to take part, too. In a September 2019 interview with Gerador, the organisers recalled how artists got early opportunities through casual invitations and connections between DJs, performers and friends. Yuzi, Sippinpurpp and Lon3r Johny were among the emerging names tied to those nights. As João Moura put it: “se aparecer algum outsider que realmente é bom, vai ser abraçado”—if a talented outsider showed up, they’d be welcomed. You didn’t need a grand introduction; sometimes being there and sharing your work was enough to get started.','Também havia espaço para participar. Numa entrevista à Gerador, em setembro de 2019, os organizadores lembraram como alguns artistas tiveram as primeiras oportunidades através de convites informais e das ligações entre DJs, artistas e amigos. Yuzi, Sippinpurpp e Lon3r Johny foram alguns dos nomes emergentes associados a essas noites. Como disse João Moura: “se aparecer algum outsider que realmente é bom, vai ser abraçado”. Não era preciso uma grande apresentação; às vezes, estar presente e partilhar o trabalho era o primeiro passo.')}</p>
  <p>{words('The party also brought Portuguese talent together with artists from abroad. Its second anniversary brought Unknown T to Portugal; later editions featured Comethazine and French The Kid. Portuguese DJs and artists shared those lineups, putting the local scene in conversation with what was happening in rap, trap and drill elsewhere.','A festa também aproximou o talento português de artistas internacionais. O segundo aniversário trouxe Unknown T a Portugal; edições posteriores contaram com Comethazine e French The Kid. DJs e artistas portugueses partilharam esses cartazes, pondo a cena local em diálogo com o que acontecia no rap, trap e drill além-fronteiras.')}</p>
  <p>{words('It’s a Trap moved between Lisbon venues, from Estúdio Time Out at Mercado da Ribeira to Labirinto and Lisboa ao Vivo. The locations changed; the community and sound gave the nights their continuity. Coverage of the fifth anniversary in 2021, and of further editions in 2023, shows a party that lasted beyond the first rush of excitement. It became an emblematic gathering in Lisbon’s trap scene—not a stand-in for the city’s entire nightlife, but a distinct part of it.','A It’s a Trap passou por vários espaços de Lisboa, do Estúdio Time Out no Mercado da Ribeira ao Labirinto e ao Lisboa ao Vivo. Os locais mudavam; a comunidade e a música davam continuidade às noites. A cobertura do quinto aniversário, em 2021, e de novas edições em 2023 mostra uma festa que sobreviveu ao entusiasmo inicial. Tornou-se um encontro emblemático da cena trap lisboeta — não um retrato de toda a noite da cidade, mas uma parte própria dela.')}</p>
  <p>{words('Taken together, these accounts help explain why some young people may have found a refuge here: a place to recognise themselves in the music, find others with the same tastes and imagine a way in. They describe room for self-expression, community and chances for emerging artists. They don’t tell us who was in the crowd or prove that everyone was safe from discrimination or harassment. “Safe haven” is best understood as the sense of belonging the atmosphere could offer, not as a guarantee about every person’s experience.','Lidos em conjunto, estes relatos ajudam a perceber porque é que alguns jovens poderão ter encontrado aqui um refúgio: um lugar para se reconhecerem na música, encontrarem pessoas com gostos em comum e imaginarem uma forma de participar. Os relatos falam de liberdade de expressão, comunidade e oportunidades para artistas emergentes. Não dizem quem estava na pista nem provam que todas as pessoas estavam protegidas contra a discriminação ou o assédio. “Refúgio seguro” descreve melhor o sentimento de pertença que o ambiente podia proporcionar — não uma garantia sobre a experiência de cada pessoa.')}</p>
 </div><div className="storyDuo">{shot(6,words('Come as you are.','Vem como és.'))}{shot(5,words('Make room for each other.','Há espaço para todos.'),'offset')}</div><div className="photoBreak">{shot(9,words('The room comes alive together.','Juntos damos vida à sala.'))}</div></section>}
        {page === 'Archive' && (
          <section>
            <span className="eyebrow">{t.archive.eyebrow}</span>
            <h1 className="pagetitle">{t.archive.title}</h1>
            <p>{t.archive.intro}</p>
            <div className="filters">
              {t.archive.filters.map((label, index) => {
                const value = t.archive.categories?.[index] ?? ['All', 'Posters', 'Lineups', 'Photographs'][index];
                return <button className={category === value ? 'active' : ''} onClick={() => setCategory(value)} key={value}>{label}</button>;
              })}
            </div>
<div className="gallery">{photos.filter(photo=>category==='All'||(category==='Posters'?photo.kind==='Poster':category==='Photographs'?photo.kind!=='Poster':false)).map(photo=><figure key={photo.src}><img loading="lazy" src={photo.src} alt={photo.alt}/></figure>)}</div>{category==='Lineups'&&<p>{words('Lineups coming soon.','Alinhamentos em breve.')}</p>}<p className="muted">{words('Photographer credits and edition details are being collected.','Créditos fotográficos e detalhes das edições em atualização.')}</p>
          </section>
        )}

        {page === 'Through the Lens' && (
          <section>
            <span className="eyebrow">{t.lens.eyebrow}</span>
            <h1 className="pagetitle">{t.lens.title}</h1>
            <p>{t.lens.intro}</p>
<div className="gallery">{photos.filter(photo=>photo.kind!=='Poster').map(photo=><figure key={photo.src}><img loading="lazy" src={photo.src} alt={photo.alt}/></figure>)}</div><p className="muted">{words('Photographer credits and portfolio links coming soon.','Créditos fotográficos e portfólios em breve.')}</p>
            <h2>{t.lens.press}</h2>
            <p>{t.lens.coverage}</p>
            {button(t.lens.contact, 'Contact')}
          </section>
        )}

        {page === 'Community' && (
          <section>
            <span className="eyebrow">{t.community.eyebrow}</span>
            <h1 className="pagetitle">{t.community.title}</h1><div className="communityMosaic">{shot(6,'')}{shot(5,'')}{shot(10,'')}</div>
            <div className="split inner">
              <div>
                <h2>{t.community.group}</h2>
                <p>{t.community.news}</p>
                <button className="button" onClick={() => setNotice(t.community.whatsappNotice)}>{t.community.whatsapp}</button>
                <p role="status">{notice}</p>
              </div>
              <div className="agreement">
                <h3>{t.community.agreement}</h3>
                <p>{t.community.agreementText}</p>
                <p>{t.community.moderation}</p>
              </div>
            </div>
            <h2>{t.community.idea}</h2>
            <p>{t.community.suggestionsIntro}</p>
            <form onSubmit={suggest}>
              <label>{t.community.category}
                <select name="category">
                  {t.community.categories.map((label, index) => (
                    <option key={label} value={isPortuguese
                      ? ['artist-request', 'collaboration', 'accessibility', 'general-feedback'][index]
                      : ['Artist request', 'Collaboration', 'Accessibility', 'General feedback'][index]}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>{t.community.suggestion}
                <textarea name="suggestion" required rows="5" maxLength="4000" placeholder={t.community.placeholder} />
              </label>
              <div className="formrow">
                <label>{t.community.name}<input name="name" autoComplete="name" /></label>
                <label>{t.community.email}<input name="email" type="email" autoComplete="email" /></label>
              </div>
              <p className="muted">{t.community.privacy}</p>
              <button className="button">{t.community.download}</button>
            </form>
          </section>
        )}

        {page === 'Contact' && (
          <section>
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h1 className="pagetitle">{t.contact.title}</h1>
            <p>{t.contact.topics}</p>
            <p>{t.contact.intro}</p>
            <a className="button" href="https://www.instagram.com/itsatrap.official/" target="_blank" rel="noreferrer">@itsatrap.official ↗</a>
          </section>
        )}
      </main>

      <footer>
        <button className="wordmark logoWordmark footerLogo" aria-label="It’s a Trap — Home" onClick={() => go('Home')}><img src={brandLogo} alt="It’s a Trap" loading="lazy" /></button>
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
