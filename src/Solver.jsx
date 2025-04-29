import React, {useRef, useState} from 'react'
import Martix from './components/Martix'
import GUI from 'lil-gui';
import { Loader } from 'lucide-react';
import { PackageCheck } from 'lucide-react';
import { ListRestart } from 'lucide-react';
import { useEffect } from 'react';
import { ArrowLeftSquare } from 'lucide-react';

const config = {
  timer: 10
}

const Solver= ({ matrixInitial, onBack })=> {
  const [matrixData, setMatrixData] = useState(matrixInitial.map(row=>[...row]));
  const [status, setStatus] = useState(0)
  const terminate = useRef(false)


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
              terminate.current === false &&
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
    setStatus(2)
    return true;
  };

  useEffect(()=>{
    const gui = new GUI();
    gui.title("Sudoku Visulization Controls");
    gui.domElement.querySelector('.title').style.color = '#000000';
    gui.domElement.querySelector('.title').style.background = '#ddd';
    gui.domElement.style.background = '#ffffff';
    gui.domElement.style.color = '#000000';
    gui.domElement.style.borderRadius = '5px';
    gui.add(config, "timer", 0, 100, 10).name("Solver Speed (ms)").onChange(value => {
      config.timer = Math.max(0, Math.floor(value));
    });
    return () => {gui.destroy()};
  },[])

  const handleSolveBtn = () => {
    terminate.current = false;
    setStatus(1)
    solveSudoku([...matrixData]);
  }

  const handleTerminate = () => {
    console.log("termination initaled")
    terminate.current = true;
    setMatrixData(matrixInitial);
    setStatus(0);
  }

  return (
    <div className='text-white flex flex-col items-center justify-center'>
      <div className=' w-full'>
        <button onClick={onBack} className=' -translate-x-1/2 cursor-pointer flex gap-2 text-gray-200 shadow-md justify-evenly bg-gray-800 opacity-90 rounded-md text-md items-center w-fit p-1 px-2 pl-1'>
          <ArrowLeftSquare/><span>Back</span>
        </button>
      </div>
      <Martix matrixData={matrixData} setMatrixData={setMatrixData} />
      <div className=' flex items-center gap-2 mt-4'>
        {status === 0 ?
          <button onClick={handleSolveBtn} className=' flex items-center justify-between pl-6 cursor-pointer active:scale-95 active:shadow transition-all rounded-md border border-gray-200 shadow-md bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400'>
            <img src='/solve.svg' alt='solve' className=' size-4 pointer-events-none' />
            <p className=' p-1.5 px-7 pl-4 font-semibold text-white'>Solve</p>
          </button>
        :
          <button onClick={handleTerminate} className=' flex items-center justify-between pl-6 cursor-pointer active:scale-95 active:shadow transition-all rounded-md border border-gray-200 shadow-md bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400'>
            <ListRestart />
            <p className=' p-1.5 px-7 pl-4 font-semibold text-white'>Stop</p>
          </button>
        }
        {status === 1 ? <Loader className=' animate-spin '/> : null}
        {status === 2 && <PackageCheck className=' animate-pulse' /> }
      </div>
    </div>
  )
}

export default Solver
