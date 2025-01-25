import {
  Avatar,
  Stack,
  Typography,
  Rating,
  Button,
  TextField,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite"; // Import the Favorite icon
import { useParams } from "react-router-dom";
import db from "../db/activies.json";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "../components/header";


  const reccs = Math.floor(Math.random() * 100);

const Review: React.FC = () => {
  const { reviewid } = useParams<{ reviewid: string }>();

  // State for the new comment
  const [newComment, setNewComment] = useState<string>("");

  // Find the activity by name (case-insensitive)
  let activity;

  for (const category of db.categories) {
    const found = category.content.find(
      (item) => item.name.toLowerCase() == reviewid?.toLowerCase()
    );
    if (found) {
      activity = found;
      break;
    }
  }

  const [comments, setComments] = useState<{ user: string; body: string }[]>(
    activity!.comments
  );

  const handleAddComment = () => {
    setComments([...comments, { user: "test user", body: newComment }]);
    activity!.comments = [
      ...activity!.comments,
      { user: "test user", body: newComment },
    ];
    setNewComment(""); // Clear the comment input field after submission
  };

  const likedStatus = db.liked.findIndex((el) => el.name == reviewid);
  const [isLiked, setLiked] = useState(likedStatus == -1 ? false : true);

  const handleLike = () => {
    const updatedLiked = !isLiked;
    setLiked(!isLiked); // Toggle the like state

    if(updatedLiked) {

      db.liked = [...db.liked, activity!];
    } else {
      db.liked = db.liked.filter((el) => el.name !== reviewid);
    }

    alert("View liked activites in the profile tab");
  };

  const position: [number, number] = [parseFloat(activity!.location.Latitude), parseFloat(activity!.location.Longitude)];


  return (
    <Stack spacing={3} padding={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* Activity Title */}

        <Header title={activity!.name}/>

        {/* Like Button (Heart) */}
        <Button onClick={handleLike} variant="text">
          <Favorite
            sx={{
              color: isLiked ? "red" : "gray", // Change color based on isLiked state
              transition: "color 0.3s", // Smooth transition for color change
            }}
          />
        </Button>
      </Stack>

      {/* Map */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: "100%", height: 200}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
          {activity?.name}
          </Popup>
        </Marker>
      </MapContainer>
      {/* Rating and Recommendations */}
      <Typography variant="h6" fontWeight="bold">Review</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Rating value={activity!.review} readOnly />
        <Typography variant="body2" color="text.secondary">
          {reccs} recommendations
        </Typography>
      </Stack>

      {/* Review Section */}
      <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">Comments</Typography>
        {comments.map((comment, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            <Avatar />
            <Stack>
              <Typography variant="subtitle2">{comment.user}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date().toLocaleDateString()} {/* Example date */}
              </Typography>
              <Typography variant="body2">{comment.body}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      {/* Add Comment Section */}
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          disabled={!newComment.trim()} // Disable if no content
        >
          Submit Comment
        </Button>
      </Stack>

      {/* Description */}
      <Typography variant="h6" fontWeight="bold">
        Description
      </Typography>
      <Typography variant="body1">{activity?.description}</Typography>
    </Stack>
  );
};

export default Review;
