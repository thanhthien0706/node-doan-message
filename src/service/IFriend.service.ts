export interface IFriendService {
  addFriend(meId: string, friendId: string): Promise<boolean>;

  findFriendById(id: string): Promise<any>;

  checkUserExist(id: string): Promise<boolean>;

  checkAddedFriend(idUser: string, idFriend: string): Promise<boolean>;

  searchFriend(meId: string, searchText: string): Promise<any>;
}
