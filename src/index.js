// App boot file
// =============

import './stylesheets/reset.css'
import './stylesheets/top-wrappers.scss'
import './stylesheets/icons.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import Store, { bindEvents } from './components/store'
import { emit } from './components/event-bus'

bindEvents()

ReactDOM.render(
  <App store={Store} />,
  document.querySelector('.root')
)

emit('app:boot')
