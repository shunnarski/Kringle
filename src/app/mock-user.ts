import {User, Profile} from './Models/user';
import {Gift} from './Models/gift';
import {GIFTS} from './mock-gifts';

const MOCK_PROFILE1: Profile = {
    username: "shunnarski",
    first_name: "Alec",
    last_name: "Shunnarah",
    bio: "Just a developer trying to make positive changes",
    interests: ["Guitar", "Entrepreneurship", "Video Games", "PC", "Auburn Football"],
    banner_img_url: "assets/images/example_banner_pic.jpg",
    profile_img_url: "assets/images/example_profile_pic.jpg"
}

const MOCK_PROFILE2: Profile = {
    username: "martysleeze",
    first_name: "Evan",
    last_name: "Kiser",
    bio: "One big poop",
    interests: ["Tennis", "Soccer", "Entrepreneurship", "Video Games", "Xbox", "Auburn Football"],
    banner_img_url: "assets/images/example_banner_pic.jpg",
    profile_img_url: "assets/images/example_profile_pic.jpg"
}

const MOCK_PROFILE3: Profile = {
    username: "alecsgf",
    first_name: "Rachael",
    last_name: "Demers",
    bio: "Live, Laugh, Love <3",
    interests: ["TikTok w/ Alec", "ER Nursing", "Baking", "Curb Your Enthusiasm", "Cooking for Alec", "Cleaning"],
    banner_img_url: "assets/images/example_banner_pic.jpg",
    profile_img_url: "assets/images/example_profile_pic.jpg"
}

export const MOCK_USER1: User = {
    user_id: "1234",
    followers: [MOCK_USER2, MOCK_USER3],
    following: [MOCK_USER2, MOCK_USER3],
    gift_list: GIFTS,
    gifts_given: [],
    gifts_received: [],
    profile: MOCK_PROFILE1
}

var MOCK_USER2: User = {
    user_id: "3214",
    followers: [MOCK_USER1, MOCK_USER3],
    following: [MOCK_USER1, MOCK_USER3],
    gift_list: GIFTS,
    gifts_given: [],
    gifts_received: [],
    profile: MOCK_PROFILE2
}

var MOCK_USER3: User = {
    user_id: "4312",
    followers: [MOCK_USER1, MOCK_USER2],
    following: [MOCK_USER1, MOCK_USER2],
    gift_list: GIFTS,
    gifts_given: [],
    gifts_received: [],
    profile: MOCK_PROFILE3
}
