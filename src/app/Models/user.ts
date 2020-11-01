
// import {Profile} from './profile';
import {Gift, GiftTransaction} from './gift';
import {FeedItem} from './feed_item';
export class User {
    user_id: string;
    profile: Profile;
    followers: User[];
    following: User[];
    gifts_given: GiftTransaction[];
    gifts_received: GiftTransaction[];
    gift_list: Gift[];
    feed_items: FeedItem[];

    constructor() {
        this.user_id = "";
        this.profile = null;
        this.followers = null;
        this.following = null;
        this.gifts_given = null;
        this.gifts_received = null;
        this.gift_list = null;
        this.feed_items = null;
    }
}

export class Profile {
    username: string;
    first_name: string;
    last_name: string;
    bio: string;
    interests: string[];
    banner_img_url: string;
    profile_img_url: string;

    constructor() {
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.bio = "";
        this.interests = null;
        this.banner_img_url = "";
        this.profile_img_url = "";
    }
}