import { it, expect, vi } from 'vitest'
import { sendEmail, Recipient, Message } from './testStand'

it('dummy 哑元素 占位符 解决类型错误问题', () => {

  const message: Message = {
    subject: '测试',
    body: '测试',
  }
  const dummyRecipient = {} as Recipient
  const n = sendEmail(message, dummyRecipient)

})