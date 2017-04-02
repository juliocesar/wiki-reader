// App boot file
// =============

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import Store, { bindEvents } from './components/store'

import './stylesheets/reset.css'
import './stylesheets/top-wrappers.scss'
import './stylesheets/icons.css'

bindEvents()

ReactDOM.render(
  <App store={Store} />,
  document.querySelector('.root')
)
