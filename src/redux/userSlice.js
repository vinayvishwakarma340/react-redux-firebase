import { createSlice } from '@reduxjs/toolkit'

const isValid = localStorage.getItem("isValid")
const initialState = {
    name:"vinay",
    age:23,
    designation:"software developer",
    isValid:isValid
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAge : (state,actions)=>{
       localStorage.setItem("isValid",true)
    return {...state,age:actions.payload.age,isValid:true}
    }
  },
})
// Action creators are generated for each case reducer function
export const { getAge } = userSlice.actions

export default userSlice.reducer