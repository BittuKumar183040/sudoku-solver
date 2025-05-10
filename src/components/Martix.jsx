import { useRef } from "react"

const Field = ({rowIndex, colIndex, val, disabled, handleMatrixChange}) => {
  const value = useRef(val);

  const appendValue = (e) => {
    
    if(disabled) return;
    if (value >= 9) {
      value.current = 0;
      return;
    }

    if (value === 0) {
      value.current = 1;
    } else {
      value.current = value.current + 1;
    }
    e.target.innerText = value.current
    handleMatrixChange(rowIndex, colIndex, value.current);
  }

  return (<td>
    <div
      style={{ width: '40px', height: '40px', textAlign: 'center' }}
      className={`bg-gray-100/50 flex items-center justify-center select-none border rounded-md focus:outline-none 
        ${disabled ? 'text-red-400 pointer-events-none' : ' text-white cursor-pointer'} `}
      onClick={appendValue}
      >{value.current === 0 ? '' : value.current}</div>
    </td>)
}

const Martix = ({ matrixData, setMatrixData, disabled = true }) => {

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
                arr.map((val, colIndex) => <Field 
                  key={val+''+colIndex} 
                  rowIndex={rowIndex} 
                  colIndex={colIndex} 
                  val={val} 
                  disabled={disabled}
                  handleMatrixChange={handleMatrixChange}
                  />)
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Martix