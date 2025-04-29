import React from 'react'

const Martix = ({ matrixData, setMatrixData, disabled=true }) => {

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
                      type="text"
                      defaultValue={val === 0 ? '' : val}
                      disabled={disabled}
                      style={{ width: '40px', height: '40px', textAlign: 'center' }}
                      className="bg-gray-100/50 text-white border rounded-md focus:outline-none disabled:text-red-400"
                      onInput={(e) => {
                        let value = e.target.value;
                        if (!/^[1-9]$/.test(value)) {
                          e.target.value = value.slice(0, 1).replace(/[^1-9]/g, '');
                          value = '';
                        } else {
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