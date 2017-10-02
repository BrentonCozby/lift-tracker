import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyBuVY-9uL38UFQzauQwhb0VDEbxG5uxMg4',
    authDomain: 'lift-tracker-e0496.firebaseapp.com',
    databaseURL: 'https://lift-tracker-e0496.firebaseio.com',
    projectId: 'lift-tracker-e0496',
    storageBucket: 'lift-tracker-e0496.appspot.com',
    messagingSenderId: '232010668184'
}
firebase.initializeApp(config)

const db = firebase.database()
const usersRef = db.ref('users/')
const programsRef = db.ref('programs/')

export { db }
export { usersRef }
export { programsRef }

export function createProgram(programData) {
    return Promise.resolve(programsRef.push(programData))
}

export function loginRedirect(loginMethod) {
    let provider = new firebase.auth[`${loginMethod}AuthProvider`]()
    
    return new Promise((resolve) => {
        firebase.auth().signInWithRedirect(provider)
            .then(function (data) {
                resolve(data)
            })
    })
}

export function retrieveLoginResult() {
    return new Promise((resolve, reject) => {
        firebase.auth().getRedirectResult().then(function(result) {
            if (!result.credential) return resolve(null)
            
            resolve(result)
        }).catch(function(error) {
            const errorCode = error.code
            // const errorMessage = error.message
            // The email of the user's account used.
            // const email = error.email
            // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email. Try logging in with a different method.')
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            }
            reject(error)
        })
    })
}

export function onAuthStateChanged() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                resolve(null)

                return false
            }

            usersRef
                .once('value', snapshot => {
                    const data = snapshot.val() || {}

                    if(!data[user.uid]) {
                        db.ref('users/' + user.uid).set({
                            programs: {},
                            username: user.displayName,
                            email: user.email,
                            isAdmin: false
                        })
                    }
                })
                .then(snapshot => {
                    if(snapshot.val() && snapshot.val()[user.uid]) {
                        resolve({
                            data: {...snapshot.val()[user.uid]},
                            uid: user.uid
                        })
                    }
                    // if new user is created, another snapshot is required to get new data
                    else {
                        usersRef.once('value', snapshot => {
                            resolve({
                                data: {...snapshot.val()[user.uid]},
                                uid: user.uid
                            })
                        })
                    }
                })
        })
    })

}

export function logout() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function() {
            resolve()
        }, function(error) {
            reject(error)
        })
    })
}
