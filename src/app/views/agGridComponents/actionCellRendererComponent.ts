import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cu-download-link-cell-renderer",
  template: `
    <div class="">
      <i
        *ngIf="params.enableEdit"
        class="fa {{ params.icon1 }}"
        (click)="onClick1()"
        aria-hidden="true"
      ></i>
      <i
        *ngIf="params.enableDelete"
        class="fa {{ params.icon2 }}"
        (click)="onClick2()"
        aria-hidden="true"
      ></i>
      <i
        class="fa {{ params.icon3 }}"
        (click)="onClick3()"
        aria-hidden="true"
      ></i>
      <i
        class="fa {{ params.icon4 }}"
        (click)="onClick4()"
        aria-hidden="true"
      ></i>
      <i
        *ngIf="params.enableAddAnswer"
        class="fa {{ params.icon5 }}"
        (click)="onClick5()"
        aria-hidden="true"
      ></i>
    </div>
  `
})
export class ActionCellRendererComponent {
  params;
  constructor() {}

  agInit(params): void {
    this.params = params;
    // if (_.isNil(params.action1) || _.isNil(params.action2)) {
    //   throw new Error(
    //     "Missing action parameter for ActionCellRendererComponent"
    //   );
    // }
  }

  onClick1(): void {
    this.params.action1(this.params);
  }

  onClick2(): void {
    this.params.action2(this.params);
    // this.enableEdit = true;
  }

  onClick3(): void {
    this.params.action3(this.params);
  }

  onClick4(): void {
    this.params.action4(this.params);
  }

  onClick5(): void {
    this.params.action5(this.params);
  }
}

export type CellAction = (params) => void;
