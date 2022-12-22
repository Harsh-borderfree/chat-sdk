import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'regenerator-runtime/runtime'

import BfreeChat from './BfreeChat/BfreeChat'

class BfreeChatComponentsClass {
  constructor(options) {
    console.log('Props to ChatComponent', options)
    this.options = options
  }

  mount(divName) {
    render(
      <Provider store={props?.store}>
        <BfreeChat {...props} />
      </Provider>,
      document.querySelector(divName)
    )
    return this
  }
}

function BfreeChatComponents(props) {
  console.log('Props to ChatComponent', props)
  return (
    <Provider store={props?.store}>
      <BfreeChat {...props} />
    </Provider>
  )
}

export default { BfreeChatComponents, BfreeChatComponentsClass }
