import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges,
  SimpleChanges
} from '@angular/core';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-pager',
  templateUrl: './pager.template.html',
  exportAs: 'pager',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnChanges {
  static EFFECT_PAGE_RANGE_KEYS = ['total', 'pageSize', 'pageIndex'];
  @Input() total = 0;
  @Input() pageSize: number;
  @Input() pageIndex = 1;
  @Output() pageIndexChange = new EventEmitter<number>();
  @Input() aligned: boolean;
  @Input() previousText: string;
  @Input() nextText: string;
  @Input() disable = false;
  @Input() cssClass: string;
  totalPage = 0;

  constructor(private hiNGConfig: HiNGConfig) {
    this.aligned = hiNGConfig.pager.aligned;
    this.pageSize = hiNGConfig.pager.pageSize;
    this.previousText = hiNGConfig.pager.button.previous;
    this.nextText = hiNGConfig.pager.button.next;
  }

  prev(): void {
    if (this.hasPrev()) {
      this.onPageIndexChange(this.pageIndex - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.onPageIndexChange(this.pageIndex + 1);
    }
  }

  onPageIndexChange(pageIndex: number) {
    if (this.pageIndex !== pageIndex) {
      this.pageIndexChange.emit(pageIndex);
    }
  }

  hasPrev(): boolean {
    return this.pageIndex > 1;
  }

  hasNext(): boolean {
    return this.pageIndex < this.totalPage;
  }

  private getTotalPage() {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shouldUpdateRanges = PagerComponent.EFFECT_PAGE_RANGE_KEYS.some(key => !!changes[key]);
    if (shouldUpdateRanges) {
      this.totalPage = this.getTotalPage();
      this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
    }
  }

}
