import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import db from "../db/activies.json";

const Favourites: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve favorite activities
  const favouriteActivities = db.liked || [];

  return (
    <Stack spacing={3} padding={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* Title */}
        <Typography variant="h4" fontWeight="bold">
          Favourite Activities
        </Typography>

        {/* Back Button */}
        <Button onClick={() => navigate(-1)} variant="text">
          {"<"} Back
        </Button>
      </Stack>

      {/* List of Favourite Activities */}
      {favouriteActivities.length > 0 ? (
        favouriteActivities.map((activity, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {activity.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.description}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No favourite activities found.
        </Typography>
      )}
    </Stack>
  );
};

export default Favourites;
