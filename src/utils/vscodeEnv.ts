import * as path from 'path'
import { workspace } from 'vscode'
export const rootPath = path.join(workspace.rootPath || '')
export const snippetMaterialsPath = path.join(
  rootPath,
  'materials',
  'snippets',
  'axios-template',
)
export const materialsPath = path.join(rootPath, 'materials')
