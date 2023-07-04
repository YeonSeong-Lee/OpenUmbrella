import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainComponent } from './rain/rain.component';

const routes: Routes = [
  { path: '', redirectTo: '/rain', pathMatch: 'full' },
  { path: 'rain', component: RainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
