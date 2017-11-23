import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../../../src/js/actions-and-reducers/user/user-action-creators.js'
import * as firebase from '../../../src/js/firebase.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('user-action-creators', () => {
    let store

    beforeEach(() => {
        store = mockStore({
            titles: [],
            current: {}
        })
    })

    describe('firebaseLoginRedirect', () => {
        test('dispatches FIREBASE_LOGIN_REDIRECT_SUCCESS when it returns a resolved promise', () => {
            let loginRedirectSpy = jest.fn(() => {
                return Promise.resolve()
            })

            firebase.loginRedirect = loginRedirectSpy

            const expectedActions = [
                { type: 'FIREBASE_LOGIN_REDIRECT_SUCCESS' }
            ]

            return store.dispatch(actions.firebaseLoginRedirect({ loginMethod: 'google' }))
                .then(() => {
                    expect(loginRedirectSpy).toHaveBeenCalledWith('google')
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches FIREBASE_LOGIN_REDIRECT_ERROR when it returns a rejected promise', () => {
            let loginRedirectSpy = jest.fn(() => {
                return Promise.reject(Error('login redirect failed'))
            })

            firebase.loginRedirect = loginRedirectSpy

            const expectedActions = [
                { type: 'FIREBASE_LOGIN_REDIRECT_ERROR', error: Error('login redirect failed') }
            ]

            return store.dispatch(actions.firebaseLoginRedirect({ loginMethod: 'google' }))
                .then(() => {
                    expect(loginRedirectSpy).toHaveBeenCalledWith('google')
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('retrieveLoginResult', () => {
        test('dispatches RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD when it returns a resolved promise (no payload)', () => {
            let retrieveLoginResultSpy = jest.fn(() => {
                return Promise.resolve(null)
            })

            firebase.retrieveLoginResult = retrieveLoginResultSpy

            const expectedActions = [
                { type: 'RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD', payload: null }
            ]

            return store.dispatch(actions.retrieveLoginResult())
                .then(() => {
                    expect(retrieveLoginResultSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD when it returns a resolved promise (with payload)', () => {
            let retrieveLoginResultSpy = jest.fn(() => {
                return Promise.resolve({ uid: 'uid123', username: 'foo' })
            })

            firebase.retrieveLoginResult = retrieveLoginResultSpy

            const expectedActions = [
                { type: 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD', payload: { uid: 'uid123', username: 'foo' } }
            ]

            return store.dispatch(actions.retrieveLoginResult())
                .then(() => {
                    expect(retrieveLoginResultSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches RETRIEVE_LOGIN_RESULT_ERROR when it returns a rejected promise', () => {
            let retrieveLoginResultSpy = jest.fn(() => {
                return Promise.reject(Error('failed to retrieve login result'))
            })

            firebase.retrieveLoginResult = retrieveLoginResultSpy

            const expectedActions = [
                { type: 'RETRIEVE_LOGIN_RESULT_ERROR', error: Error('failed to retrieve login result') }
            ]

            return store.dispatch(actions.retrieveLoginResult())
                .then(() => {
                    expect(retrieveLoginResultSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('listenForAuthStateChanged', () => {
        test('dispatches GET_USER_DATA_SUCCESS_NO_PAYLOAD when it returns a resolved promise (no payload)', () => {
            let onAuthStateChangedSpy = jest.fn(() => {
                return Promise.resolve(null)
            })

            firebase.onAuthStateChanged = onAuthStateChangedSpy

            const expectedActions = [
                { type: 'GET_USER_DATA_SUCCESS_NO_PAYLOAD', payload: null }
            ]

            return store.dispatch(actions.listenForAuthStateChanged())
                .then(() => {
                    expect(onAuthStateChangedSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches GET_USER_DATA_SUCCESS_WITH_PAYLOAD when it returns a resolved promise (with payload)', () => {
            let onAuthStateChangedSpy = jest.fn(() => {
                return Promise.resolve({ uid: 'uid123', username: 'foo' })
            })

            firebase.onAuthStateChanged = onAuthStateChangedSpy

            const expectedActions = [
                { type: 'GET_USER_DATA_SUCCESS_WITH_PAYLOAD', payload: { uid: 'uid123', username: 'foo' } }
            ]

            return store.dispatch(actions.listenForAuthStateChanged())
                .then(() => {
                    expect(onAuthStateChangedSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches GET_USER_DATA_ERROR when it returns a rejected promise', () => {
            let onAuthStateChangedSpy = jest.fn(() => {
                return Promise.reject(Error('failed to get user data'))
            })

            firebase.onAuthStateChanged = onAuthStateChangedSpy

            const expectedActions = [
                { type: 'GET_USER_DATA_ERROR', error: Error('failed to get user data') }
            ]

            return store.dispatch(actions.listenForAuthStateChanged())
                .then(() => {
                    expect(onAuthStateChangedSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('logoutOfFirebase', () => {
        test('dispatches LOGOUT_SUCCESS when it returns a resolved promise (no payload)', () => {
            let logoutSpy = jest.fn(() => {
                return Promise.resolve()
            })

            firebase.logout = logoutSpy

            const expectedActions = [
                { type: 'LOGOUT_SUCCESS' }
            ]

            return store.dispatch(actions.logoutOfFirebase())
                .then(() => {
                    expect(logoutSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches LOGOUT_ERROR when it returns a rejected promise', () => {
            let logoutSpy = jest.fn(() => {
                return Promise.reject(Error('failed to logout'))
            })

            firebase.logout = logoutSpy

            const expectedActions = [
                { type: 'LOGOUT_ERROR', error: Error('failed to logout') }
            ]

            return store.dispatch(actions.logoutOfFirebase())
                .then(() => {
                    expect(logoutSpy).toHaveBeenCalledWith()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})