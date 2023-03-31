import React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

const AppButton = (props) => {
  const {
    color,
    disabled,
    onClick,
    size,
    variant,
    title,
    loading,
    sx = { display: "flex", gap: 2, flexWrap: "wrap" },
  } = props;

  return (
    <Box sx={sx}>
      <Button
        color={color}
        disabled={disabled}
        onClick={onClick}
        size={size}
        variant={variant}
        loading={loading}
      >
        {title}
      </Button>
    </Box>
  );
};

export default AppButton;
