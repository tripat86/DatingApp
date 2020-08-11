import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_services/Alertify.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: Photo[];
  constructor(private adminService: AdminService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  private getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos: Photo[]) => {
      this.photos = photos;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updatePhotoStatus(photoId: number, status: string) {
    this.adminService.updatePhotoStatus(photoId, status).subscribe(() => {
      const index = this.photos.indexOf(this.photos.find(el => el.id === photoId));
      if (index > -1) {
        this.photos.splice(index, 1);
      }
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
