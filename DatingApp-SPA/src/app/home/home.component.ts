import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showHideRegister: boolean;
  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  toggleRegister() {
    this.showHideRegister = !this.showHideRegister;
  }
}
