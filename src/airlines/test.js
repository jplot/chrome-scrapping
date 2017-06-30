import Airline from '../airline'

export default class extends Airline {
  get URL() { return 'https://www.air-indemnite.com/fr' }

  async loadEventFired() {
    const Capture = this.Capture

    await Capture.image()
  }
}
