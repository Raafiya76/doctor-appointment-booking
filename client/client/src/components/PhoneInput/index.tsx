import "react-phone-input-2/lib/material.css";
import MuiPhoneNumber from "material-ui-phone-number";
import { removeDashAndSpace } from "../../utils";
import { useEffect, useState } from "react";
import axios from "axios";

interface PhoneNumberProps {
  value: string;
  name: string;
  onChange?: any;
  countryCode?: string;
  variant?: "standard" | "outlined" | "filled";
  label?: string;
  formik?: any;
  authScreens?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showErrorMessage?: boolean;
}

const PrimaryPhoneInput = ({
  value,
  name,
  onChange,
  countryCode,
  variant,
  label,
  formik,
  authScreens,
  disabled,
  readOnly,
  showErrorMessage,
}: PhoneNumberProps) => {
  const [defaultCountry, setDefaultCountry] = useState<any>("");

  const [loader, setLoader] = useState(false);

  const options = {
    method: "GET",
    url: "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce",
  };

  const getCountry = async () => {
    try {
      setLoader(true);
      const response = await axios.request(options);

      if (response?.data?.country_code !== "Not found") {
        setLoader(false);
        setDefaultCountry(response?.data?.country_code.toLowerCase());
      } else {
        setLoader(false);
        setDefaultCountry("pk");
      }
    } catch (error) {
      setLoader(false);
      console.warn(error);
    }
  };

  useEffect(() => {
    if (authScreens) {
      getCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MuiPhoneNumber
        sx={{
          width: "100% !important",
          background: "#fff",
          height: "50px",
          "& .MuiOutlinedInput-root": {
            height: "50px !important",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            margin: "0",
          },
        }}
        defaultCountry={
          countryCode ? countryCode.toLowerCase() : defaultCountry || "pk"
        }
        onChange={(e: any) => {
          onChange
            ? onChange(e)
            : formik?.setFieldValue(name, removeDashAndSpace(e));
        }}
        name={name}
        value={value}
        variant={variant ? variant : "outlined"}
        label={label}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}
        helperText={
          showErrorMessage ? "" : formik?.touched[name] && formik?.errors[name]
        }
        onBlur={formik?.handleBlur}
        disabled={disabled}
        disableDropdown={loader || disabled}
        inputProps={{
          readOnly: readOnly,
          style: { cursor: readOnly ? "not-allowed" : "" },
        }}
      />
    </>
  );
};

export default PrimaryPhoneInput;
