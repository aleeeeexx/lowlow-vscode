import * as fs from 'fs-extra'
import * as path from 'path'
import { workspace } from 'vscode'
import { rootPath } from './vscodeEnv'
import { getFileContent } from './file'

const defaultConfig: Config = {
  yapi: { projects: [] },
  mock: { mockKeyWordEqual: [], mockKeyWordLike: [] },
  commonlyUsedBlock: [],
}

export type Config = {
  yapi?: {
    domain?: string
    projects?: {
      name: string
      token: string
      domain: string
    }[]
  }
  mock?: {
    mockNumber?: string
    mockBoolean?: string
    mockString?: string
    mockKeyWordEqual?: {
      key: string
      value: string
    }[]
    mockKeyWordLike?: {
      key: string
      value: string
    }[]
  }
  commonlyUsedBlock?: string[]
}

export const getConfig: () => Config = () => {
  let config: Config
  if (fs.existsSync(path.join(rootPath, '.lowlowrc'))) {
    config = JSON.parse(getFileContent('.lowlowrc') || '{}')
    config.yapi?.projects?.forEach(s => {
      s.domain = s.domain || config.yapi?.domain || ''
    })
    console.log(config, '获取的配置')
  } else {
    config = getAllConfig()
  }
  return { ...defaultConfig, ...config }
}

// 从远程仓库获取所有的配置
const getAllConfig = () => {
  return {}
}
