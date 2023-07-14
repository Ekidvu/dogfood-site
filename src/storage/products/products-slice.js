import api from '../../utils/api';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data: [],
    total: 0,
    loading: true,
    error: null,
}

export const sliceName = 'products';

export const fetchProducts = createAsyncThunk(
    `${sliceName}/fetchProducts`,
    async function (_, { getState, fulfillWithValue, rejectWithValue }) {
        try {
            const data = await api.getProductsList();
            return fulfillWithValue(data);
        }
        catch (err) {
            return rejectWithValue(err)
        }
    } 
)

const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { // { type: products/fetchProducts/pending, payload: {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => { // { type: products/fetchProducts/fulfilled, payload: {...}}
                state.data = action.payload.products;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => { // { type: products/fetchProducts/rejected, payload: {...}}
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default productsSlice.reducer;