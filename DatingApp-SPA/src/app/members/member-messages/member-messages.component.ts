import { Component, OnInit, Input } from "@angular/core";
import { Message } from "src/app/_models/message";
import { AuthService } from "src/app/_services/Auth.service";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/Alertify.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-member-messages",
  templateUrl: "./member-messages.component.html",
  styleUrls: ["./member-messages.component.css"],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  message: any = {};
  sendMessageForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.sendMessageForm = new FormGroup({
      sendMessageTxt: new FormControl("", Validators.required),
    });

    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        })
      )
      .subscribe(
        (messages) => {
          this.messages = messages;
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }

  sendMessage() {
    if (this.sendMessageForm.valid) {
      this.message.recipientId = this.recipientId;
      this.message.content = this.sendMessageForm.get("sendMessageTxt").value;

      this.userService
        .addMessage(this.authService.decodedToken.nameid, this.message)
        .subscribe((message: Message) => {
          debugger;
          this.messages.unshift(message);
          this.sendMessageForm.reset();
        });
    }
  }
}
