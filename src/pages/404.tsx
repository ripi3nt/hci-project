
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={4}
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" textAlign="center">
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ padding: "10px 20px", textTransform: "none", fontSize: "16px" }}
      >
        Go Back to Home
      </Button>
    </Stack>
  );
};

export default NotFound;
