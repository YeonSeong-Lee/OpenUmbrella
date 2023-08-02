import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainComponent } from './rain/rain.component';
import { DeveloperComponent } from './developer/developer.component';
import { ContributorComponent } from './contributor/contributor.component';
import { ShareComponent } from './share/share.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
import { JwtComponent } from './login/jwt/jwt.component';

const routes: Routes = [
  { path: '', redirectTo: '/rain', pathMatch: 'full' },
  { path: 'rain', component: RainComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'contributor', component: ContributorComponent },
  { path: 'share/:id', component: ShareComponent },
  { path: 'share', component: ShareComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent },
  { path: 'history/:id', component: HistoryDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jwt', component: JwtComponent },
  { path: '**', redirectTo: '/rain' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
