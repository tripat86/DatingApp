import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "src/app/_models/user";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/Alertify.service";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryImageSize,
} from "ngx-gallery-9";
import { TabsetComponent } from "ngx-bootstrap/tabs/public_api";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"],
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild("memberTabs", { static: true }) memberTabs: TabsetComponent;
  messageTabVav: boolean;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
    this.galleryOptions = [
      {
        width: "400px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();

    this.route.queryParams.subscribe((params) => {
      const selectedTab = params["tab"];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  getImages() {
    const images = [];
    for (const photo of this.user.photos) {
      if (photo.isApproved) {
        images.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description,
        });
      }
    }
    return images;
  }
}

// loadUser() {
//   debugger;
//   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
//     this.user = user;
//   }, error => {
//     this.alertify.error(error);
//   }, () => {

//   })
// }
