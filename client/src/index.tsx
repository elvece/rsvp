import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import * as serviceWorker from './serviceWorker'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import JssProvider from 'react-jss/lib/JssProvider'
import './index.css'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')
})
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#be2929'
    },
    secondary: {
      main: '#da4545'
    }
  }
})
ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <App />
      </JssProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
