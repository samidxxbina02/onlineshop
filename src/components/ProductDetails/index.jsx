import React from "react";
import { StyledProductDetails } from "./styled";
import { IconButton } from "@mui/material";
import { Face } from "@mui/icons-material";

const ProductDetails = ({ product }) => {
  if (!product?.title) return;

  const { title, description, id, price, img, type, likes, comments } = product;

  return (
    <StyledProductDetails.Wrapper>
      <StyledProductDetails.ImgWrapper>
        <StyledProductDetails.Img src={img || "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"} />
      </StyledProductDetails.ImgWrapper>
      <StyledProductDetails.ContentWrapper>
       <StyledProductDetails.ContentTitle>Описание</StyledProductDetails.ContentTitle>
      <StyledProductDetails.Title>{title}</StyledProductDetails.Title>
      <StyledProductDetails.Description>{description}</StyledProductDetails.Description>
      <div>цена:{price}$</div>
      <div>тип:{type}</div>
      <div>Likes: {likes}</div>
      </StyledProductDetails.ContentWrapper>
    

      
      <StyledProductDetails.CommentsWrapper>
      <h3>Отзывы:</h3>
        {comments?.length
          ? comments.map((commentItem) => {
              const { comment, user, date } = commentItem;
              return (
                <>
                  <div>{comment}</div>
                  <div>
                    <span>
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        sx={{ ml: -1 }}
                      >
                        <Face />
                      </IconButton>
                    </span>
                    <span>Написал: {user.email}</span>
                  </div>
                  <div>{date}</div>
                </>
              );
            })
          : null}
      </StyledProductDetails.CommentsWrapper>
    </StyledProductDetails.Wrapper>
  );
};

export default ProductDetails;
