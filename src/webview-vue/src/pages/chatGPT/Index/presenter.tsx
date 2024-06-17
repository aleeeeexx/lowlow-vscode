import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useModel } from './model'
import Service from './service'
import { promotes } from './promots'
export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)
  const route = useRoute()

  // 发送消息
  const sendMessage = (content: string) => {
    model.messageList.value.push({
      content,
      role: 'user',
      time: new Date().toLocaleString(),
    })
    service.askQuestion()
    model.userInput.value = ''
  }

  // 回车发送
  const sendMessageEnter = () => {
    if (model.userInput.value && model.canSubmit.value) {
      sendMessage(model.userInput.value)
    }
  }

  watch(
    () => route.query?.gptType,
    () => {
      if (route.query.gptType && route.query?.selectedText && model.canSubmit.value) {
        const gptType = String(route.query.gptType)
        console.log(route.query, 'query')
        // @ts-ignore
        const promot = promotes[gptType](route.query?.selectedText)
        console.log(promot, 'promot')
        sendMessage(promot)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    model,
    service,
    sendMessageEnter,
    sendMessage,
  }
}
