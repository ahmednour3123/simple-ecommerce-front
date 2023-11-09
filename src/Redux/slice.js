import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedproduct: localStorage.getItem("selectedproducts")
    ? JSON.parse(localStorage.getItem("selectedproducts"))
    : [],
  selectedproductID: localStorage.getItem("selectedproductsID")
    ? JSON.parse(localStorage.getItem("selectedproductsID"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const prodquantity = { ...action.payload, quantity: 1 };
      state.selectedproduct.push(prodquantity);
      state.selectedproductID.push(action.payload.id);
      localStorage.setItem(
        "selectedproducts",
        JSON.stringify(state.selectedproduct)
      );
      localStorage.setItem(
        "selectedproductsID",
        JSON.stringify(state.selectedproductID)
      );
    },

    increasequan: (state, action) => {
      const icrese = state.selectedproduct.find((item) => {
        return item.id === action.payload.id;
      });
      icrese.quantity += 1;

      localStorage.setItem(
        "selectedproducts",
        JSON.stringify(state.selectedproduct)
      );
    },

    decreasequan: (state, action) => {
      const dcrese = state.selectedproduct.find((item) => {
        return item.id === action.payload.id;
      });

      dcrese.quantity -= 1;
      if (dcrese.quantity === 0) {
        const del = state.selectedproduct.filter((item) => {
          return item.id !== action.payload.id;
        });

        const dele = state.selectedproductID.filter((item) => {
          return item !== action.payload.id;
        });

        state.selectedproductID = dele;
        state.selectedproduct = del;
        localStorage.setItem(
          "selectedproductsID",
          JSON.stringify(state.selectedproductID)
        );
        localStorage.setItem(
          "selectedproducts",
          JSON.stringify(state.selectedproduct)
        );
      }
    },

    deleteprod: (state, action) => {
      const del = state.selectedproduct.filter((item) => {
        return item.id !== action.payload.id;
      });

      const dele = state.selectedproductID.filter((item) => {
        return item !== action.payload.id;
      });

      state.selectedproductID = dele;
      state.selectedproduct = del;
      localStorage.setItem(
        "selectedproductsID",
        JSON.stringify(state.selectedproductID)
      );
      localStorage.setItem(
        "selectedproducts",
        JSON.stringify(state.selectedproduct)
      );
    },
  },
});

export const { addtoCart, increasequan, decreasequan, deleteprod } =
  counterSlice.actions;

export default counterSlice.reducer;
