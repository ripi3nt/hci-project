
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";


const ValidatorSignUp: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
    <Typography>
    Validator
    </Typography>
    <Button onClick={() => {
      navigate("/")
    }}>
    Home
    </Button>
    </>

  )
}

export default ValidatorSignUp;
