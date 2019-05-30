import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './App'
import store, { history } from './store'
import React from 'react'
import ReactDOM from 'react-dom'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('react-root')
  )
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}
