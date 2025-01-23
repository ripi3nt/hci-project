import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db/activies.json";
import Header from "../components/header";

const AddActivity: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [review, setReview] = useState<number>(0);
  const [category, setCategory] = useState<string>(
    db.categories[0]?.category || ""
  );
  const navigate = useNavigate();

  const handleAddActivity = () => {
    const newActivity = {
      name,
      description,
      review,
      comments: [],
    };

    const categoryIndex = db.categories.findIndex(
      (cat) => cat.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryIndex !== -1) {
      db.categories[categoryIndex].content.push(newActivity);
      // Ideally, save to a database or server here.
      console.log("Activity added:", newActivity);
      navigate("/");
    } else {
      db.categories.push({category: category, content: [{name: name, description: description, review: review, comments: []}]});
      console.log("Activity added:", newActivity);
      navigate("/");
    }
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
      ></TextField>

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
    </Stack>
  );
};

export default AddActivity;
