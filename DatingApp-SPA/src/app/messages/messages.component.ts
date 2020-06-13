import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/Auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private alertifyService: AlertifyService,
              private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe((data: PaginatedResult<Message[]>) => {
        this.messages = data.result;
        this.pagination = data.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number, event) {
    event.stopPropagation();
    this.alertifyService.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(result => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertifyService.success('Message has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete the message');
      });
    });
  }
}
