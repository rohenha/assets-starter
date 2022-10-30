import { module as mmodule } from 'modujs'

export default class Menu extends mmodule {
  constructor(m) {
    super(m)
    this.state = false
    this.events = {}
  }
}
