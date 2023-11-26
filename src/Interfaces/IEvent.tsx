export interface IEvent {
    _id: number;
    venue: {
      name: string;
      direction: string;
    };
    city: string;
    country: string;
    startTime: Date;
    endTime: Date;
    flyerFront: string;
    title: string;
    date: Date;
  }