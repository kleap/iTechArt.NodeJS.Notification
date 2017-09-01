import express from 'express';
import NotificationController from './../controllers/notificationController';

let router = express.Router();

var notificationController = new NotificationController();

router.post('/', notificationController.save);
router.get('/:id', notificationController.getUsersNotifications);
router.get('/item/:id', notificationController.getNotification);
router.post('/item/:id', notificationController.toggleNotification);
router.delete('/item/:id', notificationController.deleteNotification);

export default router;