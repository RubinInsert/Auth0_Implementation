const express = require("express");
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
const { Console } = require("console");
const app = express();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'zE2Xm70iilpjPHuw2jQ4mDduXE3JQbFA',
    issuerBaseURL: 'https://dev-atqdicku.us.auth0.com',
  };
  app.use(auth(config));
  app.get('/login', (req, res) => {
    res.oidc.login({
      returnTo: '/dashboard/index.html'
    });
  });

  app.get('/dashboard*', requiresAuth(), (req, res) => {
    ServeFiles(req, res);
    var pathDirs = req.path.split("/")
    var isFileSpecified = pathDirs[pathDirs.length - 1].includes(".");
    if (isFileSpecified) {
      res.sendFile(path.join(__dirname, "/front/", req.url));
    } else {
      res.sendFile(path.join(__dirname, "/front/", req.url, "/index.html"));
    }
    console.log(path.join(__dirname, "/front/", req.url));
  });
  function ServeFiles(req, res) {
    req.path
  }

//app.use(express.static('front'));
// app.get("/login*", (req, res) => {
//   console.log(req.url.endsWith("\\") + path.join(__dirname, "/front/", req.url));
//   if(req.url.endsWith("\\") + path.join(__dirname, "/front/", req.url).endsWith("\\")) {
//     res.sendFile(
//       path.join(__dirname, "/front/", req.url, "/index.html")
//     );
//   } else {
//     res.sendFile(
//       path.join(__dirname, "/front/", req.url)
//     );
//   }

// });


app.listen(3000);