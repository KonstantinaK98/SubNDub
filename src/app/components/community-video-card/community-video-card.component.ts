import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { YoutubeVideoDetails } from 'src/app/models/youtube/youtube-response.model';
import { PlaceABidComponent } from '../dialog-modal/place-a-bid/place-a-bid.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';
import { take } from 'rxjs';

@Component({
  selector: 'community-video-card',
  templateUrl: './community-video-card.component.html',
  styleUrls: ['./community-video-card.component.css']
})
export class CommunityVideoCardComponent implements OnInit {
  @Input() videoId: string;
  @Input() userEmail: string;
  @Input() userId: string;
  @Input() videoDetails: YoutubeVideoDetails;
  @Input() communityRequestDetails: any;
  @Output() editVideoEmitter: EventEmitter<any> = new EventEmitter<any>;
  @Output() deleteVideoEmitter: EventEmitter<string> = new EventEmitter<string>;
  @Output() requestCommunityHelpEmitter: EventEmitter<string> = new EventEmitter<string>;

  publishDate: string;

  constructor(public dialog: MatDialog, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.publishDate = this.timeSince(new Date(this.videoDetails?.snippet?.publishedAt));
  }

  editVideo(requestDetails: any): void {
    this.editVideoEmitter.emit(requestDetails);
  }

  openPlaceABid(requestDetails: any, videoTitle: string, filename: string): void {
    this.dialog.open(PlaceABidComponent,{width:'550px', height: '430px', data: { language:requestDetails.language, videoTitle, videoId: this.videoId, requestedByID: requestDetails.requestedByID, filename, requestDetails, userEmail:this.userEmail}}).afterClosed().pipe(take(1)).subscribe(dialog => {
      if (dialog === (null || undefined )){ 
        this.dialog.closeAll();
      }else if (dialog && dialog.yourBidAmount>0) {
        this.notifier.showNotification("Offer has been successfully sent to the requestor.","OK");
      }
      
    });
  }

  timeSince(date: Date): string {

    let seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}


