import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

type DatePickerProps = {
  name?: string | undefined;
  value: string | Date | null | undefined;
  handleChange: (date: any) => void;
  label?: string;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
  inputFormat?: string;
  openTo?: "day" | "year" | "month";
  views?: Array<"day" | "year" | "month">;
  disabled?: boolean;
  formik?: any;
  variant?: "standard" | "filled" | "outlined";
};

export default function DatePicker({
  name,
  value,
  handleChange,
  label,
  minDate,
  inputFormat,
  maxDate,
  openTo,
  views,
  disabled,
  formik,
  variant,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <DesktopDatePicker
          label={label}
          openTo={openTo}
          views={views ? views : ["day"]}
          inputFormat={"DD/MM/YYYY"}
          disabled={disabled}
          minDate={minDate ? minDate : new Date("1900-01-01T00:00:00.000Z")}
          maxDate={maxDate ? maxDate : new Date("2100-01-01T00:00:00.000Z")}
          value={value}
          onChange={handleChange}
          className={
            formik?.touched[name as string] && formik?.errors[name as string]
              ? "error"
              : ""
          }
          InputProps={{
            sx: {
              borderRadius: "5px",
              height: "50px",
              background: "#fff",
              border: "none",

              // target the placeholder
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
                textTransform: "uppercase",
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              variant={variant ? variant : "outlined"}
              error={Boolean(
                formik?.touched[name as string] &&
                  formik?.errors[name as string]
              )}
              name={name}
              fullWidth
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
