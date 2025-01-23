import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import { useNavigate } from "react-router-dom";
import db from "../db/activies.json"; // Assuming the JSON is located here
import AddIcon from '@mui/icons-material/Add';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const isModerator = db.isModerator;

  return (
    <Stack spacing={4} padding={2} position="relative">
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        Home
      </Typography>
      {db.categories.map((category) => (
        <CategoryCard key={category.category} category={category} />
      ))}

      {/* Floating Profile Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => navigate("/profile")}
      >
        <PersonIcon />
      </Fab>

      {/* Add Activity Button (Visible Only to Moderators) */}
      {isModerator && (
        <Fab
          color="secondary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 86, // Offset to prevent overlap with Profile button
          }}
          onClick={() => navigate("/add-activity")}
        >
          <AddIcon />
        </Fab>
      )}
    </Stack>
  );
};


interface CategoryCardProps {
  category: {
    category: string;
    content: {
      name: string;
      description: string;
      review: number;
      comments: { user: string; body: string }[];
    }[];
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ borderRadius: "8px", padding: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {category.category}
      </Typography>
      <Stack spacing={2}>
        {category.content.slice(0, 3).map((activity) => (
          <ActivityCard key={activity.name} activity={activity} />
        ))}
      </Stack>
      <Button
        variant="text"
        onClick={() => navigate(`/category/${category.category.toLowerCase()}`)}
        sx={{ marginTop: 2 }}
      >
        See more
      </Button>
    </Card>
  );
};

interface ActivityCardProps {
  activity: {
    name: string;
    description: string;
    review: number;
    comments: { user: string; body: string }[];
  };
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        marginBottom: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <ButtonBase
        onClick={() => {
          navigate("/review/" + encodeURIComponent(activity.name));
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          textAlign: "left",
          padding: 1,
        }}
      >
        <Avatar sx={{ bgcolor: "#a3d2fc", marginRight: 2 }}>
          {activity.name[0]}
        </Avatar>
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {activity.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" noWrap>
            {activity.description}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default Home;
