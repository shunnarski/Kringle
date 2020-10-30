
// import {Profile} from './profile';
import {Gift} from './gift';
export class User {
    user_id: string;
    profile: Profile;
    followers: User[];
    following: User[];
    gifts_given: Gift[];
    gifts_received: Gift[];
    gift_list: Gift[];

    constructor() {
        this.user_id = "";
        this.profile = null;
        this.followers = null;
        this.following = null;
        this.gifts_given = null;
        this.gifts_received = null;
        this.gift_list = null;
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