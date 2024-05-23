import * as path from 'path'
import { workspace } from 'vscode'
import { getSyncFolder } from './config'

export const rootPath = path.join(workspace.rootPath || '')
export const snippetMaterialsPath = path.join(rootPath, 'materials', 'snippets', 'axios-template')
export const materialsPath = path.join(rootPath, 'materials')
export const tempWorkPath = path.join(rootPath, '.lowcode')
export const blockMaterialsPath = path.join(rootPath, 'materials', 'blocks')

export const getPrivateSnippetMaterialsPath = () => {
  const syncFolder = getSyncFolder()
  if (!syncFolder) {
    return ''
  }
  return path.join(syncFolder, 'materials', 'snippets')
}

export const getPrivateBlockMaterialsPath = () => {
  const syncFolder = getSyncFolder()
  if (!syncFolder) {
    return ''
  }
  return path.join(syncFolder, 'materials', 'blocks')
}

export const getEnv = () => ({
  rootPath,
  tempWorkPath,
  materialsPath,
  blockMaterialsPath,
  snippetMaterialsPath,
})
