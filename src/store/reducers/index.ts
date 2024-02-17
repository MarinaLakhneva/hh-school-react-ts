import {combineReducers} from 'redux'
import {Reducer} from '../reducers/reducer'

export const rootReducer = combineReducers({
	user: Reducer,
})

export type RootState = ReturnType<typeof rootReducer>
