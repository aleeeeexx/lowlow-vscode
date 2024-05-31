import { Model } from './model'
import { request } from '../../connectVscode/index'
export default class Service {
  private model: Model

  constructor(model: Model) {
    this.model = model
  }
}
