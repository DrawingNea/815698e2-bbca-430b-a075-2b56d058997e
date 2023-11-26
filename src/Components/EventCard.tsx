import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Button,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import "../Styles/EventCard.sass";

function EventCard({
  _id,
  title,
  startDate,
  endDate,
  flyerFront,
  location,
}: {
  _id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  flyerFront: string;
  location: { name: string; direction: string };
}) {

  const MAX_TITLE_LENGTH = 80;

  //Redirect to google maps location of event
  const routeChange = () => {
    window.open(location.direction);
  };

  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        height: "600px",
        width: "350px",
      }}
    >
      <CardHeader
        title={
          title.substring(0, MAX_TITLE_LENGTH) +
          (title.length >= MAX_TITLE_LENGTH && "...")
        }
        sx={{ height: "10%" }}
        titleTypographyProps={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "left",
        }}
        avatar={
          <Avatar
            aria-label="recipe"
            src="https://mui.com/static/images/avatar/3.jpg"
          ></Avatar>
        }
      />
      <CardMedia
        component="img"
        height="60%"
        image={flyerFront}
        alt={title}
        sx={{ objectFit: "fill" }}
      />
      <CardContent>
        <div
          className="EventCard"
          style={{
            textAlign: "left",
          }}
        >
          <IconButton
            className="cardButtons"
            type="button"
            aria-label="search"
            onClick={routeChange}
          >
            <PlaceIcon />
          </IconButton>
          <Typography display="inline" variant="body1" color="text.primary">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            | Starts: {new Date(startDate).toLocaleString("de-De")}
            <br />| Ends: {new Date(endDate).toLocaleString("de-De")}
          </Typography>
        </div>
        <Grid container justifyContent="flex-end">
            <Button
              className="actionButton cardButtons"
              variant="contained"
              onClick={undefined}
            >
              +
            </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EventCard;
