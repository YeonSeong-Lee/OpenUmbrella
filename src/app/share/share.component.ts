import { Component } from '@angular/core';
import { QRService } from '../qr.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent {
  constructor(private qrService: QRService) {}

  ngOnInit() {
    this.qrService.startScan();
  }

  ngOnDestroy() {
    this.qrService.stopScan();
  }
}
