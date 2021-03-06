import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {
  AccordionDemoModule,
  ActionButtonDemoModule,
  AlertBoxDemoModule,
  AutoCompleteDemoModule,
  BadgeDemoModule,
  BreadcrumbsDemoModule,
  CalendarDemoModule,
  CarouselDemoModule,
  CheckboxGroupDemoModule,
  DataTableDemoModule,
  DatePickerDemoModule,
  DialogDemoModule,
  DraggableDemoModule,
  EllipsisDemoModule,
  FileUploadDemoModule,
  FlowStepDemoModule,
  IcomoonDemoModule,
  ImageUploadDemoModule,
  InfiniteScrollDemoModule,
  ModalDemoModule,
  NotifyDemoModule,
  OverlayDemoModule,
  PagerDemoModule,
  PaginationDemoModule,
  PopoverDemoModule,
  ProgressBarDemoModule,
  RadioGroupDemoModule,
  RatingDemoModule,
  SelectDemoModule,
  SelectButtonDemoModule,
  SwitchDemoModule,
  SliderDemoModule,
  TabsDemoModule,
  TagsDemoModule,
  TimePickerDemoModule,
  TooltipDemoModule,
  TreeViewDemoModule,
  ValidatorsDemoModule
} from './index';
import {RoutesModule} from './demo.routes';
import {DemoComponent} from './demo.component';
import {DocComponent} from './doc/doc.component';
import {DocContentComponent} from './doc/doc-content.component';
import {DemoService} from './demo.service';

@NgModule({
  imports: [
    SharedModule,
    RoutesModule,
    AccordionDemoModule,
    ActionButtonDemoModule,
    AlertBoxDemoModule,
    AutoCompleteDemoModule,
    BadgeDemoModule,
    BreadcrumbsDemoModule,
    CalendarDemoModule,
    CarouselDemoModule,
    CheckboxGroupDemoModule,
    DataTableDemoModule,
    DatePickerDemoModule,
    DialogDemoModule,
    DraggableDemoModule,
    EllipsisDemoModule,
    FileUploadDemoModule,
    FlowStepDemoModule,
    IcomoonDemoModule,
    ImageUploadDemoModule,
    InfiniteScrollDemoModule,
    ModalDemoModule,
    NotifyDemoModule,
    OverlayDemoModule,
    PagerDemoModule,
    PaginationDemoModule,
    PopoverDemoModule,
    ProgressBarDemoModule,
    RadioGroupDemoModule,
    RatingDemoModule,
    SelectDemoModule,
    SelectButtonDemoModule,
    SwitchDemoModule,
    SliderDemoModule,
    TabsDemoModule,
    TagsDemoModule,
    TimePickerDemoModule,
    TooltipDemoModule,
    TreeViewDemoModule,
    ValidatorsDemoModule
  ],
  providers: [
    DemoService
  ],
  declarations: [
    DemoComponent,
    DocComponent,
    DocContentComponent,
  ],
})
export class DemoModule {

}
