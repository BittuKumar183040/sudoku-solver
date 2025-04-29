import React from 'react'
import Solver from './Solver'
import matrixInitial from './data/tempelate.json'
import { useState } from 'react';
import Custom from './components/Custom';
import Title from './components/Title';

const App = () => {
  const [showCustom, setShowCustom] = useState(false);
  const [sudoku, setSudoku] = useState(null)

  const renderGrid = (matrix, disabled=true) => (
    <div className="grid grid-cols-9 gap-[1px] bg-gray-400 p-1 rounded-md">

      {matrix.map((arr, idx) => (
        arr.map((val, idx) => (
          <input
            key={idx}
            type="text"
            disabled={disabled}
            value={val}
            maxLength="1"
            style={{pointerEvents:disabled ? "none" : "auto"}}
            className="size-5 lg:size-8 text-xs text-center text-gray-500 lg:text-xl font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))
      ))}
    </div>
  );
  
  const onBack = () => {
    setShowCustom(false)
  }

  return (
    <section className="min-h-screen space-y-10 flex flex-col items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 p-6">
      <Title />
      {sudoku ? <Solver matrixInitial={sudoku} onBack={()=>setSudoku(null)} /> :
      <>
        <div className=" select-none flex flex-wrap gap-6 justify-center">
          {matrixInitial.map((matrix, idx) => (
            <button
              key={idx}
              onClick={()=>setSudoku(matrix)}
              className=" cursor-pointer bg-white/20 opacity-70 backdrop-blur-md p-2 rounded-2xl shadow-2xl hover:shadow hover:opacity-100 transition-all duration-300"
            >
              {renderGrid(matrix)}
            </button>
          ))}
        </div>
        <div className=' flex gap-10 '>
          <button onClick={()=>setShowCustom(!showCustom)} className=' cursor-pointer active:scale-95 active:shadow transition-all rounded-md border border-gray-200 shadow-md bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400'>
            <p className=' p-1.5 px-7 font-semibold text-white'>Open Sudoku Builder</p>
          </button>
        </div>
      </>
      }
      {showCustom && <Custom onBack={onBack}/>}
      
      
    </section>
  )
}

export default App