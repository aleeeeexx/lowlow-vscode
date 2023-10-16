import * as path from 'path'
import * as fs from 'fs'
import { snippetMaterialsPath } from './vscodeEnv'
import { getFileContent } from './file'
/**
 * 获取 codeTemplate 目录下ejs文件作为代码模板并且合并代码片段 (兼容以前旧代码)
 *
 * @export
 * @returns
 */

export const getLocalApiTemplate = () => {
  let materials: {
    path: string
    name: string
    model: {}
    schema: {}
    template: string
    privateMaterials?: boolean
  }[] = []
  try {
    return getFileContent(path.join(snippetMaterialsPath, 'template.ejs'), true)
  } catch {
    return ''
  }
}
