// App boot file
// =============

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import Store from './components/store'

import './stylesheets/reset.css'
import './stylesheets/top-wrappers.scss'
import './stylesheets/icons.css'

ReactDOM.render(
  <App store={Store} />,
  document.querySelector('.root')
)
