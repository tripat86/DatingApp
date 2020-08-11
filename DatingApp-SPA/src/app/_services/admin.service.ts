import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }

  updateUserRoles(user: User, values: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, values);
  }

  getPhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/photosForApproval');
  }

  updatePhotoStatus(photoId: number, status: string) {
    return this.http.post(this.baseUrl + 'admin/photoStatusUpdate/' + photoId + '/' + status, {});
  }
}
