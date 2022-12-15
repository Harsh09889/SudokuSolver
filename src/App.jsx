import { useState } from 'react'
import { Button,Container,Row,Col } from 'react-bootstrap';
import './App.css'
import { SudokuContainer } from './components/SudokuContainer';

function App() {

  return (
    <div className="App">
      <SudokuContainer />
      {/* <SudokuSolverAlgo /> */}
    </div>
  )
}

export default App
