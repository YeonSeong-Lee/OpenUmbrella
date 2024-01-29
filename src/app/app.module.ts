/* Module */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from './share/share.module';
import { HistoryModule } from './history/history.module';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RainComponent } from './rain/rain.component';
import { DeveloperComponent } from './developer/developer.component';
import { ContributorComponent } from './contributor/contributor.component';

/* Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* Component */
import { LoginComponent } from './login/login.component';
import { JwtComponent } from './login/jwt/jwt.component';

/* Interceptor */
import { HttpErrorInterceptor } from './http-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RainComponent,
    DeveloperComponent,
    ContributorComponent,
    LoginComponent,
    JwtComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    ShareModule,
    HistoryModule,
    NgxGoogleAnalyticsModule.forRoot('G-X5K9PQFDJH'),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpErrorInterceptor,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
