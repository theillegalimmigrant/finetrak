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
console.log('FB - addTeam');
    let model = teamModel(name, code);
    return database.collection('teams').add(model);
};

export const getTeam = (name, code) => {
console.log('FB - getTeam');
  return database.collection('teams').where('name','==',name).where('code','==',code).get();
}

export const getTeamFines = (teamId) => {
console.log('FB - getTeamFines');
  return database.collection('teams').doc(teamId).collection('fines').get();
}


export const getTeamPlayers = (teamId) => {
console.log('FB - getTeamPlayers');
  return database.collection('teams').doc(teamId).collection('players').get();
}


export const getTeamById = (teamId) => {
console.log('FB - getTeamById');
  return database.collection('teams').doc(teamId).get();
}

export const addPlayer = (teamId, name) => {
    let model = playerModel(name);

console.log('FB - addPlayer');

    return database.collection('teams')
                   .doc(teamId)
                   .collection('players')
                   .add(model)
}

export const addFine = (teamId, infringement, amount) => {
    let model = fineModel(infringement, amount);

console.log('FB - addFine');

    return database.collection('teams')
                   .doc(teamId)
                   .collection('fines')
                   .add(model)
}

export const finePlayer = (teamId, playerId, fineId) => {
console.log('FB - finePlayer');
  let playerRef = database.collection('teams').doc(teamId).collection('players').doc(playerId);
  return database.runTransaction((t) => {
    return t.get(playerRef).then((doc) => {
      // doc doesn't exist; can't update
      if (!doc.exists) return;
      // update the users array after getting it from Firestore.
      const newArray = [...doc.get('finesIssued'), fineId];
      t.set(playerRef, { finesIssued: newArray }, { merge: true });
    });
  }).catch(console.log);
}