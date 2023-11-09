
import { addtoCart, decreasequan, increasequan } from "../../Redux/slice";

import { useGetOneProductQuery } from '../../Redux/productsApi';
import './product-details.css';
import { useParams } from 'react-router-dom';
import { Badge, Box, Button, CircularProgress, IconButton, Typography, styled } from '@mui/material';
import { useState } from 'react';
import DetailsThumb from './DetailsThumb';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Remove } from "@mui/icons-material";
const ProductDetails = () => {
  let{id}=useParams()
  const { data, error, isLoading } = useGetOneProductQuery(id);
const [index, setindex] = useState(0)
const { selectedproduct, selectedproductID } = useSelector(
  (state) => state.carttt
);
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));
const productquantity = (item) => {
  const myprd = selectedproduct.find((itemuser) => {
    return itemuser.id === item.id;
  });
  return myprd.quantity;
};
const dispatch = useDispatch();
const myRef= useRef(null)
const handleTab = (index) => {
  // this.setState({index: index})
  setindex(index)
  const images = myRef.current.children;
  for(let i=0; i<images.length; i++){
    images[i].className = images[i].className.replace("active", "");
  }
  images[index].className = "active";
}
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }
  
if (data) {
  return (
    <div className="app details-page">
    
    
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt=""/>
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>
      
            <DetailsThumb images={data.imageLink} tab={handleTab} myRef={myRef} />
            {selectedproductID.includes(data.id) ? (
                  <div
                  
                    style={{ display: "flex", alignItems: "center",marginTop:"33px" }}
                  >
                    <IconButton
                      color="primary"
                      sx={{ mr: "10px" }}
                      onClick={() => {
                        dispatch(decreasequan(data));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <StyledBadge
                      badgeContent={productquantity(data)}
                      color="primary"
                    />
                    <IconButton
                      color="primary"
                      sx={{ ml: "10px" }}
                      onClick={() => {
                        // eslint-disable-next-line no-undef
                        dispatch(increasequan(data));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                

                    
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(addtoCart(data));
                    }}
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                )}

          </div>
        </div>
  
    
  </div>
  );
}
  

  
  


}

export default ProductDetails;
