import React from 'react'
import Martix from './Martix'
import { useEffect, useState } from 'react';
import GUI from 'lil-gui';

const initialMatrix = [
  [0, 1, 7, 6, 0, 0, 0, 3, 4],
  [2, 8, 9, 0, 0, 4, 0, 0, 0],
  [3, 4, 6, 2, 0, 5, 0, 9, 0],
  [6, 0, 2, 0, 0, 0, 0, 1, 0],
  [0, 3, 8, 0, 0, 6, 0, 4, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 7, 8],
  [7, 0, 3, 4, 0, 0, 5, 6, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const config = {
  timer: 10
}

function App() {

  const [matrixData, setMatrixData] = useState(initialMatrix);
  const gui = new GUI();

  gui.add(config, "timer", 0, 100, 10).name("Timer (ms)").onChange(value => {
    config.timer = Math.max(0, Math.floor(value));
  });

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

  const solveSudoku = async (rawBoard) => {
    let board = rawBoard;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (
              rowCheck(board, row, num) &&
              colCheck(board, col, num) &&
              boxCheck(board, row - (row % 3), col - (col % 3), num)
            ) {
              board[row][col] = num;
              setMatrixData([...board]);
              await new Promise(resolve => setTimeout(resolve, config.timer));

              if (await solveSudoku(board)) return true;
              board[row][col] = 0;

              setMatrixData([...board]);
              await new Promise(resolve => setTimeout(resolve, config.timer));
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolveBtn = () => {
    solveSudoku([...matrixData]);
  }

  return (
    <div className='bg-slate-900 space-y-2 text-white h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Sudoku Solver</h1>
      <p className='text-xs font-semibold'>A simple sudoku solver using backtracking algorithm</p>
      <p className='text-xs font-semibold'>Made with React and Tailwind CSS</p>
      <Martix matrixData={matrixData} setMatrixData={setMatrixData} />
      <button onClick={handleSolveBtn} className=' active:scale-95 mt-4 cursor-pointer flex items-center space-x-2 p-2 px-6 bg-slate-800 rounded-md hover:bg-slate-700 transition-all duration-200'>
        <img src='/solve.svg' alt='solve' className='w-4 h-4 pointer-events-none' />
        <p>SOLVE</p>
      </button>
    </div>
  )
}

export default App
