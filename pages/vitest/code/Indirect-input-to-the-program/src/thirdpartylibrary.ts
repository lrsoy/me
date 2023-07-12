import axios from 'axios'

export const questSentences = async () => {
  const res = await axios({
    method: 'get',
    url: 'https://api.apiopen.top/api/sentences'
  })
  if (res.data.code === 200) {
    return true
  }
  return false
}