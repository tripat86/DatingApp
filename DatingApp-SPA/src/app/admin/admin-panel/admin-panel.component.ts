import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/Auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}
