import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: String,
    theme: String,
    message: String,
    interval: Number,
    startTime: Date,
    isRunning: Boolean
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;