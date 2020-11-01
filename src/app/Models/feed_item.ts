import {Gift} from './gift';
import {User} from './user';

export class FeedItem {
    user: User;
    gift: Gift;
    feed_item: Object;
    feed_item_type: string;
    unix_timestamp: number;
    date_timestamp: Date;

    constructor(feed_item) {
        this.feed_item = feed_item;
        this.unix_timestamp = Date.now();
        this.date_timestamp = new Date(this.unix_timestamp);
        this.feed_item_type = feed_item.feed_item_type;
    }
}

export class FeedItemUserAddsGift {
    user: User;
    gift: Gift;
    feed_item_type: string = "FeedItemUserAddsGift";
}

export class FeedItemUserGiftTransaction {
    giver: User;
    receiver: User;
    gift: Gift;
    feed_item_type: string = "FeedItemUserGiftTransaction";
}