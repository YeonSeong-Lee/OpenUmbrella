import { Injectable } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor(private shareServie: ShareService) {}

  private html5QrcodeScanner!: Html5Qrcode;

  private config = { fps: 1000, qrbox: 300 };

  public startScan() {
    this.html5QrcodeScanner = new Html5Qrcode('reader');
    this.html5QrcodeScanner.start(
      { facingMode: 'environment' },
      this.config,
      this.onScanSuccess.bind(this),
      undefined,
    );
  }

  public async stopScan() {
    await this.html5QrcodeScanner.stop();
    this.html5QrcodeScanner.clear();
  }

  private async onScanSuccess(decodedText: string) {
    await this.stopScan();
    const umbrellaID = Number(decodedText.slice(decodedText.lastIndexOf('/') + 1));
    await this.shareServie.LendOrReturnUmbrella(umbrellaID);
  }
}


