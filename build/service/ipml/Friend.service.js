"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const Friend_repository_1 = __importDefault(require("../../repository/Friend.repository"));
const Friend_model_1 = __importDefault(require("../../model/Friend.model"));
const NotifiAddFriend_service_1 = __importDefault(require("./NotifiAddFriend.service"));
const Conversation_service_1 = __importDefault(require("./Conversation.service"));
const Utils_service_1 = __importDefault(require("./Utils.service"));
class FriendService {
    async sendInvitationFriend(notifiModel) {
        const notifi = await NotifiAddFriend_service_1.default.createNotifiInvitation(notifiModel);
        if (!notifi) {
            throw new http_errors_1.default.NotImplemented("Not create notification addFriend");
        }
        return true;
    }
    async addFriend(meId, friendId, status) {
        const resultDeleteNotifi = await NotifiAddFriend_service_1.default.removeInvitaion(meId, friendId);
        if (resultDeleteNotifi && status) {
            await Promise.all([
                this.createFriend(meId, friendId),
                this.createFriend(friendId, meId),
            ]);
            const conversationModel = {
                nameGroup: null,
                channelId: Utils_service_1.default.randomString(8),
                avatar: null,
                description: "Group chat of you",
                files: null,
                members: [meId, friendId],
                typeConversation: "single",
                isBlocked: false,
            };
            await Conversation_service_1.default.createConversation(conversationModel);
        }
        return true;
    }
    async createFriend(meId, friendId) {
        const checkAddFriend = await this.checkAddedFriend(meId, friendId);
        if (checkAddFriend) {
            throw (0, http_errors_1.default)(500, "You guys were friends");
        }
        const checkExist = await this.checkUserExist(meId);
        if (checkExist) {
            // update
            const result = await Friend_repository_1.default.updateFriend({
                me: meId,
            }, {
                $push: {
                    friends: {
                        friend: friendId,
                        isBlocked: false,
                    },
                },
            });
            if (!result) {
                throw (0, http_errors_1.default)(500, "Not Update User Add Friend");
            }
        }
        else {
            // crate new
            const friendModel = new Friend_model_1.default();
            friendModel.me = meId;
            friendModel.friends = {
                friend: friendId,
                isBlocked: false,
            };
            const result = await Friend_repository_1.default.addFriend(friendModel);
            if (!result) {
                throw (0, http_errors_1.default)(500, "Not Create User Add Friend");
            }
        }
    }
    async searchFriend(meId, searchText) {
        const result = await Friend_repository_1.default.searchFriend(meId, searchText);
        if (!result) {
            throw (0, http_errors_1.default)(500, "Can't find friend");
        }
        return result;
    }
    async findFriendById(id) { }
    async checkUserExist(id) {
        let check = false;
        const findFriend = await Friend_repository_1.default.findOneById(id);
        if (findFriend) {
            check = true;
        }
        return check;
    }
    async checkAddedFriend(idUser, idFriend) {
        let check = false;
        const result = await Friend_repository_1.default.checkExistFriend(idUser, idFriend);
        console.log(result);
        if (result) {
            check = true;
        }
        return check;
    }
    async findAllFriend(meId) {
        const friends = await Friend_repository_1.default.findAllById(meId);
        if (!friends) {
            throw new http_errors_1.default.NotFound("Friends of you is empty");
        }
        return friends;
    }
}
exports.default = new FriendService();
