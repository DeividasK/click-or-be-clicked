var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUUoC2BwaqI1JFCSyTAPsJ9RPHFKhYAC4",
    authDomain: "click-or-be-clicked.firebaseapp.com",
    databaseURL: "https://click-or-be-clicked.firebaseio.com",
    storageBucket: "click-or-be-clicked.appspot.com",
    messagingSenderId: "448383551461"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var provider = new firebase.auth.GoogleAuthProvider();

var userId = null;

function signIn() {
  console.log('Running sign in.');
  return firebase.auth().signInWithRedirect(provider);
}

function checkAuth() {
  console.log('Checking authentication.');
  return firebase.auth().getRedirectResult().then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    
    // The signed-in user info.
    var user = result.user;
    
    userId = user.uid;
    
    database.ref('users-active/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        image: user.photoURL
    });
    
    console.log('Authenticated successfully.');
  }).catch(function(error) {
    console.log('Authentication unsuccessful', error);
  });
}

function signOut() {
  database.ref('users-active/' + userId).remove();
  
  return firebase.auth().signOut().then(function() {
    console.log('Sign out successful.');
  }, function(error) {
    // An error happened.
  });
}

function getOnlinePlayers() {
    return firebase.database().ref('users-active');
}

var helpers = {
    signIn: signIn,
    checkAuth: checkAuth,
    signOut: signOut,
    getOnlinePlayers: getOnlinePlayers
};

module.exports = helpers;