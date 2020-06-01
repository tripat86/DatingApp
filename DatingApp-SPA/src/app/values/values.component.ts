import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from '../_models/Value';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: Value[];
  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe((response: any) => {
      this.values = response;
      this.alertifyService.success('values received');
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
