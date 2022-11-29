import { sendInvitationFriendDto } from "../dto/request/FriendDTO";

export interface INotifiAddFriendService {
  createNotifiInvitation(notifiModel: sendInvitationFriendDto): Promise<any>;

  checkInvitationExist(
    requesterId: string,
    receiverId: string
  ): Promise<boolean>;

  removeInvitaion(requesterId: string, receiverId: string): Promise<boolean>;

  showAllNotifiAddFriend(meId: string): Promise<any>;
}
