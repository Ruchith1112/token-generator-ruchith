import React from 'react'
import TokenGenerator from './components/TokenGenerator'
import { TokenGeneratorProvider } from './components/TokenGeneratorContext'

function App() {
  return (
    <TokenGeneratorProvider>
    <TokenGenerator />
    </TokenGeneratorProvider>
  )
}

export default App