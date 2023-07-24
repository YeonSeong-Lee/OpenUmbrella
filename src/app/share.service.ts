import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  public async LendOrReturnUmbrella(umbrellaId: number) {
    const url = `${environment.api}/umbrella/${umbrellaId}`;
    // TODO: use observable instead of promise, implement error handling, implement debounce
    // const result = await fetch(url, { method: 'POST' });
    console.log(url, 'called');
    // TODO: get result from server
    return { success: true, message: 'lending success' };
  }
}
