const date = new Date();
let pages = {
  young_thug: {
    code_name: "young_thug",
    name: "young_thug",
    contents: "Young Thug, born Jeffrey Williams, is a rapper known for his unconventional vocal style and influential presence in the Atlanta hip-hop scene.",
    created: `${date}`,
    versions: {},
  },
  gucci_mane: {
    code_name: "gucci_mane",
    name: "gucci_mane",
    contents: "Gucci Mane, born Radric Davis, is a pioneer of trap music and a major influence on Atlanta rap culture.",
    created: `${date}`,
    versions: {},
  },
  future: {
    code_name: "future",
    name: "future",
    contents: "Future, born Nayvadius Wilburn, is known for his melodic rap style and hits like 'Mask Off.'",
    created: `${date}`,
    versions: {},
  },
  lil_baby: {
    code_name: "lil_baby",
    name: "lil Baby",
    contents: "Lil Baby, born Dominique Jones, rose to fame with hits like 'Drip Too Hard' and is a key figure in modern Atlanta rap.",
    created: `${date}`,
    versions: {},
  },
  slaughter: {
    code_name: "slaughter",
    name: "slaughter",
    contents: "21 Savage aka The Slaughter King, born Shéyaa Bin Abraham-Joseph, is known for his gritty lyrics and collaborations with major artists.",
    created: `${date}`,
    versions: {},
  },
  offset: {
    code_name: "offset",
    name: "offset",
    contents: "Offset, a member of the migos, is recognized for his dynamic verses and fashion influence.",
    created: `${date}`,
    versions: {},
  },
  quavo: {
    code_name: "quavo",
    name: "quavo",
    contents: "Quavo, another member of migos, is known for his melodic hooks and solo projects.",
    created: `${date}`,
    versions: {},
  },
  takeoff: {
    code_name: "takeoff",
    name: "takeoff",
    contents: `<ul><li> https://en.wikipedia.org/wiki/Takeoff_(rapper) </li><li> TiP </li> <li> NoExistingPage </li></ul>`,
    created: `${date}`,
    versions: {},
  },
  ludacris: {
    code_name: "ludacris",
    name: "ludacris",
    contents: "Ludacris, born Christopher Bridges, is a veteran Atlanta rapper known for his charismatic delivery and acting career.",
    created: `${date}`,
    versions: {},
  },
  migos: {
    code_name: "migos",
    name: "migos",
    contents: "Migos, consisting of Quavo, Offset, and Takeoff, were a groundbreaking hip-hop trio from Atlanta known for their unique triplet flow and hits like 'Bad and Boujee.'",
    created: `${date}`,
    versions: {},
  },
  TiP: {
    code_name: "TiP",
    name: "TiP",
    contents: "T.I., born Clifford Harris, is a legendary Atlanta rapper known as one of the pioneers of trap music, with hits like 'Whatever You Like' and 'Live Your Life.'",
    created: `${date}`,
    versions: {},
  }
    
};

const randomNumber = () => {
  return Math.random().toString().slice(2);
};

function debug_db() {
  console.log(JSON.stringify(pages, null, 2));
}

function article_getByEncodedName(code_name) {
  return pages[code_name] || pages[encodeURIComponent(code_name)];
}

function article_create(name, contents) {
  if (pages[name]) {
    throw new Error("page already exists");
  }
  let code_name = encodeURIComponent(name);
  pages[code_name] = {
    code_name,
    name,
    contents,
    created: `${new Date()}`,
    versions: {},
  };
  return pages[code_name];
}

function article_deleteByEncodedName(code_name) {
  if (pages[code_name]) {
    delete pages[code_name];
  } else {
    throw new Error("page does not exist");
  }
}

function article_editByEncodedName(code_name, contents) {
  if (pages[code_name]) {
    const newVersion = randomNumber();
    const oldContent = pages[code_name].contents;
    pages[code_name].versions[newVersion] = {
      key: newVersion,
      contents: oldContent,
      created: pages[code_name].created,
    };
    pages[code_name].contents = contents;
    pages[code_name].created = `${new Date()}`;
    return pages[code_name];
  } else {
    throw new Error("page does not exist");
  }
}

function article_searchByTerms(searchTerms) {
  let results = Object.values(pages);
  for (let term of searchTerms) {
    if (term.length > 0) {
      results = results.filter((a) => a.contents.includes(term));
    }
  }
  return results;
}

function article_getRandoms(n) {
  let results_index_set = new Set();
  let pages_array = Object.values(pages);
  while (results_index_set.size < Math.min(n, pages_array.length)) {
    results_index_set.add(Math.floor(Math.random() * pages_array.length));
  }
  return Array.from(results_index_set).map((i) => pages_array[i]);
}

module.exports = {
  article_getByEncodedName,
  article_create,
  article_deleteByEncodedName,
  article_editByEncodedName,
  article_searchByTerms,
  article_getRandoms,
  debug_db,
};
