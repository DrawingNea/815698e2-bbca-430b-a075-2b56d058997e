import { Box, Button, Container, Drawer } from "@mui/material";
import EventCard from "./EventCard";
import { IEvent } from "../Interfaces/IEvent";

function CartDrawer({
    cartOpen,
    setCartOpen,
    shoppingCart,
  }: {
    cartOpen: boolean;
    setCartOpen: Function;
    shoppingCart: IEvent[];
  }) {
    return (
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Container fixed>
          {shoppingCart?.map((cartItem: IEvent) => (
            <EventCard
              key={cartItem._id}
              _id={cartItem._id}
              startDate={cartItem.startTime}
              endDate={cartItem.endTime}
              title={cartItem.title}
              flyerFront={cartItem.flyerFront}
              location={cartItem.venue}
            />
          ))}
          <Box textAlign="center">
            <Button id="getTickets" variant="outlined">
              Get Tickets
            </Button>
          </Box>
        </Container>
      </Drawer>
    );
  }

  export default CartDrawer;