import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Html5Qrcode } from 'html5-qrcode';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  private html5QrcodeScanner!: Html5Qrcode;

  private config = { fps: 100, qrbox: 300 };

  public startScan() {
    console.log('startScan');
    this.html5QrcodeScanner = new Html5Qrcode('reader');
    this.html5QrcodeScanner.start(
      { facingMode: 'environment' },
      this.config,
      this.onScanSuccess,
      this.onScanError,
    );
  }

  public stopScan() {
    this.html5QrcodeScanner.stop();
    this.html5QrcodeScanner.clear();
  }

  private onScanSuccess(decodedText: string, decodedResult: any) {
    console.log(`Code scanned -> ${decodedText}`);
    this.html5QrcodeScanner.stop();
    this.html5QrcodeScanner.clear();
  }

  private onScanError(error: any) {
    console.warn(error);
    this.html5QrcodeScanner.stop();
    this.html5QrcodeScanner.clear();
  }
}
