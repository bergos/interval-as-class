function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

class Interval {
  constructor (func, time, { aligned = false, offset = 0, start = true } = {}) {
    this.func = func
    this.time = time
    this.aligned = aligned
    this.offset = offset
    this.last = Date.now() - this.time
    this.running = false
    this.sleep = this.aligned ? this.sleepAligned : this.sleepNotAligned

    if (start) {
      this.start()
    }
  }

  start () {
    this.running = true

    this.next()
  }

  stop () {
    this.running = false
  }

  async sleepAligned () {
    await sleep(this.time - ((Date.now() - this.offset) % this.time))
  }

  async sleepNotAligned () {
    await sleep(Math.max(0, this.last + this.time - Date.now()))

    this.last = Date.now()
  }

  async next () {
    if (!this.running) {
      return
    }

    await this.sleep()

    try {
      await this.func()
    } catch (err) {}

    this.next()
  }
}

module.exports = Interval
