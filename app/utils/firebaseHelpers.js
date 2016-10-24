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
  }

  addNewGame (blocks) {
    let gameKey = this.database.ref('games').push().key;
    
    this.database.ref('games/' + gameKey).set({
      players: { blue: '', red: '' },
      blocks: blocks
    });
  }
  
  updateGame (block, id) {
    return this.database.ref('games/' + id + '/blocks/' + block.blockId).set(block.color);
  }
  
  getGame (id) {
    return this.database.ref('games/' + id + '/blocks');
  }
}