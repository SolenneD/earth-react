import mock from '../../mock/mock.json'
import actionsType from './actions-type'

/**
 * Format satellites
 * @param {Array} satellites
 * @return {Array} satellitesFormatted
 */

const formatterData = eventDataSat => (
  eventDataSat.map((satellite) => {
    const dataSat = satellite.TLE_LINE2
      .split(' ')
      .filter(item => (!item ? null : item))

    return {
      id: dataSat[1],
      r: dataSat[3] / 70,
      x: dataSat[2],
      y: dataSat[5],
      z: dataSat[7],
      event: true
    }
  })
)

// const getLastData = eventDataSat => (
//   axios.get('////').then(() => {
//   })
// )

export const getSatellites = () => ({
  type: actionsType.GET_ALL_SAT,
  data: formatterData(mock)
})
