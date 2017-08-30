import {sendMail} from './email-manager';

export default class NotificationSender {
    constructor(email, notification) {
        this.email = email;
        this.notification = notification;
        this.isActive = true;
    };

    start() {
        const {theme, message} = this.notification;
        const email = this.email;
        console.log(this.notification.interval * 60 * 1000);
        setInterval(function () {
            console.log('message sent - ' + email + ': ' + theme + '   ' + new Date());
            // sendMail(email, theme, message);
        }, this.notification.interval * 10 * 1000);
    }
}
