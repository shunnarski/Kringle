import {Gift, GiftTransaction} from './Models/gift';
import {GIFTS} from './mock-gifts'
import {MOCK_USER1, MOCK_USER2, MOCK_USER3} from './mock-user';

export const MOCK_GIFT_TRANSACTIONS: GiftTransaction[] = [
    {gift: GIFTS[1], giver: MOCK_USER2, receiver: MOCK_USER1},
    {gift: GIFTS[0], giver: MOCK_USER1, receiver: MOCK_USER2},
    {gift: GIFTS[2], giver: MOCK_USER3, receiver: MOCK_USER1},
    {gift: GIFTS[3], giver: MOCK_USER1, receiver: MOCK_USER3}
]