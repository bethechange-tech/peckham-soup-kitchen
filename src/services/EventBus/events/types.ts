import { Booking, Storage, User } from '@prisma/space-quest';

export enum EVENT_TYPES {
  BOOKING_CREATED = 'BOOKING_CREATED',
}

interface ExtendedStorage extends Storage {
  owner: User;
}

export interface ExtendedBookings extends Booking {
  storage: ExtendedStorage;
  user: User;
}
