import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {keyBoardHelper} from '../utils/keyboard-utils';

function fillLeft(num: number) {
  return (num || 0) < 10 ? `0${num}` : `${num}`;
}

const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
const supportKeyType = [ARROW_UP, ARROW_DOWN];

export class TimePickerModel {

  constructor(public  hour: number, public  minute: number, public second?: number) {

  }

  toString() {
    return `${fillLeft(this.hour)}:${fillLeft(this.minute)}:${fillLeft(this.second)}`;
  }

}

const BACKSPACE_KEY_CODE = 8;
const ENTER_KEY_CODE = 13;
const TAB_KEY_CODE = 9;
const SUPPORTED_KEY_CODE = [
  BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE,
  TAB_KEY_CODE
];

export const TIME_UNIT = {
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
};

export const MAX_TIME_RANGE = {
  hour: 23,
  minute: 59,
  second: 59,
};

@Component({
  selector: 'hi-time-picker',
  templateUrl: './time-picker.template.html',
  exportAs: 'timePicker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {

  @Input() showSeconds = true;
  @Input() minTime = new TimePickerModel(0, 0, 0);
  @Input() maxTime = new TimePickerModel(23, 59, 59);

  hour = '00';
  minute = '00';
  second = '00';

  timeUnit = TIME_UNIT;
  minDate: Date;
  maxDate: Date;

  disabled: boolean;
  private onChange = (_: TimePickerModel) => null;
  private onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initConditionDate();
  }

  initConditionDate() {
    this.minDate = this.getDateByTime(this.minTime);
    this.maxDate = this.getDateByTime(this.maxTime);
  }

  getDateByTime(time: TimePickerModel) {
    return new Date((new Date()).setHours(time.hour || 0, time.minute || 0, time.second || 0));
  }

  getValue(value, defaultValue) {
    if (value || value === 0) {
      return value;
    }
    return defaultValue;
  }

  getCurrentTimestamp(time): number {
    const hour = this.getValue(time.hour, parseInt(this.hour, 10));
    const minute = this.getValue(time.minute, parseInt(this.minute, 10));
    const second = this.getValue(time.second, parseInt(this.second, 10));

    return (new Date()).setHours(hour, minute, second);
  }

  writeValue(value: TimePickerModel) {
    if (value) {
      this.hour = fillLeft(value.hour || 0);
      this.minute = fillLeft(value.minute || 0);
      this.second = fillLeft(value.second || 0);
      this.changeDetectorRef.markForCheck();
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(disabled) {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  updateTimeByMargin(key: string, marginDate) {
    switch (key) {
      case TIME_UNIT.HOUR:
        this.hour = fillLeft(marginDate[TIME_UNIT.HOUR]);
        this.minute = fillLeft(marginDate[TIME_UNIT.MINUTE]);
        if (marginDate[TIME_UNIT.SECOND]) {
          this.second = fillLeft(marginDate[TIME_UNIT.SECOND]);
        }
        break;
      case TIME_UNIT.MINUTE:
        this.minute = fillLeft(marginDate[TIME_UNIT.MINUTE]);
        if (marginDate[TIME_UNIT.SECOND]) {
          this.second = fillLeft(marginDate[TIME_UNIT.SECOND]);
        }
        break;
      case TIME_UNIT.SECOND:
        this.second = fillLeft(marginDate[TIME_UNIT.SECOND]);
        break;
    }
  }

  modifyTimeByKey(value: number, key: string) {
    if (isNaN(value)) {
      if (this.getCurrentTimestamp({[key]: 0}) < this.minDate.getTime()) {
        this.updateTimeByMargin(key, this.minTime);
      } else if (this.getCurrentTimestamp({[key]: 0}) > this.maxDate.getTime()) {
        this.updateTimeByMargin(key, this.maxTime);
      } else {
        this.updateTimeByMargin(key, this.minTime);
      }
    } else if (value < 0) {
      this[key] = fillLeft(0) || fillLeft(this.minTime[key]);
    } else if (value > MAX_TIME_RANGE[key] || this.getCurrentTimestamp({[key]: value}) > this.maxDate.getTime()) {
      this.updateTimeByMargin(key, this.maxTime);
    } else if (this.getCurrentTimestamp({[key]: value}) < this.minDate.getTime()) {
      this.updateTimeByMargin(key, this.minTime);
    } else {
      this[key] = fillLeft(value);
    }
  }

  onTimeChange(key: string) {
    this.onTouched();
    this.modifyTimeByKey(parseInt(this[key], 10), key);
    this.onModelChange();
  }

  onModelChange() {
    this.onChange(this.getTimePickerModel());
  }

  private getTimePickerModel() {
    const model = new TimePickerModel(parseInt(this.hour, 10), parseInt(this.minute, 10));
    if (this.showSeconds) {
      model.second = parseInt(this.second, 10);
    }
    return model;
  }

  isSafetyKeyPress(keyType: any, target: string, key: string) {
    const parsedTarget = parseInt(target, 10);
    return !(keyType === ARROW_DOWN && parsedTarget < 1) &&
      (
        (keyType === ARROW_DOWN && key === TIME_UNIT.HOUR && parsedTarget <= MAX_TIME_RANGE.hour) ||
        (keyType === ARROW_DOWN && (key === TIME_UNIT.MINUTE ||
          key === TIME_UNIT.SECOND) && parsedTarget <= MAX_TIME_RANGE.minute) ||
        (keyType === ARROW_UP && key === TIME_UNIT.HOUR && parsedTarget < MAX_TIME_RANGE.hour) ||
        (keyType === ARROW_UP && (key === TIME_UNIT.MINUTE ||
          key === TIME_UNIT.SECOND) && parsedTarget < MAX_TIME_RANGE.minute)
      );
  }

  isSupportedKeyPress(event): boolean {
    return SUPPORTED_KEY_CODE.indexOf(event.keyCode) > -1 ||
      keyBoardHelper.numberKeyBoard(event) ||
      keyBoardHelper.smallKeyBoard(event) ||
      keyBoardHelper.arrowKeyBoard(event);
  }

  handleKeyEvent(event, type) {
    if (!this.isSupportedKeyPress(event)) {
      event.preventDefault();
      return;
    }
    const keyEventType = event.code;
    if (supportKeyType.indexOf(keyEventType) === -1) {
      return;
    }
    this.modifyTimeByKeyPressEvent(type, keyEventType);
  }

  modifyTimeByKeyPress(key: string, type: string, step: number) {
    if (this.isSafetyKeyPress(type, this[key], key)) {
      this[key] = fillLeft(parseInt(this[key], 10) + step);
    }
  }

  modifyTimeByKeyPressEvent(type: string, keyEventType: string) {
    let step = 1;
    if (keyEventType === ARROW_DOWN) {
      step = -1;
    }
    switch (type) {
      case this.timeUnit.HOUR:
        this.modifyTimeByKeyPress(TIME_UNIT.HOUR, keyEventType, step);
        break;
      case this.timeUnit.MINUTE:
        this.modifyTimeByKeyPress(TIME_UNIT.MINUTE, keyEventType, step);
        break;
      case this.timeUnit.SECOND:
        this.modifyTimeByKeyPress(TIME_UNIT.SECOND, keyEventType, step);
        break;
    }
  }

}
