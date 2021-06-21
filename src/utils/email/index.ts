// send mail with defined transport object
import { mailer } from './config'
import log from '../log'

const plainMail = async (subject: string, html: string, reciever: string) => {
    return mailer.sendMail({
        from: '"info" <foo@example.com>', // sender address
        to: reciever,
        subject: subject,
        html: html,
    }).then(() => {
        return true;
    }).catch((e) => {
        log.warn('sending mail failed')
        return false;

    });
}
export default plainMail;