// React Imports
import * as React from "react";
// MUI Imports
import { Box, InputAdornment, TextField } from "@mui/material";
// Custom Imports
import Spinner from "../Spinner";

interface PrimaryInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  startAdornment?: any;
  endAdornment?: any;
  name?: string;
  onClick?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  helperText?: string;
  sx?: any;
  minRows?: number;
  maxRows?: number;
  readOnly?: boolean;
  multiline?: boolean;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onKeyPress?: any;
  autoFocus?: boolean;
  loading?: boolean;
  borderRadius?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  label,
  placeholder,
  type,
  fullWidth = true,
  startAdornment,
  endAdornment,
  name,
  onClick,
  onChange,
  value,
  onBlur,
  helperText,
  sx,
  minRows,
  maxRows,
  readOnly = false,
  multiline = false,
  required = false,
  error = false,
  disabled = false,
  variant,
  autoFocus,
  loading = false,
  borderRadius,
  ref,
}) => {
  return (
    <TextField
      id={name}
      error={error}
      label={label}
      required={required}
      autoFocus={autoFocus}
      ref={ref}
      sx={[
        {
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "2px !important",
          },

          // target the placeholder
          "& .MuiInputBase-input::placeholder": {
            fontSize: "14px",
          },
          "& .MuiOutlinedInput-input": {
            cursor: readOnly ? "not-allowed" : "",
          },
        },
        sx,
      ]}
      onChange={onChange}
      name={name}
      type={type}
      value={value || ""}
      variant={variant ? variant : "outlined"}
      fullWidth={fullWidth}
      multiline={multiline}
      placeholder={placeholder}
      onBlur={onBlur}
      disabled={disabled}
      helperText={helperText ? helperText : ""}
      minRows={minRows ? minRows : 6}
      maxRows={maxRows ? maxRows : 6}
      InputProps={{
        sx: {
          borderRadius: borderRadius ? borderRadius : "5px",
          background: "#fff",
          height: multiline ? "auto" : "50px",
          border: "none",
        },
        readOnly: readOnly,
        startAdornment: startAdornment ? (
          <InputAdornment position="start">
            <Box>{startAdornment}</Box>
          </InputAdornment>
        ) : (
          ""
        ),
        endAdornment: endAdornment ? (
          <InputAdornment position="end">
            <Box
              onClick={onClick ? onClick : null}
              sx={{
                cursor: "pointer",
              }}
            >
              {endAdornment}
            </Box>
          </InputAdornment>
        ) : loading ? (
          <Spinner />
        ) : (
          ""
        ),
        inputProps: {
          min: 0,
          // restrict user to type -
          onKeyDown: (event: any) => {
            if (event.key === "-" && type === "number") {
              event.preventDefault();
            }
          },
        },
      }}
    />
  );
};

export default PrimaryInput;
