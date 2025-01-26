const date = new Date();
let pages = {
  init: {
    code_name: "init",
    name: "init",
    contents: "This is a simple initial page to prove that pages work",
    created: `${date}`,
    versions: {},
  },
  page1: {
    code_name: "page1",
    name: "page1",
    contents: "BowWow",
    created: `${date}`,
    versions: {},
  },
  page2: {
    code_name: "page2",
    name: "page2",
    contents: "This is complicated",
    created: `${date}`,
    versions: {},
  },
  about_us: {
    code_name: "about_us",
    name: "about_us",
    contents: "top shop",
    created: `${date}`,
    versions: {},
  },
  contact: {
    code_name: "contact",
    name: "contact",
    contents: "crop top",
    created: `${date}`,
    versions: {},
  },
  services: {
    code_name: "services",
    name: "services",
    contents: "chop chop",
    created: `${date}`,
    versions: {},
  },
  IdleWords: {
    code_name: "IdleWords",
    name: "IdleWords",
    contents: "drop top",
    created: `${date}`,
    versions: {},
  },
  BowWow: {
    code_name: "BowWow",
    name: "BowWow",
    contents: `<ul><li> https://example.com </li><li> IdleWords </li> <li> NoExistingPage </li></ul>`,
    created: `${date}`,
    versions: {},
  },
};

const randomNumber = () => {
  return Math.random().toString().slice(2);
};

function debug_db() {
  // This function might be useful to call from index.js for debugging, idk
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
