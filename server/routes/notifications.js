import express from 'express';
import Notification from './../models/Notification';
import TaskRunner from './../services/task-runner';

let router = express.Router();
let taskRunner = new TaskRunner('mongodb://localhost:27017/notificationdb');

router.post('/', (req, res) => {
    const {id, userId, theme, message, interval} = req.body;

    Notification
        .findById(id)
        .exec()
        .then(notification => {
            if (notification) {
                Notification.findByIdAndUpdate(id, {
                    theme,
                    message,
                    interval,
                    isRunning: false
                }, (err, doc) => {
                    taskRunner.stopJob(id);
                });

                res
                    .status(200)
                    .json({success: true});
            } else {
                Notification.create({
                    userId,
                    theme,
                    message,
                    interval,
                    isRunning: false
                }, (error, notification) => {
                    if (error) {
                        res
                            .status(400)
                            .json({error: 'Cant save in db', notification});
                    } else {
                        res
                            .status(200)
                            .json({success: true});
                    }
                });
            }
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Notification
        .find({userId: id})
        .exec()
        .then((notifications) => {
            const promises = [];
            for (var i = 0; i < notifications.length; i++) {
                promises.push(taskRunner.modifyNotification(id, notifications[i]));
            };
            Promise
                .all(promises)
                .then((data) => {
                    res
                        .status(200)
                        .json({success: true, data: data});
                });

        });

});

router.get('/item/:id', (req, res) => {
    const {id} = req.params;
    Notification
        .findById(id)
        .exec()
        .then((notification) => {
            res
                .status(200)
                .json({success: true, data: notification});
        });
});

router.post('/item/:id', (req, res) => {
    const {id} = req.params;
    Notification
        .findById(id)
        .exec()
        .then((notification) => {
            notification.isRunning = !notification.isRunning;
            notification.save();
            if (notification.isRunning) {
                taskRunner.startJob(notification);
            } else {
                taskRunner.stopJob(notification._id);
            }
            taskRunner
                .modifyNotification(notification.userId, notification)
                .then((modifiedNotification) => {
                    res
                        .status(200)
                        .json({success: true, data: modifiedNotification});
                })

        });
});

router.delete('/item/:id', (req, res) => {
    const {id} = req.params;
    Notification
        .findByIdAndRemove(id)
        .exec()
        .then(() => {
            res
                .status(200)
                .json({success: true});
        });
});

export default router;