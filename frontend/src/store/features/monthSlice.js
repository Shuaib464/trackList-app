import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// fetch month and days
export const fetchMonth = createAsyncThunk('month/fetchMonth', async () => {
    console.log('In fetch month slice func...')
    let response = await axios.get('https://tracklist-backend.onrender.com/api/v1/getMonth');
    console.log("fetchMonth (Month_slice) ",response.data.data);
    
    return response.data.data;
})

// fetch month and days by date
export const fetchMonthByDate = createAsyncThunk('month/fetchMonthByDate', async ({month, year}) => {
    console.log('In fetchMonthByDate slice func...', month)
    const params = {
        month: month,
        year: year,
    }
    let response = await axios.get('/api/v1/getMonthByDate', {
                                                params: params
                                            });
    console.log("fetchMonth (Month_slice) ",response.data.data);
    
    return response.data.data;
})

//define initial state
const initialState = {
    month:null,monthName:'',monthId:null, year:null, arrDays: [], loading:false, error:''
}

const monthSlice = createSlice({
    name: 'month',
    initialState,
    // reducers: {

    // },
    extraReducers:(builder) => {
        builder
            .addCase(fetchMonth.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchMonth.fulfilled, (state,action) => {
                state.loading = false
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 'November', 'December']
                state.monthName = months[action.payload.month]
                state.monthId = action.payload._id;
                state.month = action.payload.month
                state.arrDays = action.payload.days;
                state.year = action.payload.year
                state.error = ''
            })
            .addCase(fetchMonth.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })

        builder
            .addCase(fetchMonthByDate.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchMonthByDate.fulfilled, (state,action) => {
                state.loading = false
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 'November', 'December']
                state.monthName = months[action.payload.month]
                state.monthId = action.payload._id;
                state.month = action.payload.month
                state.arrDays = action.payload.days;
                state.year = action.payload.year
                state.error = ''
            })
            .addCase(fetchMonthByDate.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })

    }
})

export default monthSlice.reducer
