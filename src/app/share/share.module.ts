import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from '../share/share.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ShareComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatDividerModule, MatButtonModule],
})
export class ShareModule {}
