import React from "react";
import { StyledProductDetails } from "./styled";
import { IconButton } from "@mui/material";
import { Face } from "@mui/icons-material";

const ProductDetails = ({ product }) => {
  if (!product?.title) return;

  const { title, description, id, price, img, type, likes, comments } = product;

  return (
    <StyledProductDetails.Wrapper>
      <div>
        <img src={img || "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"} />
      </div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{type}</div>
      <div>Likes: {likes}</div>

      <h1>COMMENTS</h1>
      <div>
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
      </div>
    </StyledProductDetails.Wrapper>
  );
};

export default ProductDetails;
