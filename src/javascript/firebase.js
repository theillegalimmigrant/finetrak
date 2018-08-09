import * as firebase from 'firebase';
let database

export const init = () => {
    const config = {
        apiKey: "AIzaSyDTV6dUnBozzUNjdwwyR0XUgW1YC2gJexU",
        authDomain: "finetrak.firebaseapp.com",
        databaseURL: "https://finetrak.firebaseio.com",
        projectId: "finetrak",
        storageBucket: "finetrak.appspot.com",
        messagingSenderId: "1040720117676"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}
