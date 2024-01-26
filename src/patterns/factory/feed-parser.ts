import { Feed } from './feed';

export abstract class FeedParser {
  parse: (feed: Feed) => Promise<Array<any>>;
}
