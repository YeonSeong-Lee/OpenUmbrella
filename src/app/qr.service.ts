import { Injectable } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor(private shareServie: ShareService) {}

  private html5QrcodeScanner!: Html5Qrcode;

  private config = { fps: 100, qrbox: 300 };

  public startScan() {
    this.html5QrcodeScanner = new Html5Qrcode('reader');
    this.html5QrcodeScanner.start(
      { facingMode: 'environment' },
      this.config,
      this.onScanSuccess.bind(this),
      undefined,
    );
  }

  public stopScan() {
    this.html5QrcodeScanner.stop();
    this.html5QrcodeScanner.clear();
  }

  private onScanSuccess(decodedText: string) {
    alert(`${decodedText}이 인식됨.\nQR 대출이 아직 준비중입니다. 7월 30일 출시 예정!`);
    const umbrellaID = parseInt(decodedText.slice(decodedText.lastIndexOf('/') + 1), 10);
    this.shareServie.LendOrReturnUmbrella(umbrellaID)
      .then(result => alert(result.message))
      .catch(error => alert(error.message));
    this.stopScan();
  }
}


