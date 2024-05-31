import { Injectable } from '@angular/core';
import { NotifierService } from './notifier.service';
import  emailjs  from 'emailjs-com';
//import {EmailJS_IDs} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  from_email: string;
  to_email: string;
  filename: string;


  constructor(private notifier: NotifierService) { }

  /*
  sendEmail(email: string, to_email: string, filename: string) {
    emailjs.send(EmailJS_IDs.email_service, EmailJS_IDs.email_template, {
      from_email: email,
      to_email: to_email,
      filename: filename
    }, EmailJS_IDs.user_key)
      .then(() => {
        this.notifier.showNotification("Invitation has been sent to "+ to_email +" successfully!", "OK");
      })
      .catch(error => {
        this.notifier.showNotification(error, "DISMISS");
      });
  }*/



}
