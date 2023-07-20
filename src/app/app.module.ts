import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ShareModule } from "./share/share.module";
import { HistoryModule } from "./history/history.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RainComponent } from "./rain/rain.component";
import { DeveloperComponent } from "./developer/developer.component";
import { ContributorComponent } from "./contributor/contributor.component";

/* Material */
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    RainComponent,
    DeveloperComponent,
    ContributorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ShareModule,
    HistoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
