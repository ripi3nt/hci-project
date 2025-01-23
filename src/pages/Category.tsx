import { Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import db from "../db/activies.json";
import { ActivityCard } from "./Home";
import { useEffect } from "react";
import Header from "../components/header";

const Category: React.FC = () => {
  const { categoryid } = useParams<{ categoryid: string }>();
  const navigate = useNavigate();

  // Find the category matching the URL parameter
  const category = db.categories.find((el) => el.category.toLowerCase() == categoryid?.toLowerCase());

  // Redirect to 404 if category is not found
  useEffect(() => {
    if (!category) {
      navigate("/404");
    }
  }, [category, navigate]);

  // Show nothing if redirecting
  if (!category) {
    return null;
  }

  return (
    <Stack spacing={4} padding={2}>
      <Typography variant="h4" fontWeight="bold" textAlign="center">
      <Header title={category.category}/>
      </Typography>
      <Stack spacing={2}>
        {category.content.map((activity) => (
          <ActivityCard key={activity.name} activity={activity} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Category;
