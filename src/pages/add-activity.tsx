import { Button, MenuItem, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import db from "../db/activies.json";
import Header from "../components/header";

const AddActivity: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [review, setReview] = useState<number>(0);
  const [category, setCategory] = useState<string>(
    db.categories[0]?.category || ""
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddActivity = () => {
    const newActivity = {
      name,
      description,
      review,
      comments: [],
      location: {
        Longitude: "0.0",
        Latitude: "0.0"
      }
    };

    const categoryIndex = db.categories.findIndex(
      (cat) => cat.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryIndex !== -1) {
      db.categories[categoryIndex].content.push(newActivity);
      // Ideally, save to a database or server here.
      console.log("Activity added:", newActivity);
      setSnackbarOpen(true);
    } else {
      db.categories.push({category: category, content: [{name: name, description: description, review: review, comments: [], location: {Longitude: "0,0", Latitude: "0,0"}}]});
      console.log("Activity added:", newActivity);
      setSnackbarOpen(true);
    }
    setName("");
    setDescription("");
    setReview(0);
    setCategory("");
  };

  return (
    <Stack spacing={4} padding={2}>
      <Header title={"Add Activity"} />

      {/* Inputs for Activity Details */}
      <TextField
        label="Activity Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        minRows={3}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Review (0 to 5)"
        variant="outlined"
        type="number"
        inputProps={{ min: 0, max: 5, step: 1 }}
        fullWidth
        value={review}
        onChange={(e) => setReview(parseInt(e.target.value))}
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        select
      >
      {db.activities.map((el) => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>)}
      </TextField>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddActivity}
        disabled={
          !name.trim() || !description.trim() || review < 0 || review > 5
        }
      >
        Add Activity
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} message="Successfully added new activity" />
    </Stack>
  );
};

export default AddActivity;
