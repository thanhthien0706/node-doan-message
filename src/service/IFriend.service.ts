import { sendInvitationFriendDto } from "../dto/request/FriendDTO";

export interface IFriendService {
  sendInvitationFriend(notifiModel: sendInvitationFriendDto): Promise<boolean>;

  addFriend(meId: string, friendId: string, status: boolean): Promise<boolean>;

  findFriendById(id: string): Promise<any>;

  checkUserExist(id: string): Promise<boolean>;

  checkAddedFriend(idUser: string, idFriend: string): Promise<boolean>;

  searchFriend(meId: string, searchText: string): Promise<any>;

  findAllFriend(meId: string): Promise<any>;
}
