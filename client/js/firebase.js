import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyBuVY-9uL38UFQzauQwhb0VDEbxG5uxMg4',
    authDomain: 'lift-tracker-e0496.firebaseapp.com',
    databaseURL: 'https://lift-tracker-e0496.firebaseio.com',
    projectId: 'lift-tracker-e0496',
    storageBucket: 'lift-tracker-e0496.appspot.com',
    messagingSenderId: '232010668184',
}
firebase.initializeApp(config)

const db = firebase.database()

function getUser(uid) {
    return new Promise(resolve => {
        db.ref(`users/${uid}`)
            .once('value', snapshot => {
                resolve(snapshot.val() || {})
            })
    })
}

function updateUser(uid, data) {
    return new Promise((resolve) => {
        if (Object.values(data).some(val => val === undefined)) {
            throw Error(`updateUser data cannot have properties with undefined values. Data:\n${JSON.stringify(data)}`)
        }

        db.ref(`users/${uid}`)
        .update(data, () => {
            resolve(getUser(uid))
        })
        .catch(console.error)
    })
}

function getAllUsers() {
    return new Promise(resolve => {
        db.ref('users/').once('value', snapshot => {
            resolve(snapshot.val() || {})
        })
    })
}

function createProgram(programData) {
    const newProgramRef = db.ref('programs/').push(programData)
    
    return new Promise(resolve => {
        newProgramRef.once('value', snapshot => {
            resolve({
                programId: newProgramRef.key,
                programData: snapshot.val(),
            })
        })
    })
}

function loginRedirect(loginMethod) {
    let provider = new firebase.auth[`${loginMethod}AuthProvider`]()
    
    return firebase.auth().signInWithRedirect(provider)
    .then(function (data) {
        return data
    })
}

function retrieveLoginResult() {
    return new Promise((resolve, reject) => {
        firebase.auth().getRedirectResult()
        .then(function(result) {
            if (!result.credential) return resolve(null)

            const { user, additionalUserInfo } = result

            updateUser(user.uid, {
                email: user.email,
                fullName: additionalUserInfo.profile.name,
                firstName: additionalUserInfo.profile.given_name,
                lastName: additionalUserInfo.profile.family_name,
                avatar: additionalUserInfo.profile.picture,
                provider: additionalUserInfo.providerId,
            })
            
            resolve(result)
        })
        .catch(function(error) {
            const errorCode = error.code
            // const errorMessage = error.message
            // The email of the user's account used.
            // const email = error.email
            // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different provider for that email. Log in with the provider you used last time.')
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            }
            reject(error)
        })
    })
}

function onAuthStateChanged() {
    return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(authData => {
            if (!authData) {
                return resolve(null)
            }

            getUser(authData.uid)
            .then(userData => {
                return resolve({ data: { ...userData }, uid: authData.uid })
            })
        })
    })
}

function logout() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function() {
            resolve()
        }, function(error) {
            reject(error)
        })
    })
}

export {
    db,
    getUser,
    updateUser,
    getAllUsers,
    createProgram,
    loginRedirect,
    retrieveLoginResult,
    onAuthStateChanged,
    logout,
}
