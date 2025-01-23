import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        {props.title}
      </Typography>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon />
      </Button>
    </Stack>
  );
};

export default Header;
