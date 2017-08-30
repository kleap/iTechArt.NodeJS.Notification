import express from 'express';
import Notification from './../models/Notification';
import NotificationManager from './../services/notification-manager';

let router = express.Router();

router.post('/', (req, res) => {
    const {
        id,
        userId,
        theme,
        message,
        interval,
        startTime
    } = req.body;

    Notification
        .findById(id)
        .exec()
        .then(notification => {
            if (notification) {
                notification.theme = theme;
                notification.message = message;
                notification.startTime = startTime;
                notification.interval = interval;
                notification.save();
                res
                    .status(200)
                    .json({success: true});
            } else {
                Notification.create({
                    userId,
                    isRunning: false,
                    theme,
                    message,
                    interval,
                    startTime: new Date()
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
            res
                .status(200)
                .json({success: true, data: notifications});
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
            res
                .status(200)
                .json({success: true});
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