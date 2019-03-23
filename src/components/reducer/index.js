import { fromJS } from 'immutable'
import initialState from './initial-state'
import actionsType from '../actions/actions-type'

const getSatellite = (state, action) => (
  fromJS(state)
    .setIn(['data'], action.data)
    .toJS()
)

const satellites = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.GET_ALL_SAT:
      return getSatellite(state, action)
    default:
      return state
  }
}

export default satellites
