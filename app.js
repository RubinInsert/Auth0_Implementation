const express = require("express");
const path = require("path");
const { auth } = require("express-openid-connect");
const app = express();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'zE2Xm70iilpjPHuw2jQ4mDduXE3JQbFA',
    issuerBaseURL: 'https://dev-atqdicku.us.auth0.com'
  };
  app.use(auth(config));
  app.get('/*', (req, res) => {
    console.log(path.join(__dirname, "/front", req.path));
    if (req.oidc.isAuthenticated()) {
        
        res.sendFile(path.join(__dirname, "/front", req.path));
    } else {
        res.oidc.login({returnTo: "/home/index.html"});
    }
  });
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