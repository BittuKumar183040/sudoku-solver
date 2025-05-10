import Title from './Title'
import { useState } from 'react'
import Solver from '../Solver'

const iniMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

const Custom = ({onBack}) => {

  const [matrix, setMatrix] = useState(iniMatrix);

  return (
    <div className=' absolute top-0 left-0 w-full min-h-screen space-y-10 flex flex-col items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 p-6'>
      <Title />
      <Solver matrixInitial={matrix} setMatrixInputData={setMatrix} onBack={onBack} disabled={false}/>
    </div>
  )
}

export default Custom