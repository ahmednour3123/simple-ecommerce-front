import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,

  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { decreasequan, deleteprod, increasequan } from "../../Redux/slice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const { selectedproduct } = useSelector((state) => state.carttt);
  let total = 0;
  return (
    <Box>
      {selectedproduct.map((item) => {
        total += Number(item.price) * Number(item.quantity);
        return (
          <Paper key={item.imageLink} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img src={item.imageLink[0]} alt="" />
              <p className="product-name">{item.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  // eslint-disable-next-line no-undef
                  dispatch(increasequan(item));
                }}
              >
                <Add />
              </IconButton>
              <StyledBadge badgeContent={item.quantity} color="secondary" />

              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreasequan(item));
                }}
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">
              {Number(item.price) * Number(item.quantity)}
            </div>

            <Button
              onClick={() => {
                dispatch(deleteprod(item));
              }}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="text"
              color="error"
            >
              DELETE
            </Button>

            <IconButton
              onClick={() => {
                dispatch(deleteprod(item));
              }}
              sx={{
                color: "#ef5350",
                display: { xs: "inline-flex", md: "none" },
              }}
            >
              <Delete />
            </IconButton>
          </Paper>
        );
      })}

      <Paper sx={{ width: "200px", mx: "auto", mt: "60px" }}>
        <Typography align="center" p={2} variant="h6">
          Cart Summary
        </Typography>
        <Divider />

        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", p: 1.2 }}
        >
          <Typography variant="body1">Subtotal</Typography>

          <Typography variant="body1">${total}</Typography>
        </Stack>

        <Divider />

        <Button fullWidth variant="contained" color="primary">
          CHECKOUT
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
