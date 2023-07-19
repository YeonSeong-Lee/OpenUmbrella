import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainComponent } from './rain/rain.component';
import { DeveloperComponent } from './developer/developer.component';
import { ContributorComponent } from './contributor/contributor.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  { path: '', redirectTo: '/rain', pathMatch: 'full' },
  { path: 'rain', component: RainComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'contributor', component: ContributorComponent },
  { path: 'share', component: ShareComponent },
  { path: '**', redirectTo: '/rain' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
