# Getting started 

> Native Angular directives for Bootstrap4


* [Angular](https://angular.io/) (requires `Angular` version 4.0.0 or higher)
* [Bootstrap CSS](http://getbootstrap.com/) (`bootstrap-sass` 4.0.0-beta.3)
* [DateFns](https://date-fns.org/) (`date-fns` 1.27.2 or higher. It is for `DatePicker` parse & format date)

*Notice*: `OnPush` @Input is recommended in `@hibiscus.js`, so use `Immutable.js` will be easy.

* Angular 4: version <= 0.0.23; Angular 5: version >= 0.1.0 

## Components

- [x] Accordion
- [x] Action button
- [x] Alert Confirm
- [x] Badge
- [x] Breadcrumbs
- [ ] Calendar
- [x] Carousel
- [x] Checkbox Group
- [x] DatePicker
- [ ] Dialog
- [ ] Echarts
- [x] File Upload
- [x] Flow Steps
- [x] http
- [ ] Image Upload
- [x] Infinite Scroll
- [ ] Modal
- [x] Notify
- [x] OAuth2
- [x] Overlay
- [x] Pager
- [x] Pagination
- [x] Popover
- [x] Progress Bar
- [x] Radio Group
- [x] Rating
- [x] Select Button
- [x] Storage
- [x] Switch
- [x] Tabs
- [x] Tags
- [x] TimePicker
- [x] Tooltip
- [x] Tree View
- [x] Validators

## Installation

After installing the above dependencies, install `@hibiscus.js` via: 
  
    npm install --save hibiscus.js
  
Once installed you need to import our main module.

    import { HiNGModule } from 'hibiscus.js';
  
Then use `HiNGModule` to declare on your root module:

    
    @NgModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        HiNGModule,
      ],
      providers: [
      ],
      bootstrap: [
      ]
      AppComponent[
      
      ]
    })
    export class AppModule {
    }


And use `HiNGModule` to declare on your feature module:

    @NgModule({
      imports: [CommonModule, FormsModule, HiNGModule],
      exports: [DatePickerDemoComponent],
      declarations: [DatePickerDemoComponent],
      providers: [],
    })
    export class DatePickerDemoModule {
    }


## Animations

`@hibiscus.js` have got animations done. So You should include `BrowserAnimationsModule` or `NoopAnimationsModule` to your `AppModule`.

example:

    import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        SharedModule,
        HiNGModule,
        BrowserAnimationsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule {
    }

## test_push
