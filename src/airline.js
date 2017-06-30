import Capture from './capture'

export default class {
  constructor(Client) {
    const { DOM, Emulation, Page } = Client

    this.Page = Page
    this.DOM = DOM
    this.Emulation = Emulation
    this.Capture = new Capture(Page)
  }

  async navigate(url) {
    const Page = this.Page
    const DOM = this.DOM
    const Emulation = this.Emulation

    await Page.navigate({ url })
    await Page.loadEventFired()

    const { root: { nodeId: documentNodeId } } = await DOM.getDocument()
    const { nodeId: bodyNodeId } = await DOM.querySelector({
      selector: 'body',
      nodeId: documentNodeId,
    })
    const { model: { height } } = await DOM.getBoxModel({ nodeId: bodyNodeId })

    await Emulation.setVisibleSize({ width: 1440, height: height })
    await Emulation.forceViewport({ x: 0, y: 0, scale: 1 })
  }
}
