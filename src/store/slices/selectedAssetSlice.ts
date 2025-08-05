import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Asset = {
  name: string
  short: string
  price: string
  amount: string
  logo: any
}

type SelectedAssetState = {
  selectedAsset: Asset | null
}

const initialState: SelectedAssetState = {
  selectedAsset: null,
}

const selectedAssetSlice = createSlice({
  name: 'selectedAsset',
  initialState,
  reducers: {
    setSelectedAsset: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset = action.payload
    },
    clearSelectedAsset: state => {
      state.selectedAsset = null
    },
  },
})

export const { setSelectedAsset, clearSelectedAsset } = selectedAssetSlice.actions
export default selectedAssetSlice.reducer