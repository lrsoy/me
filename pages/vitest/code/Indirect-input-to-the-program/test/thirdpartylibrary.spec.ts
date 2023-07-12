import { describe, it, expect, vi } from 'vitest'
import { questSentences } from '../src/thirdpartylibrary'
import axios from 'axios'

vi.mock('axios')
describe('第三方库测试', () => {

  it('测试请求图片接口 axios', async () => {
    // 准备数据
    vi.mocked(axios).mockResolvedValue({ data: { code: 200 } })
    // 调用
    const r = await questSentences()

    // 验证
    expect(r).toBeTruthy()

  })

})