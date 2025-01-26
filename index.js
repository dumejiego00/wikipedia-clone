const db = require("./fake-wiki-db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/src"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// checks if article exists
const article_exists = (code_name) => {
  return db.article_getByEncodedName(code_name) !== undefined ? true : false;
};

// gets article as an object
const article_get = (code_name) => {
  return db.article_getByEncodedName(code_name);
};

// checks if a word starts with either http:// or https://
const isExternalLink = (word) => {
  return word.startsWith("http://") || word.startsWith("https://");
};

// checks if a word is a WikiLink
const isWikiLink = (word) => {
  if (/\b[A-Z][a-z]*[A-Z][a-zA-Z]*\b/g.test(word)) {
    return true;
  }
  return false;
};

// extracts external link or wikiLink from string, convert it to an html <a> tag.
const make_it_link = (article_content) => {
  let article_words = article_content.split(" ");
  for (let i = 0; i < article_words.length; i++) {
    if (isExternalLink(article_words[i])) {
      article_words[
        i
      ] = `<a href="${article_words[i]}">${article_words[i]}</a>`;
    } else if (isWikiLink(article_words[i])) {
      article_words[
        i
      ] = `<a href="${article_words[i]}">${article_words[i]}</a>`;
    } else {
      continue;
    }
  }
  return article_words.join(" ");
};

// "/" render home page
app.get("/", (req, res) => {
  const fiveRandomArticles = db.article_getRandoms(5);
  res.render("home.ejs", { articles: fiveRandomArticles });
});

// "/article/articleName"
app.get("/article/:articlename", (req, res) => {
  const article_code_name = req.params.articlename;
  if (!article_exists(article_code_name)) {
    res.redirect(`/newarticle?newarticlename=${article_code_name}`);
  } else {
    const article = article_get(article_code_name);
    res.render("article.ejs", {
      name: article_code_name,
      content: make_it_link(article.contents),
    });
  }
});

// get "/article/articleName/edit"
app.get("/article/:articlename/edit", (req, res) => {
  const article = db.article_getByEncodedName(req.params.articlename);
  res.render("edit.ejs", { name: article.name, content: article.contents });
});

// post "/article/articleName/edit"
app.post("/article/:articlename/edit", (req, res) => {
  const articlename = req.params.articlename;
  const newContent = req.body.textarea;
  if (newContent === "") {
    res.send("You cannot: 1.Leave boxes empty 2.Cannot use % in title.");
  }
  db.article_editByEncodedName(articlename, newContent);
  res.redirect(`/article/${articlename}`);
});

// get "/article/articleName/delete"
app.get("/article/:articlename/delete", (req, res) => {
  const article_name = req.params.articlename;
  if (db.article_getByEncodedName(article_name) === undefined) {
    res.send("Title does not exist!");
  } else {
    res.render("delete.ejs", { name: article_name });
  }
});

// post "/article/articleName/delete"
app.post("/article/:articlename/delete", (req, res) => {
  const articlename = req.params.articlename;
  db.article_deleteByEncodedName(articlename);
  res.redirect("/");
});

// get "/newArticle"
app.get("/newarticle", (req, res) => {
  let newarticlename = req.query.newarticlename;
  let new_article_message = "";

  if (newarticlename === undefined) {
    newarticlename = "";
  } else {
    new_article_message =
      "Your article does not seem to exist, but you could create it.";
  }
  res.render("newarticle.ejs", {
    newarticlename: newarticlename,
    newarticlemessage: new_article_message,
  });
});

// post "/newArticle"
app.post("/newarticle", (req, res) => {
  const articlename = req.body.title;
  const newContent = req.body.textarea;

  if (articlename === "" || newContent === "" || articlename.includes("%")) {
    res.send("You cannot: 1.Leave boxes empty 2.Cannot use % in title.");
  } else if (db.article_getByEncodedName(articlename) !== undefined) {
    res.send("Title exists");
  } else {
    db.article_create(articlename, newContent);
    res.redirect(`/article/${articlename}`);
  }
});

// get "/searchArticles"
app.get("/searcharticles", (req, res) => {
  const keyword = req.query.keyword.split(" ");
  res.render("searcharticles.ejs", {
    articles: db.article_searchByTerms(keyword),
    keyword: keyword,
  });
});

// get "/article/articleName/history"
app.get("/article/:articlename/history", (req, res) => {
  const article = article_get(req.params.articlename);
  res.render("history.ejs", {
    article: article,
  });
});

// get "/article/articleName/history/versionid"
app.get("/article/:articlename/history/:versionid", (req, res) => {
  const article_code_name = req.params.articlename;
  const article = article_get(article_code_name);
  res.render("version.ejs", {
    name: article_code_name,
    content: make_it_link(article.versions[req.params.versionid].contents),
    version: req.params.versionid,
  });
});

app.use((err, req, res, next) => {
  res.status(500).send("File not found");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
