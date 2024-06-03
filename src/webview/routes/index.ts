import * as block from '../controllers/block'
import * as generate from '../controllers/generate'
export const routes: Record<string, any> = {
  createBlockTemplate: block.createBlock,
  genCodeByBlockMaterial: generate.genCodeByBlockMaterial,
}
