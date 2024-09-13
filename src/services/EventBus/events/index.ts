import { EVENT_TYPES, ExtendedBookings } from './types';
import eventBus from '..';
import { databaseConnector } from '../../../db/connector';

export function eventNotificationsHandler() {
  console.info('Starting eventNotificationsHandler function');

  try {
    eventBus.on(EVENT_TYPES.BOOKING_CREATED, async (booking: ExtendedBookings) => {
      const currentUserId = booking.userId;
      const receiverId = booking.storage.owner.id;
      // Craft the message
      const message = `
       Dear ${booking.storage.owner.name},

       We are happy to inform you that your storage space at ${
         booking.storage.address
       } has been booked.

       Booking Details:
       Customer Name: ${booking.user.name}
       Start Date: ${new Date(booking.startDate).toLocaleDateString()}
       End Date: ${new Date(booking.endDate).toLocaleDateString()}
       
       Thank you
     `;

      await databaseConnector.chat.create({
        data: {
          senderId: currentUserId,
          receiverId: receiverId,
          message,
        },
      });
    });
  } catch {
    /* empty */
  }
}
