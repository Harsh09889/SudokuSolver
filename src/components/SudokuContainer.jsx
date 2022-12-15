import React, { useState,useEffect } from 'react'
import { Button, Stack } from 'react-bootstrap';
import { NumberContainer } from './NumberContainer';
import "./SudokuContainer.css"

const initial = [
    [0, 5, 0, 9, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 4, 0, 3, 0, 7],
    [0, 0, 0, 2, 8, 0, 1, 9, 0],
    [5, 3, 8, 6, 0, 7, 9, 4, 0],
    [0, 2, 0, 3, 0, 1, 0, 0, 0],
    [1, 0, 9, 8, 0, 4, 6, 2, 3],
    [9, 0, 7, 4, 0, 0, 0, 0, 0],
    [0, 4, 5, 0, 0, 0, 2, 0, 9],
    [0, 0, 0, 0, 3, 0, 0, 7, 0],
]

export const SudokuContainer = () => {

    // How to get the deep copy of the array
    const getDeepCopy = (whatever) => {
        return JSON.parse(JSON.stringify(whatever))
    }
    
    // initial state of the whole array to be followed throughout
    const [array, setArray] = useState(getDeepCopy(initial));

    // To check is the position is valid or not


    function isValid(array,row, col, value) {
        // console.log(array[row,col]);
        if ((validateColumn(array,row, col, value)) || (validateRow(array, row, col, value)) || (validateBox(array, row, col, value))) {
            return false;
        } else {
            return true;
        }
    }

    function validateBox(array,row, col, value) {
        row = Math.floor(row / 3) * 3;
        col = Math.floor(col / 3) * 3;
        var isFound = false;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (array[row + i][col + j] == parseInt(value)) isFound = true;
            }
        }
        return isFound;
    }

    function validateRow(array, row, col, value) {
        var isFound = false;
        for (var i = 0; i < 9; i++) {
            if (array[row][i] === parseInt(value)) isFound = true;
        }
        return isFound;
    }

    function validateColumn(array, row, col, value) {
        var isFound = false;
        for (var i = 0; i < 9; i++) {
            if (array[i][col] === parseInt(value)) isFound = true;
        }
        return isFound;
    }

    // const displayBoard = (array) => {
    //     let text = ''
    //     for (let i = 0; i < array.length; i++) {
    //         for (let j = 0; j < array[i].length; j++) {
    //             text += array[i][j] + ' ';
    //         }
    //         console.log(text);
    //         text = '';
    //     }
    // }

    
    const driverFunction = () => {
        var ans = new Array()
        let sudoku = getDeepCopy(initial)
        solveSudoku(sudoku,ans)
        setArray(ans)
        // console.log(ans)
    }

    const solveSudoku = ( arr,answer , row=0, col=0) => {
        
        if (row === 9) {
            
            for (let i = 0; i < array.length; i++) {
                let internal = new Array();
                for (let j = 0; j < array[i].length; j++) {
                    internal.push(arr[i][j])
                }
                answer.push(internal);
            }
            // answer = getDeepCopy(ans);
            // console.log(answer);
            return 
            // console.log(ans);
        }

        let nextRow = 0;
        let nextCol = 0;
    
        if (col === 8) {
            nextRow = row + 1;
            nextCol = 0;
        } else {
            nextRow = row;
            nextCol = col + 1;
        }
    
        if (arr[row][col] !== 0){
            solveSudoku(arr, answer ,nextRow, nextCol);
        } 
        else {
            for (var value = 1; value < 10; value++) {
                
                if (isValid(arr,row, col, value)) {
                    arr[row][col] = value;
                    solveSudoku(arr, answer ,nextRow, nextCol);
                    arr[row][col] = 0;
                }
            }
            
        }
        
        return answer;
    
    }

    console.log(array)

    const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIdx) => {

        return (
            <Stack key={rIdx} direction="horizontal">
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIdx) => (
                        <NumberContainer 
                        key={cIdx} 
                        val={array[row][col]} 
                        row={row} 
                        col={col} />
                    ))
                }
            </Stack>
        )
    })

    return (
        <>

            {cells}
            <Button onClick={driverFunction}>Solve Sudoku</Button>
            
        </>
    )

}
