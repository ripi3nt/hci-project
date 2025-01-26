import {
  Button,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "./Home";
import db from "../db/activies.json"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
// Dummy saved activities for demonstration
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSignUpForModerator = () => {
    // Add logic for moderator sign-up here (e.g., API call or form submission)
    setSnackbarOpen(true);
    db.isModerator = true;
  };

  const savedActivities = db.liked;

  const isModerator = db.isModerator;


  return (
    <Stack spacing={4} padding={2}>
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        Profile
      </Typography>
      <Button onClick={() => {navigate(-1)}}>
      <ArrowBackIcon/>
      </Button>
    </Stack>


    {!isModerator && 
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          Become a Moderator
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Moderators help manage activities and ensure a great user experience.
          Click the button below to sign up as a moderator.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUpForModerator}
        >
          Sign Up for Moderator
        </Button>
      </Stack>
    }

      {/* Saved Activities Section */}
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          Saved Activities
        </Typography>
        {savedActivities.length > 0 ? (
          savedActivities.map((activity, index) => (
            <ActivityCard activity={activity} key={index}/>
          ))
        ) : (
          <Typography color="textSecondary">
            You have no saved activities yet.
          </Typography>
        )}
      </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={7000}  message="You have successfully signed up for moderator. You can now add new activites in the home page."/>
   </Stack>
  );
};

export default Profile;
