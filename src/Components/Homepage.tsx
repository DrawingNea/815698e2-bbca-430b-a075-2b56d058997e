import { useEffect, useState } from "react";
import { IEvent } from "../Interfaces/IEvent";
import { EventGroup } from "../Interfaces/EventGroup";
import { Container, Grid, Typography } from "@mui/material";
import EventCard from "./EventCard";
import "../Styles/Homepage.sass";

function Homepage({ passShoppingCart }: { passShoppingCart: Function }) {
  const [londonEvents, setLondonEvents] = useState<IEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<EventGroup[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState<IEvent[]>([]);

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
        let groups = findEventGroups(actualData);
        setLondonEvents(actualData);
        setGroupedEvents(groups);
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

  //sort & assign events to groups by starttime
  function findEventGroups(allEvents: IEvent[]) {
    const groups: EventGroup[] = [];
    allEvents = allEvents.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    );
    allEvents.forEach((singleEvent: IEvent) => {
      const dateOfEvent = singleEvent.date.toDateString();
      const indexOfEvent = groups.findIndex(
        (checkEvent) => checkEvent.dateString === dateOfEvent
      );
      if (indexOfEvent === -1)
        groups.push({ dateString: dateOfEvent, eventIds: [singleEvent._id] });
      else groups[indexOfEvent].eventIds.push(singleEvent._id);
    });
    return groups;
  }

  //update event groups when changes in events
  useEffect(() => {
    setGroupedEvents(findEventGroups(londonEvents));
  }, [londonEvents]);

  //find and add item to shopping cart
  function addEventToCart(idOfEvent: number) {
    let eventArray = [...londonEvents];
    let indexOfEvent = eventArray.findIndex(
      (eventEntry) => eventEntry._id === idOfEvent
    );
    let shoppingCartArray = [...shoppingCart];
    shoppingCartArray.push(eventArray[indexOfEvent]);
    setShoppingCart(shoppingCartArray);
    eventArray.splice(indexOfEvent, 1);
    setLondonEvents(eventArray);
  }

  //Pass shopping cart when updated
  useEffect(() => {
    passShoppingCart(shoppingCart);
  }, [shoppingCart]);

  return (
    <div className="Homepage">
      <Container fixed>
        <Typography id="title">Public Events</Typography>
        {groupedEvents.map((eventGroup: EventGroup) => {
          return (
            <>
              {eventGroup.eventIds.length > 0 ? (
                <Typography className="stickyHeader">
                  {eventGroup.dateString}
                </Typography>
              ) : null}
              <Grid container my={2} justifyContent="space-evenly">
                {eventGroup.eventIds.map((eventId: number) => {
                  let eventById = londonEvents.find(
                    (eventById: IEvent) => eventById._id === eventId
                  );
                  if (eventById === undefined) return <></>;
                  return (
                    <Grid item my={2}>
                      <EventCard
                        _id={eventById._id}
                        startDate={eventById.startTime}
                        endDate={eventById.endTime}
                        title={eventById.title}
                        flyerFront={eventById.flyerFront}
                        location={eventById.venue}
                        addEventToCart={addEventToCart}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        })}
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
