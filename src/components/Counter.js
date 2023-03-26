import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/counterSlice'
import { getAge } from '../redux/userSlice'

export function Counter() {
    const [personInfo,setPersonInfo] = useState({
        name:"man",
        age:"",
        designation:" developer",
    })
  const count = useSelector((state) => state.counterReducer.value)
  const {age,isValid} = useSelector((state) => state.userReducer)
  
  const dispatch = useDispatch()

  return (
    <div>
      <div>
<input onChange={(e)=>setPersonInfo({...personInfo,age:e.target.value})} value={personInfo.age}/>
      <button
          aria-label="Increment value"
          onClick={() => dispatch(getAge(personInfo))}
        >
          age : {age}
        </button>
        <p>{isValid ? "valid":"invalid"}</p>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}