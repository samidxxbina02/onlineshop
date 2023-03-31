import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import { InputLabel } from "@mui/material";
import React from "react";

export default function AppInput(props) {
  const {
    type,
    placeholder,
    onChange,
    defaultValue,
    disabled,
    name,
    required = false,
    sx = {
      py: 2,
    },
    value,
    error = false,
    color,
    label,
    size,
    variant,
  } = props;

  return (
    <Box sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        required={required}
        value={value}
        error={error}
        color={color}
        size={size}
        variant={variant}
      />
    </Box>
  );
}
