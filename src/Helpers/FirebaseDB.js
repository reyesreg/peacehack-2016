var Firebase = require('firebase');

const config = {
    apiKey: 'AIzaSyDauxSuQ9GVOzaEc7EuXuAUCeFE4Q9SXFc',
    authDomain: 'reactnative-todo-91974.firebaseapp.com',
    databaseURL: 'https://reactnative-todo-91974.firebaseio.com/',
    storageBucket: 'reactnative-todo-91974.appspot.com',
};

const firebaseApp = Firebase.initializeApp(config);
export default firebaseApp;
