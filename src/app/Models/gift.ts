import {User} from './user';
export class Gift {
    user_id: string;
    id: number;
    name: string;
    price: number;
    link_url: string;
    photo_url: string;
    server: string;

    constructor() {
        this.user_id = "";
        this.id = 0;
        this.name = "";
        this.price = 0.0;
        this.link_url = "";
        this.photo_url = "";
        this.server = "";
    }
}


export class GiftTransaction {
    gift: Gift;
    giver: User;
    receiver: User;
    
    constructor(gift, giver, receiver) {
        this.gift = gift;
        this.giver = giver;
        this.receiver = receiver;
    }
}