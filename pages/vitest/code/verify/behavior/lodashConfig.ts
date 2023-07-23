import { difference } from 'lodash'

export const arrDifference = (arr1: Array<number>, arr2: Array<number>) => {
  difference(arr1, arr2)
}