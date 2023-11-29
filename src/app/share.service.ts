import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  headerOptions = {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + this.getCookie('jwt_token'),
    },
  };


  // TODO: 추후 refactoring 필요, http client의 interceptor를 사용하면 좋을듯
  public async LendOrReturnUmbrella(umbrellaId: number) {
    const userName = await fetch(`${environment.api}/me`, this.headerOptions).then((res) => res.json());
    if (!userName) {
      alert('Please login first');
      return;
    }
    const userStatus = await fetch(`${environment.api}/users/${userName}`, this.headerOptions).then((res) => res.json());

    // *** 대출일때 반납 시작***
    if (userStatus.status === 'borrowed') {
      if (userStatus.umbrella?.id !== umbrellaId) {
        alert('You can only return the umbrella you borrowed');
        return;
      }
      const result = await fetch(`${environment.api}/umbrellas/return/?umbrella_id=${umbrellaId}`, {
        method: 'POST',
        ...this.headerOptions,
      }).then((res) => res.json());

      if (result.user_name) {
        alert(`Return successfully: ${umbrellaId}`);
        return;
      } else {
        alert(`Return failed: ${result.detail[0].msg}`);
        return;
      }
    }

    // *** 대출일때 반납 끝 ***

    // *** 대출이 아닐때 대출 시작 ***
    if (userStatus.status === 'available') {
      const result = await fetch(`${environment.api}/umbrellas/borrow?umbrella_id=${umbrellaId}`, {
        method: 'POST',
        ...this.headerOptions,
      }).then((res) => res.json());

      if (result.user_name) {
        alert(`Borrow successfully: ${umbrellaId}`);
        return;
      } else {
        alert(`Borrow failed: ${result.detail}`);
        return;
      }

    }
    // *** 대출이 아닐때 대출 끝 ***
  }

  public async returnUmbrella(umbrellaId: number) {
    const result = await fetch(`${environment.api}/umbrellas/return?umbrella_id=${umbrellaId}`, {
      method: 'POST',
      ...this.headerOptions,
    }).then((res) => res.json());

    if (result.user_name) {
      alert(`Return successfully: ${umbrellaId}`);
      return;
    } else {
      alert(`Return failed: ${result.detail[0].msg}`);
      return;
    }
  }

  private getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift();
    }
    return null;
  }

  public getMyNickname() {
    return fetch(`${environment.api}/me`, this.headerOptions).then((res) => res.json());
  }

  public async getMyUmbrella(nickname: string): Promise<number | undefined> {
    const result = fetch(`${environment.api}/users/${nickname}`, this.headerOptions).then((res) => res.json());
    const myUmbrella = (await result).umbrella;
    return myUmbrella?.id;
  }
}
