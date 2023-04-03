import  React, {useContext}  from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Face from "@mui/icons-material/Face";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppButton from "../UI/AppButton/AppButton";
import AppInput from "../UI/AppInput/AppInput";
import { StoreContext } from "../../context/store/StoreContext";

export default function ProductCard(props) {
  const {
    title,
    description = "The React component library you always wanted",
    img,
    price = "1",
    likes = 0,
    comments,
    id,
    
  } = props;

  const {deleteProduct} = useContext(StoreContext)


  const productCardActionPopupList = [
    {
      onClick: () => console.log('edit'),
      label: "Edit",
    },
    {
      onClick: () => deleteProduct(id),
      label: "Delete",
    },
  ];

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
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          {/* <MoreHoriz /> */}
          <AppDropdown
            icon={<MoreHoriz />}
            options={productCardActionPopupList}
          />
        </IconButton>
      </Box>
      <CardOverflow>
        <AspectRatio>
          <img
          style={{
            height: '500px'
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
      <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
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
            <ShoppingCartIcon  sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Box>
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
    </Card>
  );
}
