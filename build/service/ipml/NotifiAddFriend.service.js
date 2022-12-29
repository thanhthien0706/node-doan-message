"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const NotifiAddFriend_repository_1 = __importDefault(require("../../repository/NotifiAddFriend.repository"));
class NotifiAddFriendService {
    async createNotifiInvitation(notifiModel) {
        const checkExist = await this.checkInvitationExist(notifiModel.requester, notifiModel.receiver);
        if (checkExist) {
            throw new http_errors_1.default.Conflict("Notification Invitaion already exists");
        }
        const result = await NotifiAddFriend_repository_1.default.createNotifi(notifiModel);
        if (result) {
            return result;
        }
        throw new http_errors_1.default.NotImplemented("Not Create Notification AddFriend");
    }
    async checkInvitationExist(requesterId, receiverId) {
        let check = false;
        const result = await NotifiAddFriend_repository_1.default.findAddFriend(requesterId, receiverId);
        if (result) {
            check = true;
        }
        return check;
    }
    async removeInvitaion(requesterId, receiverId) {
        const result = await NotifiAddFriend_repository_1.default.deleteInvitation(receiverId, requesterId);
        if (!result) {
            throw new http_errors_1.default.Conflict("Not Delete Invitation Add Friend");
        }
        return true;
    }
    async showAllNotifiAddFriend(meId) {
        const users = await NotifiAddFriend_repository_1.default.findAllWithMeId(meId);
        if (users.length === 0) {
            throw new http_errors_1.default.NotFound(`User with id ${meId} not have notification addfriend`);
        }
        if (!users) {
            throw new http_errors_1.default.NotFound(`User with id ${meId} find errors`);
        }
        return users;
    }
}
exports.default = new NotifiAddFriendService();
