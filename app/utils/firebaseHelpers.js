var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");


export default new class firebaseHelpers {
  constructor() {
    
    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyBUUoC2BwaqI1JFCSyTAPsJ9RPHFKhYAC4",
        authDomain: "click-or-be-clicked.firebaseapp.com",
        databaseURL: "https://click-or-be-clicked.firebaseio.com",
        storageBucket: "click-or-be-clicked.appspot.com",
        messagingSenderId: "448383551461"
    };
    
    firebase.initializeApp(config);
    
    this.database = firebase.database();
    this.provider = new firebase.auth.GoogleAuthProvider();

    this.userId = null;
  }
  
  signIn () {
    console.log('Running sign in.');
    return firebase.auth().signInWithRedirect(this.provider);
  }
  
  checkAuth() {
    console.log('Checking authentication.');
    return firebase.auth().getRedirectResult().then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      
      // The signed-in user info.
      var user = result.user;
      
      this.userId = user.uid;
      
      this.database.ref('users-active/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          image: user.photoURL
      });
      
      console.log('Authenticated successfully.');
    }.bind(this)).catch(function(error) {
      console.log('Authentication unsuccessful', error);
    });
  }
  
  signOut () {
    this.database.ref('users-active/' + this.userId).remove();
    
    return firebase.auth().signOut().then(function() {
      console.log('Sign out successful.');
    }, function(error) {
      // An error happened.
    });
  }
  
  getOnlinePlayers () {
    return this.database.ref('users-active');
  }
  
  addNewGame (blocks) {
    let gameKey = this.database.ref('games').push().key;
    
    this.database.ref('games/' + gameKey).set({
      players: { blue: '', red: '' },
      blocks: blocks
    });
  }
  
  updateGame (block, id = '-KUkiiEA0I1_BErO2luP') {
    return this.database.ref('games/' + id + '/blocks/' + block.blockId).set(block.color);
  }
  
  getGame (id = '-KUkiiEA0I1_BErO2luP') {
    return this.database.ref('games/' + id + '/blocks');
  }
}