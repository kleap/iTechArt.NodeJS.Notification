import Agenda from 'agenda';
import { MongoClient } from 'mongodb';
import { SEND_EMAIL_JOB_NAME } from './constants';
import mongoose from 'mongoose';
import moment from 'moment';

export default class TaskRunner {
    constructor(uri) {
        this.uri = uri;
        MongoClient.connect(uri, (error, db) => {
            this.agenda = new Agenda().mongo(db, 'jobs');
            this.defineJob();

            this
                .agenda
                .start();
        })

    }

    defineJob() {
        this
            .agenda
            .define(SEND_EMAIL_JOB_NAME, {
                priority: 'high',
                concurrency: 100
            }, function (job, done) {
                const { theme, message } = job.attrs.data;
                console.log('theme: ' + theme + '\nmessage: ' + message);
                done();
            });

    }

    startJob(notification) {
        if (!this.isJobRunning(notification._id)) {
            var notificationReport = this
                .agenda
                .create(SEND_EMAIL_JOB_NAME, notification);
            notificationReport
                .repeatEvery(notification.interval * 1000 * 60)
                .save();
        }

    }

    modifyNotification(userId, notification) {
        return mongoose
            .connection
            .collection('jobs')
            .findOne({ 'data.userId': userId, 'data._id': notification._id })
            .then((job) => {
                if (job) {
                    const modifiedNotification = {
                        ...notification._doc,
                        lastTime: moment(job.lastRunAt).format('MMMM Do YYYY, h:mm:ss a'),
                        nextTime: moment(job.lastRunAt)
                            .add(job.repeatInterval, 'ms')
                            .format('MMMM Do YYYY, h:mm:ss a')
                    };
                    return modifiedNotification;
                } else {
                    return notification;
                }
            });
    }

    stopJob(notificationId) {
        this
            .agenda
            .cancel({ 'data._id': notificationId });
    }

    isJobRunning(id) {
        this
            .agenda
            .jobs({
                data: {
                    _id: id
                }
            }, function (err, jobs) {
                return !!jobs;
            });
    }

}