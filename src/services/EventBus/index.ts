import { EventEmitter } from 'events';
import { Readable } from 'stream';

export class EventBus extends EventEmitter {
  createJSONDataStream<T>(dataArray: T[]): Readable {
    const readable = new Readable({
      objectMode: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      read() {},
    });

    dataArray.forEach((data) => readable.push(data));

    readable.push(null); // Signal the end of the stream

    return readable;
  }
}

const eventBus = new EventBus();

export default eventBus;
