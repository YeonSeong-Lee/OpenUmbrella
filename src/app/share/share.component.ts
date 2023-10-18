import { Component, OnInit, OnDestroy } from '@angular/core';
import { QRService } from '../qr.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareService } from '../share.service';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit, OnDestroy {
  umbrellNumberaList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

  avaiableUmbrellaNumberList = [];

  myUmbrellaNumber: number | undefined;

  umbrellaForm: FormGroup = this.formBuilder.group({
    selectedUmbrellaNumber: [null],
  });

  constructor(private qrService: QRService, private formBuilder: FormBuilder, private shareService: ShareService) { }

  async callApi() {
    const selectedUmbrellControl = this.umbrellaForm.get('selectedUmbrellaNumber');
    if (!selectedUmbrellControl) return;
    const selectedUmbrellaNumber = Number(selectedUmbrellControl.value);
    await this.shareService.LendOrReturnUmbrella(Number(selectedUmbrellaNumber));
  }

  async callReturnApi() {
    if (!this.myUmbrellaNumber) return;
    await this.shareService.returnUmbrella(this.myUmbrellaNumber);
  }

  startQRScan() {
    this.qrService.startQRScan();
  }


  ngOnInit() {
    this.qrService.startQRCamera();
    this.qrService.getAvaiableUmbrella().then((result) => {
      this.avaiableUmbrellaNumberList = result;
    });
    // TODO: refactoring, make backeend API that return myUmbrellaNumber
    this.shareService.getMyNickname().then((nickname) => {
      this.shareService.getMyUmbrella(nickname).then((result) => {
        this.myUmbrellaNumber = result;
      },
      );
    });
  }

  ngOnDestroy() {
    this.qrService.stopScan();
  }
}
