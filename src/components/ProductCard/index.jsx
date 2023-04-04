import React, { useContext } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Face from "@mui/icons-material/Face";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AppButton from "../UI/AppButton/AppButton";
import AppInput from "../UI/AppInput/AppInput";
import { StoreContext } from "../../context/store/StoreContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { UserImportantListContext } from "../../context/userImportantList/UserImportantListContext";
import { useLocation, useNavigate } from "react-router-dom";

export const ProductCard = ({ product, userIsLike }) => {
  const navigate = useNavigate()
  const { isAuth, toggleToUserLikeProduct } = useContext(AuthContext);
  const { deleteProduct, userHandleLikeProductRequest } = useContext(StoreContext);
  const { addToUserImportantList, deleteToUserImportantList } = useContext(
    UserImportantListContext
  );
  const { pathname } = useLocation();

  const isShoppingCartPage = pathname == "/shoppingCart";
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const {
    title,
    description = "The React component library you always wanted",
    img,
    price = "1",
    likes = 0,
    comments,
    id,
  } = product;

  const productCardActionPopupList = [
    {
      onClick: () => navigate(`product-edit/${id}`),
      label: "Edit",
    },
    {
      onClick: () => deleteProduct(id),
      label: "Delete",
    },
  ];

  const handleAddCartClick = () => {
    if (user?.id) {
      addToUserImportantList(user.id, product);
    }
  };

  const handleDeleteCartClick = () => {
    if (user?.id) {
      deleteToUserImportantList(user.id, product);
    }
  };

  const handleFavorite = () => {
    setTimeout(() => userHandleLikeProductRequest(product), 100)
    
    toggleToUserLikeProduct(user?.id, product.id)
  }

  const handleUnFavorite = () => {
    setTimeout(() => userHandleLikeProductRequest(product, true), 100)
    toggleToUserLikeProduct(user?.id, product.id, true)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        width: 350,
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
        <Typography fontWeight="lg">{title}</Typography>
        {user?.admin && (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
          >
            <AppDropdown
              icon={<MoreHoriz />}
              options={productCardActionPopupList}
            />
          </IconButton>
        )}
      </Box>
      <CardOverflow sx={{ mb: 1 }}>
        <AspectRatio>
          <img
            style={{
              height: "500px",
            }}
            src={
              img ||
              "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
            }
            alt=""
            loading="lazy"
          />
        </AspectRatio>
      </CardOverflow>
      {isAuth && (
        <Box sx={{ display: "flex", alignItems: "center", mx: -1 }}>
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              {
                userIsLike ? <FavoriteIcon onClick={handleUnFavorite}/>  : <FavoriteBorder onClick={handleFavorite}/>
              }
              
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
          ></Box>

          <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
            <IconButton variant="plain" color="neutral" size="sm">
              {isShoppingCartPage ? (
                <RemoveShoppingCartIcon
                  onClick={handleDeleteCartClick}
                  sx={{ color: "black" }}
                />
              ) : (
                <ShoppingCartIcon
                  onClick={handleAddCartClick}
                  sx={{ color: "black" }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        {likes} Likes
      </Link>
      <Typography fontSize="sm">{description}</Typography>
      <Typography fontWeight="700" fontSize="lg">
        ${price}
      </Typography>
      {isAuth && !isShoppingCartPage && (
        <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Face />
          </IconButton>
          <AppInput
            placeholder="Add a comment…"
            variant="plain"
            type="text"
            name="comment"
            sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
            onChange={(event) => console.log(event.target.value)}
          />
          <AppButton
            title="Post"
            onClick={() => console.log("CLICK COMMENT POST")}
            color="neutral"
          />
        </CardOverflow>
      )}
      {isShoppingCartPage && (
        <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
          <AppButton
            title="Buy"
            onClick={() => navigate('/pay')}
            color="neutral"
          />
        </CardOverflow>
      )}
    </Card>
  );
}

export default ProductCard