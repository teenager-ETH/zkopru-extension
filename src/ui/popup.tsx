import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, TransferPage, UnlockPage, OnboardingPage } from './pages'
import {
  GetBalanceResponseMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage
} from '../message'
import { useStore } from './store'
import { fromWei } from '../utils'
import { ROUTES } from '../constants'
import { globalStyle } from './globalStyle'

// Popup component responsible for
// - Initialize global state of UI
// - Routings
const Popup = () => {
  // TODO: dispatch initialization action
  // TODO: move to subscribe messages hook and call from Popup component
  const { setAddress, setBalance } = useStore()
  useEffect(() => {
    // initialization
    async function messageHandler(message: UntypedMessage) {
      if (GetAddressResponseMessageCreator.match(message)) {
        setAddress(message.payload.address)
      } else if (GetBalanceResponseMessageCreator.match(message)) {
        // e.g. store.dispatch(SOME_ACTION(message.balance))
        setBalance(fromWei(message.payload.balance))
      }
    }

    browser.runtime.onMessage.addListener(messageHandler)
  }, [])

  return (
    <div className={globalStyle}>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.UNLOCK} element={<UnlockPage />} />
          <Route path={ROUTES.TRANSFER} element={<TransferPage />} />
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
        </Routes>
      </Router>
    </div>
  )
}

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
