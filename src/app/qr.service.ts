import { Injectable } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor(private shareService: ShareService) { }

  private html5QrcodeScanner!: Html5Qrcode;

  private config = { fps: 100, qrbox: 300 };

  public startQRCamera() {
    this.html5QrcodeScanner = new Html5Qrcode('reader');
    this.html5QrcodeScanner.start(
      { facingMode: 'environment' },
      this.config,
      () => { },  // Empty callback to do nothing on scan success
      undefined,
    );
  }

  public async startQRScan() {
    await this.html5QrcodeScanner.stop();
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
    await this.shareService.LendOrReturnUmbrella(umbrellaID);
  }
}


