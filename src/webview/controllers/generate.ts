import { genCodeByBlock } from '../../utils/generate'
import { IMessage } from '../type'

export const genCodeByBlockMaterial = async (
  message: IMessage<{
    material: string
    model: object
    path: string
    createPath: string[]
    privateMaterials?: boolean
  }>
) => {
  await genCodeByBlock(message.data)
  return '生成成功'
}
