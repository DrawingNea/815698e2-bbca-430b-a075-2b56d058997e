import { useEffect, useState } from "react";
import { IEvent } from "../Interfaces/IEvent";
import { Container, Grid, Typography } from "@mui/material";
import EventCard from "./EventCard";
import "../Styles/Homepage.sass";

function Homepage() {
  const [londonEvents, setLondonEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  // Get Data from REST-API and save to londonEvents
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://teclead-ventures.github.io/data/london-events.json`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData: IEvent[] = await response.json();
        actualData.forEach((e) => {
          e.date = new Date(e.date);
          e.startTime = new Date(e.startTime);
          e.endTime = new Date(e.endTime);
          console.log(e.startTime.getTime());
        });
        actualData = actualData
          .filter(
            (filterEvents) =>
              !(
                isNaN(filterEvents.startTime.getTime()) ||
                isNaN(filterEvents.endTime.getTime())
              )
          )
          .filter((filterEvents) => !filterEvents.title.includes("CANCELLED"))
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        setLondonEvents(actualData);
        setError({});
      } catch (err: any) {
        setError(err.message);
        setLondonEvents([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div className="Homepage">
      <Container fixed>
        <Typography id="title">Public Events</Typography>
        <Grid container my={2} justifyContent="space-evenly">
          {londonEvents.map((eventItem) => {
            return (
              <Grid item my={2}>
                <EventCard
                  _id={eventItem._id}
                  startDate={eventItem.startTime}
                  endDate={eventItem.endTime}
                  title={eventItem.title}
                  flyerFront={eventItem.flyerFront}
                  location={eventItem.venue}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
export default Homepage;
