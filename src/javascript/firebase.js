import firebase from '@firebase/app';
import '@firebase/firestore'
import teamModel from './models/team';
import playerModel from './models/player';
import fineModel from './models/fine';

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
    database = firebase.firestore();
    database.settings({ timestampsInSnapshots: true });
}

export const getTeamsDB = () => {
  return database.collection('teams').get();
}

// add new team
export const addTeam = (name, code) => {
    let model = teamModel(name, code);
    return database.collection('teams').add(model);
};

export const getTeam = (name, code) => {
  return database.collection('teams').where('name','==',name).where('code','==',code).get();
}

export const addFineItem = (teamId, infringement, amount) => {
    return new Promise((resolve, reject) => {
        database.ref(`/teams/${teamId}`).once('value').then((teamDb) => {
            let fines = teamDb.val().fines || [];
            fines.push(fineModel(infringement, amount));
            database.ref(`/teams/${teamId}/fines`).set(fines)
                .then(res => {resolve(res)})
                .catch(err => {reject(err)});
        })
    })
}

export const addPlayerItem = (teamId, name) => {
    return new Promise((resolve, reject) => {
        database.ref(`/${teamId}`).once('value').then((teamDb) => {
            let players = teamDb.val().players || [];
            players.push(playerModel(name));
            database.ref(`/${teamId}/players`).set(players)
                .then(res => {resolve(res)})
                .catch(err => {reject(err)});
        })
    })
}