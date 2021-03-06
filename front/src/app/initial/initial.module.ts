import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InitialRoutingModule } from './initial-routing.module';
import { InitialComponent } from './initial.component';

@NgModule({
  declarations: [InitialComponent],
  imports: [CommonModule, InitialRoutingModule, MatProgressSpinnerModule],
})
export class InitialModule {}
