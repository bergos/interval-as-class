const { strictEqual } = require('assert')
const { describe, it } = require('mocha')
const delay = require('promise-the-world/delay.js')
const Interval = require('../index.js')

describe('simple-interval', () => {
  it('should be a constructor', () => {
    strictEqual(typeof Interval, 'function')
  })

  it('should run the given function in the given time interval', async () => {
    let count = 0

    const interval = new Interval(() => {
      count++
    }, 10)

    await delay(15)
    interval.stop()

    strictEqual(count, 2)
  })

  it('should align the runs if the aligned argument is true', async () => {
    const timestamps = []

    const interval = new Interval(() => {
      timestamps.push(Date.now())
    }, 20, { aligned: true })

    await delay(100)
    interval.stop()

    for (const timestamp of timestamps) {
      strictEqual(Math.abs(timestamp % 20) < 3, true)
    }
  })

  describe('start', () => {
    it('should be a method', () => {
      const interval = new Interval(() => {}, 100, { start: false })

      strictEqual(typeof interval.start, 'function')
    })
  })

  describe('stop', () => {
    it('should be a method', () => {
      const interval = new Interval(() => {}, 100, { start: false })

      strictEqual(typeof interval.stop, 'function')
    })
  })
})
