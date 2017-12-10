import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../../../src/js/actions-and-reducers/programs/programs-action-creators.js'
import * as firebase from '../../../src/js/firebase.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('program-actions', () => {
    let uid
    let programId
    let store

    beforeEach(() => {
        firebase.db.ref = jest.fn()

        store = mockStore({
            titles: [],
            current: {}
        })

        uid = 'uid1234'
        programId = 'programId1234'
    })

    test('saveNewProgram creates a new program in firebase', () => {
        firebase.createProgram = jest.fn()

        firebase.createProgram.mockReturnValue(Promise.resolve())

        const newProgram = {
            title: 'program title',
            foo: 'foo',
            bar: ['bar']
        }

        return store.dispatch(actions.saveNewProgram({programData: newProgram}))
            .then(() => {
                expect(firebase.createProgram).toHaveBeenCalledWith(newProgram)
                expect(store.getActions()).toEqual([{ type: 'SAVE_NEW_PROGRAM_SUCCESS' }])
            })
    })

    describe('updateProgram', () => {
        let updateSpy
        let data
        let dbLocation

        beforeEach(() => {
            updateSpy = jest.fn()

            firebase.db.ref.mockReturnValue({ update: updateSpy })

            data = ['data']
        })

        test('returns a null action type id no uid', () => {
            uid = undefined

            const expectedActions = [
                { type: null }
            ]

            return store.dispatch(actions.updateProgram({uid}))
                .then(() => {
                    expect(firebase.db.ref).not.toHaveBeenCalled()
                    expect(updateSpy).not.toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('updates firebase with the program data (without dbLocation)', () => {
            const expectedRefString = `users/${uid}/programs/${programId}${(dbLocation) ? '/' + dbLocation : ''}`

            const expectedActions = [
                { type: 'UPDATE_PROGRAM_SUCCESS' }
            ]

            return store.dispatch(actions.updateProgram({uid, programId, location: dbLocation, data}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                    expect(updateSpy).toHaveBeenCalledWith(data)
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('updates firebase with the program data (with dbLocation)', () => {
            dbLocation = 'subDirectoryName'
            const expectedRefString = `users/${uid}/programs/${programId}${(dbLocation) ? '/' + dbLocation : ''}`

            const expectedActions = [
                { type: 'UPDATE_PROGRAM_SUCCESS' }
            ]
            
            return store.dispatch(actions.updateProgram({uid, programId, location: dbLocation, data}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                    expect(updateSpy).toHaveBeenCalledWith(data)
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('setProgramValue', () => {
        let setSpy
        let dbLocation
        let value

        beforeEach(() => {
            setSpy = jest.fn()

            firebase.db.ref = jest.fn()
            firebase.db.ref.mockReturnValue({ set: setSpy })

            value = 'foo'
        })

        test('returns a null action type id no uid', () => {
            uid = undefined

            const expectedActions = [
                { type: null }
            ]

            return store.dispatch(actions.setProgramValue({uid}))
                .then(() => {
                    expect(firebase.db.ref).not.toHaveBeenCalled()
                    expect(setSpy).not.toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('updates firebase with the program data', () => {
            dbLocation = 'subDirectoryName'
            
            const expectedRefString = `users/${uid}/programs/${programId}/${dbLocation}`

            const expectedActions = [
                { type: 'SET_PROGRAM_VALUE_SUCCESS' }
            ]

            return store.dispatch(actions.setProgramValue({uid, programId, location: dbLocation, value}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                    expect(setSpy).toHaveBeenCalledWith(value)
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    test('nullifyCurrentProgram', () => {
        const expectedActions = [
            { type: 'NULLIFY_CURRENT_PROGRAM_SUCCESS' }
        ]

        return store.dispatch(actions.nullifyCurrentProgram())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    describe('setCurrentProgram', () => {
        let onceSpy
        let setSpy
        let snapshot
        let program
        let expectedActions

        beforeEach(() => {
            program = {
                title: 'program title',
                foo: 'foo',
                bar: ['bar']
            }

            snapshot = {
                val: () => program
            }

            setSpy = jest.fn()
            onceSpy = jest.fn((string, callback) => {
                callback(snapshot)
            })

            firebase.db.ref.mockReturnValue({
                set: setSpy,
                once: onceSpy
            })

            expectedActions = [
                {
                    type: 'GET_ONE_PROGRAM_SUCCESS',
                    payload: {
                        ...program,
                        id: programId
                    }
                }
            ]
        })

        test('gets a program from the db and then dispatches program if uid is falsy', () => {
            uid = undefined

            const expectedRefString = `programs/${programId}`

            return store.dispatch(actions.setCurrentProgram({uid, programId}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                    expect(onceSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('saves program to the user and then dispatches program if it is truthy', () => {
            const expectedRefString = `users/${uid}/programs/${programId}`

            return store.dispatch(actions.setCurrentProgram({uid, programId}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                    expect(onceSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('saves program to the user and then dispatches program if it is truthy', () => {
            const expectedRefString = `users/${uid}/programs/${programId}`

            snapshot = {
                val: () => null
            }

            expectedActions = [
                {
                    type: 'GET_ONE_PROGRAM_SUCCESS',
                    payload: {
                        id: programId
                    }
                },
                {
                    type: 'GET_ONE_PROGRAM_SUCCESS',
                    payload: {
                        ...program,
                        id: programId
                    }
                }
            ]

            return store.dispatch(actions.setCurrentProgram({uid, programId}))
                .then(() => {
                    snapshot = {
                        val: () => program
                    }

                    return store.dispatch(actions.setCurrentProgram({uid, programId}))
                        .then(() => {
                            expect(firebase.db.ref).toHaveBeenCalledWith(expectedRefString)
                            expect(onceSpy).toHaveBeenCalled()
                            expect(store.getActions()).toEqual(expectedActions)
                        })
                })
        })
    })

    describe('getProgramTitles', () => {
        let onceSpy
        let snapshot
        let programTitles
        let expectedActions

        beforeEach(() => {
            programTitles = ['title 1', 'title 2', 'title 3']

            snapshot = {
                val: () => programTitles
            }

            onceSpy = jest.fn((string, callback) => {
                callback(snapshot)
            })

            firebase.db.ref.mockReturnValue({
                once: onceSpy
            })

            expectedActions = [
                {
                    type: 'GET_PROGRAM_TITLES_SUCCESS',
                    payload: {...programTitles}
                }
            ]
        })

        test('dispatches null if no snapshot value', () => {
            snapshot = {
                val: () => null
            }

            expectedActions = [{ type: null }]
            
            return store.dispatch(actions.getProgramTitles())
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith('programs')
                    expect(onceSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches null if no snapshot value', () => {
            return store.dispatch(actions.getProgramTitles())
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith('programs')
                    expect(onceSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('listenForCurrentProgramEdit', () => {
        let onSpy
        let snapshot
        let program
        let expectedActions

        beforeEach(() => {
            program = {
                title: 'program title',
                foo: 'foo',
                bar: ['bar']
            }

            snapshot = {
                val: () => program
            }

            onSpy = jest.fn((string, callback) => {
                callback(snapshot)
            })

            firebase.db.ref.mockReturnValue({
                on: onSpy
            })

            expectedActions = [
                {
                    type: 'GET_ONE_PROGRAM_SUCCESS',
                    payload: {
                        ...program, id: programId
                    }
                }
            ]
        })

        test('dispatches GET_ONE_PROGRAM_SUCCESS with program', () => {
            return store.dispatch(actions.listenForCurrentProgramEdit({uid, programId}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(`users/${uid}/programs/${programId}`)
                    expect(onSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches null if uid is falsy', () => {
            uid = undefined

            expectedActions = [{ type: null }]
            
            return store.dispatch(actions.listenForCurrentProgramEdit({uid, programId}))
                .then(() => {
                    expect(firebase.db.ref).not.toHaveBeenCalled()
                    expect(onSpy).not.toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches null if no snapshot value', () => {
            snapshot = {
                val: () => null
            }

            expectedActions = [{ type: null }]

            return store.dispatch(actions.listenForCurrentProgramEdit({uid, programId}))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(`users/${uid}/programs/${programId}`)
                    expect(onSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('stopListeningToCurrentProgram', () => {
        let offSpy
        let expectedActions

        beforeEach(() => {

            offSpy = jest.fn()

            firebase.db.ref.mockReturnValue({
                off: offSpy
            })

            expectedActions = [
                {
                    type: 'NULLIFY_CURRENT_PROGRAM_SUCCESS'
                }
            ]
        })

        test('dispatches null if uid is falsy', () => {
            uid = undefined

            expectedActions = [{ type: null }]

            return store.dispatch(actions.stopListeningToCurrentProgram({ uid }))
                .then(() => {
                    expect(firebase.db.ref).not.toHaveBeenCalled()
                    expect(offSpy).not.toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        test('dispatches NULLIFY_CURRENT_PROGRAM_SUCCESS', () => {
            return store.dispatch(actions.stopListeningToCurrentProgram({ uid }))
                .then(() => {
                    expect(firebase.db.ref).toHaveBeenCalledWith(`users/${uid}/programs`)
                    expect(offSpy).toHaveBeenCalled()
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})