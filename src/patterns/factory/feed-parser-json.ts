import * as fs from 'fs';

import { Feed } from './feed';
import { FeedParser } from './feed-parser';

export class FeedParserJson implements FeedParser {
  private feed: Feed;

  parse(feed: Feed): Promise<Array<any>> {
    this.feed = feed;

    return new Promise((resolve, reject) => {
      try {
        const content = fs.readFileSync(this.feed.filePath).toString();
        const items = JSON.parse(content);
        resolve(items);
      } catch (err) {
        reject(this.translateFileReadError(err as Error));
      }
    });
  }

  private translateFileReadError(err: NodeJS.ErrnoException): Error {
    const message = `Failed to parse file ${this.feed.filePath} Cause: ${err.message}`;

    return err.code === 'ENOENT' ? new Error(message) : new Error(message);
  }
}
