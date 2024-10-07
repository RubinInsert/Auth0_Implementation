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
    auth0Logout: true,
  };
  app.use(auth(config));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Required to parse 'body' attributes within POST requests
  app.get('/auth', (req, res) => {
    console.log("test");
    res.oidc.login({
      returnTo: '/dashboard'
    });
  });
  
  app.get('/dashboard*', requiresAuth(), (req,res) => serveFiles(req, res));
  app.get('/api/profile', (req,res) => {
      if(req.oidc.isAuthenticated()) {
        res.json(req.oidc.user);
      } else {
        res.status(400)
        res.end();
      }
  });
  app.post("/api/watchlist/add", (req,res) => {
    if(req.oidc.isAuthenticated()) {
      const watchListUser = req.body;
      res.send("{message:'success'}");
    } else {
      res.status(400)
      console.log("test");
      res.end();
    }
  }); 
  app.get('/*', (req,res) => serveFiles(req, res)); // Placed after all other pages to ensure Auth is requested for required pages.
function serveFiles(req, res) {
  var pathDirs = req.path.split("/")
  var isFileSpecified = pathDirs[pathDirs.length - 1].includes(".");
  if (isFileSpecified) {
    res.sendFile(path.join(__dirname, "/front/", req.url));
  } else {
    if(pathDirs[pathDirs.length - 1] == '') { // Is there a "/" at the end of the URL? If not redirect. (Fixes issues with HTML linking)
      res.sendFile(path.join(__dirname, "/front/", req.url, "/index.html"));
    } else {
      res.redirect(path.join(req.url, "/"));
    }
    
  }
}

app.listen(3000);


// Temp fetch req - API testing.

// fetch("http://localhost:3000/api/watchlist/add", {
//   method: "POST",
//   body: JSON.stringify({
//     user: 1,
//     title: "Fix my bugs",
//     completed: false
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8"
//   }
// });