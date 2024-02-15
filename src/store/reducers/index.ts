import {combineReducers} from 'redux'
import {Reducer} from './reduser'

export const rootReducer = combineReducers({
	user: Reducer,
})

export type RootState = ReturnType<typeof rootReducer>
