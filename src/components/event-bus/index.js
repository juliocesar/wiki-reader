// Global event bus
// ================

import Emitter from 'tiny-emitter'

const bus = new Emitter()

export function on(events, callback) {
  return events.split(/\s+/).map(name => {
    bus.on(name, callback)
  })
}

export function off(events, callback) {
  return events.split(/\s+/).map(name => {
    bus.off(name, callback)
  })
}

export function emit() {
  return bus.emit(...arguments)
}
