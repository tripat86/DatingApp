import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/Auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'DatingApp-SPA';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername();

    const user: User = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.authService.photoUrl.next(user.photoUrl);
    }
  }
}
