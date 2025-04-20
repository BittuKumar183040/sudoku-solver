import React from 'react'
import { useState } from 'react'

const Martix = ({ matrixData, setMatrixData }) => {

  const handleMatrixChange = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrixData]
    newMatrix[rowIndex][colIndex] = value
    setMatrixData(newMatrix)
  }

  return (
    <div className=' mt-4'>
      <table>
        <tbody>
          {matrixData.map((arr, rowIndex) => (
            <tr key={arr + "" + rowIndex}>
              {
                arr.map((val, colIndex) => (
                  <td key={val + "" + colIndex}>
                    <input
                      type='text'
                      defaultValue={val === 0 ? '' : val}
                      disabled={val !== 0}
                      style={{ width: '40px', height: '40px', textAlign: 'center' }}
                      className='bg-gray-900 text-white border rounded-md focus:outline-none 
                     disabled:text-red-400 disabled:'
                      onInput={(e) => {
                        const value = e.target.value;
                        if (!/^[1-9]$/.test(value)) {
                          e.target.value = value.slice(0, 1).replace(/[^1-9]/g, '');
                          handleMatrixChange(rowIndex, colIndex, parseInt(e.target.value));
                        }
                      }}
                    />
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Martix