import Chrome from 'chrome-remote-interface'
import minimist from 'minimist'
import airlineTest from './airlines/test'

const argv = minimist(process.argv.slice(2))

const airlineName = argv.airline || 'test'
const airlines = {
  test: airlineTest
}

Chrome.New((err, target) => {
  if (err) {
    console.error('Cannot connect to browser:', err)
    return
  }

  Chrome({ target }, async Client => {
    const { DOM, Emulation, Network, Page } = Client

    // Network.requestWillBeSent(params => {
    //   console.log('Asset: ', params.request.url)
    // })

    await Page.enable()
    await DOM.enable()
    await Network.enable()

    await Emulation.setDeviceMetricsOverride({
      width: 1440,
      height: 900,
      deviceScaleFactor: 0,
      mobile: false,
      fitWindow: false,
    })

    const airline = await new airlines[airlineName](Client)

    await airline.navigate(airline.URL)
    await airline.loadEventFired()

    Client.close()
  })
})
