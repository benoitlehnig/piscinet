import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleCaseDirective} from '../title-case.directive'
import { TitleCasePipe } from '@angular/common';


@NgModule({
  declarations: [TitleCaseDirective],
  exports:[TitleCaseDirective],
  imports: [
    CommonModule
  ],
  providers:[TitleCasePipe]
})
export class MyCommonDirectivesModule { }
