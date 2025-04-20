import React from 'react'
import Martix from './Martix'
import { useEffect, useState } from 'react';

function App() {

  const [matrixData, setMatrixData] = useState([
    [0, 8, 1, 2, 7, 0, 9, 0, 4],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [3, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 2, 4, 1, 9, 0, 0, 2],
    [0, 5, 0, 0, 8, 0, 0, 7, 9]
  ]);

  const rowCheck = (matrix, row, num) => {
    let isValid = true;
    matrix[row].forEach((val) => {
      if (val === num) {
        isValid = false
      }
    })
    return isValid;
  }

  const colCheck = (matrix, col, num) => {
    let isValid = true;
    matrix.forEach((arr) => {
      if (arr[col] === num) {
        isValid = false
      }
    })
    return isValid;
  }

  const boxCheck = (matrix, row, col, num) => {
    let isValid = true;
    matrix.forEach((arr, rowIndex) => {
      arr.forEach((val, colIndex) => {
        if (rowIndex >= row && rowIndex < row + 3 && colIndex >= col && colIndex < col + 3) {
          if (val === num) {
            isValid = false
          }
        }
      })
    })
    return isValid;
  }

  useEffect(() => {
    const row = 0
    const col = 0
    const num = 1
    let isValid = []
    isValid.push(rowCheck(matrixData, row, num))
    isValid.push(colCheck(matrixData, col, num))
    isValid.push(boxCheck(matrixData, row, col, num))
    const allValid = isValid.every((val) => val === true);
    console.log('All checks passed:', allValid);
  }, [])


  return (
    <div className='bg-slate-900 space-y-2 text-white h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Sudoku Solver</h1>
      <p className='text-xs font-semibold'>A simple sudoku solver using backtracking algorithm</p>
      <p className='text-xs font-semibold'>Made with React and Tailwind CSS</p>
      <Martix matrixData={matrixData} setMatrixData={setMatrixData} />
    </div>
  )
}

export default App
