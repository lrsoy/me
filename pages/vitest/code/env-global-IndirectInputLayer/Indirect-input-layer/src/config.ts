
import { readFileSync } from 'fs'
export const interlayer = (filePath: string) => {
  return readFileSync(filePath, { encoding: 'utf-8' })
}