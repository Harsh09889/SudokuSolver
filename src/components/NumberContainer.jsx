import {React,useState} from 'react'
import "./SudokuContainer.css"

export const NumberContainer = (props) => {


  return (

    <div className={!props.val ? `col border` : `col border bg-light`} > <h2>{props.val}</h2></div>

  )
}
