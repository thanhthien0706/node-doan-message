import { Types } from "mongoose";

export interface sendInvitationFriendDto {
  description?: string;
  receiver?: string;
  requester?: string;
}

export interface createAddFriend {}
