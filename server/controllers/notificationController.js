import Notification from './../models/Notification';
import TaskRunner from './../services/task-runner';

export default class NotificationController {
    constructor() {
        this.taskRunner = new TaskRunner('mongodb://localhost:27017/notificationdb');
    }

    save = (req, res) => {
        const { id } = req.body;
        Notification.findById(id).exec()
            .then(notification => {
                if (notification) {
                    this.modify(req.body, res).then((doc) => {
                        this.taskRunner.stopJob(doc._id);
                        this.sendResponse(res, true);
                    });;
                } else {
                    this.createNew(req.body).then(() => {
                        this.sendResponse(res, true);
                    });
                }
            });

    }

    modify = (notification) => {
        return Notification.findByIdAndUpdate(notification.id, {
            ...notification,
            isRunning: false
        });
    }

    createNew = (notification) => {
        return Notification.create({
            ...notification,
            isRunning: false
        })

    }

    getUsersNotifications = (req, res) => {
        const { id } = req.params;

        Notification.find({ userId: id }).exec()
            .then((notifications) => {
                const promises = notifications
                    .map(element => this.taskRunner.modifyNotification(id, element));
                Promise
                    .all(promises)
                    .then((data) => {
                        this.sendResponse(res, true, data);
                    });

            });
    }

    getNotification = (req, res) => {
        const { id } = req.params;
        Notification.findById(id).exec()
            .then((notification) => {
                this.taskRunner.modifyNotification(id, notification).then(data => {
                    this.sendResponse(res, true, data);
                })

            });
    }

    toggleNotification = (req, res) => {
        const { id } = req.params;
        Notification.findById(id).exec()
            .then((notification) => {
                notification.isRunning = !notification.isRunning;
                notification.save();
                if (notification.isRunning) {
                    this.taskRunner.startJob(notification);
                } else {
                    this.taskRunner.stopJob(notification._id);
                }
                this.taskRunner
                    .modifyNotification(notification.userId, notification)
                    .then((modifiedNotification) => {
                        this.sendResponse(res, true, modifiedNotification);
                    })

            });
    }

    deleteNotification = (req, res) => {
        const { id } = req.params;
        Notification.findByIdAndRemove(id).exec()
            .then((notification) => {
                this.taskRunner.stopJob(notification._id);
                this.sendResponse(res, true);

            });
    }

    sendResponse = (res, success, data = null) => {
        res
            .status(200)
            .json({ success, data: data });
    }
};