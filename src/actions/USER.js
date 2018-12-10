import app from "../components/Firebase"

export var USER = app.auth().currentuser;
  app.auth().onAuthStateChanged(function(user) {
    if (user) {
      USER = user;
    } else {
      // No user is signed in.
    }
  });

