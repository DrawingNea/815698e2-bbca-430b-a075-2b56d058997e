import { useEffect, useState } from "react";
import { IEvent } from "../Interfaces/IEvent";
import { EventGroup } from "../Interfaces/EventGroup";
import { Container, Grid, Typography } from "@mui/material";
import EventCard from "./EventCard";
import "../Styles/Homepage.sass";

function Homepage({
  passShoppingCart,
  passRemoveFromCart,
  passSearchFieldValue,
}: {
  passShoppingCart: Function;
  passRemoveFromCart: number;
  passSearchFieldValue: string;
}) {
  const [londonEvents, setLondonEvents] = useState<IEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<EventGroup[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
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
        setFilteredEvents(actualData);
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
    setGroupedEvents(findEventGroups(filteredEvents));
  }, [londonEvents, filteredEvents]);

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
    setFilteredEvents(eventArray);
  }

  //Pass shopping cart when updated
  useEffect(() => {
    passShoppingCart(shoppingCart);
  }, [shoppingCart]);

  //Receive removable event and update shopping cart and events
  useEffect(() => {
    let shoppingCartCopy = [...shoppingCart];
    let indexOfItem = shoppingCart.findIndex(
      (shoppingCartItem) => shoppingCartItem._id === passRemoveFromCart
    );
    let londonEventsCopy = [...londonEvents];
    let filteredEventsCopy = [...filteredEvents];
    londonEventsCopy.push(shoppingCartCopy[indexOfItem]);
    filteredEventsCopy.push(shoppingCartCopy[indexOfItem]);
    setLondonEvents(londonEventsCopy);
    setFilteredEvents(filteredEventsCopy);
    shoppingCartCopy.splice(indexOfItem, 1);
    setShoppingCart(shoppingCartCopy);
  }, [passRemoveFromCart]);

  // Receive search filter for filtering events
  useEffect(() => {
    setFilteredEvents(
      londonEvents.filter((londonEvent) =>
        londonEvent.title.includes(passSearchFieldValue)
      )
    );
  }, [passSearchFieldValue]);

  //Remove previous stickyHeader overlap with new one
  function checkVisibility() {
    const homepageHeight = window.innerHeight;
    const containers = document.querySelectorAll(".eventContainer");
    for(let i = 0; i < containers.length; ++i) {
      const container = containers[i] as HTMLElement;
      if(container === null) continue;
      const title = container.previousSibling as HTMLElement | null;
      if(title === null) continue;
      if(container.getBoundingClientRect().bottom < homepageHeight/20)
        title.style.top = "unset";
      else
      {
        title.style.top = "";
        break;
      }
    }
  }

  useEffect(() => {
    window.removeEventListener('scroll', checkVisibility);
    window.addEventListener('scroll', checkVisibility)
  });

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
              <Grid container justifyContent="space-evenly" className="eventContainer">
                {eventGroup.eventIds.map((eventId: number) => {
                  let eventById = filteredEvents.find(
                    (eventById: IEvent) => eventById._id === eventId
                  );
                  if (eventById === undefined) return <></>;
                  return (
                    <Grid item>
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
      </Container>
    </div>
  );
}
export default Homepage;
