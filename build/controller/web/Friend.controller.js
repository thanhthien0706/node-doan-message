"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
const Friend_service_1 = __importDefault(require("../../service/ipml/Friend.service"));
const NotifiAddFriend_service_1 = __importDefault(require("../../service/ipml/NotifiAddFriend.service"));
class FriendController {
    constructor() { }
    // [POST] /friend/send-invitation
    async sendInvitation(req, res, next) {
        try {
            const notifiModel = {
                description: req.body.description,
                receiver: req.body.receiver,
                requester: req.id,
            };
            const checkNotifi = await Friend_service_1.default.sendInvitationFriend(notifiModel);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Send Invatation successfully", ""));
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /friend/add?id=....
    async addFriendById(req, res, next) {
        try {
            const addFriend = await Friend_service_1.default.addFriend(req.id, req.query.id, req.query.status);
            if (!addFriend) {
                throw (0, http_errors_1.default)(500, "Add Friend Failed");
            }
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, `Handle Notification Invitaion With Statu ${req.query.status} successfully`, true));
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /friend/find?search=....
    async findFriend(req, res, next) {
        try {
            const searchText = req.query.search;
            const dataSearch = await Friend_service_1.default.searchFriend(req.id, searchText);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Search Friend Of You", dataSearch));
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /friend/all
    async showAllNotifiAddFriend(req, res, next) {
        try {
            const result = await NotifiAddFriend_service_1.default.showAllNotifiAddFriend(req.id);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Show All List Notification Add Friend", result));
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /friend/all-friend
    async showAllFriend(req, res, next) {
        try {
            const result = await Friend_service_1.default.findAllFriend(req.id);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Get List Friend Successfully", result));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new FriendController();
