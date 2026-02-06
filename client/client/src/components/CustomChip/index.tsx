import { Box, Chip } from "@mui/material";

type Props = {
  label: string;
};

const CustomChip = ({ label }: Props) => {
  // convert color to rgb and make its opacity 0.5
  const convertColorToRgb = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  const getChipData = (status: string) => {
    let color: string;
    let bgColor: string;

    switch (status) {
      case "Doctor":
        color = "#4bade8";
        bgColor = convertColorToRgb(color);
        break;
      case "Admin":
      case "Owner":
        color = "#f5a623";
        bgColor = convertColorToRgb(color);
        break;
      case "Pending":
        color = "#348BAD";
        bgColor = convertColorToRgb(color);
        break;
      case "Approved":
      case "User":
        color = "#13B981";
        bgColor = "#E7F8F2";
        break;
      case "Cancelled":
        color = "#c21717";
        bgColor = convertColorToRgb(color);
        break;
      case "Blocked":
        color = "#FF8554";
        bgColor = convertColorToRgb(color);
        break;
      default:
        color = `#292929`;
        bgColor = "#dcdee4";
        break;
    }
    return {
      color,
      bgColor,
    };
  };

  const chipStyle = {
    maxWidth: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "20px",
    backgroundColor: getChipData(label).bgColor,
    fontWeight: 600,
    border: `1px solid ${getChipData(label).color}`,
    fontSize: "12px",
    padding: "0 10px",
    height: "30px",
  };

  return (
    <div>
      <Box
        sx={{
          ...chipStyle,
          justifyContent: "center",
          height: "30px",
        }}
      >
        <Chip
          label={label}
          color="success"
          variant="outlined"
          sx={{
            border: "none",
            color: getChipData(label).color,
          }}
        />
      </Box>
    </div>
  );
};

export default CustomChip;
