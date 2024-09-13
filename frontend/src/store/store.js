import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './features/todoSlice';
import monthSlice from './features/monthSlice';

const store = configureStore({
    reducer: {
        todo: todoSlice,
        month: monthSlice,
    }
})

console.log(store.getState());


export default store;