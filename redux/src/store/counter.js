import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {counter: 0, showCounter: true}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increament: (state) => {
            state.counter++
        },
        decreament: (state) => {
            state.counter--
        },
        increase: (state, action) => {
            state.counter = state.counter + action.payload.step
        },
        decrease: (state, action) => {
            state.counter = state.counter + action.payload.step
        },
        toggle: (state) => {
            state.showCounter = !state.showCounter
        }
    }
})

export const counterActions = counterSlice.actions;

export default counterSlice;