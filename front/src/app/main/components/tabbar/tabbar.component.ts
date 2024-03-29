import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';
import { AuthenticationService } from 'src/app/base/services/authentication.service';
import { CsvService } from 'src/app/base/services/csv.service';
import { TabService } from 'src/app/main/services/tab.service';
@Component({
  selector: 'app-tabbar',
  template: `
    <div class="menu in-window-frame">
      <div class="home-wrapper" role="button">
        <mat-icon class="home" (click)="clickHome.emit()" aria-hidden="false" aria-label="Example home icon"
          >home
        </mat-icon>
      </div>
      <div class="tab-wrapper" cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop($event)">
        <app-tab
          *ngFor="let tab of tabService.tabs; index as i"
          cdkDrag
          [tab]="tab"
          (click)="tabService.clickTab(i)"
          (clickClose)="tabService.closeTab(i)"
        ></app-tab>
      </div>
    </div>
    <div class="in-window-frame">
      <button
        class="button button-down"
        [matMenuTriggerFor]="menu"
        mat-button
        aria-label="Example icon button with a menu icon"
      >
        <mat-icon class="window-close" aria-hidden="false" aria-label="Example home icon">
          keyboard_arrow_down
        </mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="export()">エクスポート</button>
        <button mat-menu-item (click)="import()"><input type="file" value="インポート" /></button>
        <button mat-menu-item (click)="logout()">ログアウト</button>
      </mat-menu>
      <button
        class="button button-close"
        (click)="closeWindow()"
        mat-button
        aria-label="Example icon button with a menu icon"
      >
        <mat-icon class="window-close" aria-hidden="false" aria-label="Example home icon">close </mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent {
  @Output() clickHome = new EventEmitter();

  constructor(
    private electronService: ElectronService,
    private authenticationService: AuthenticationService,
    public tabService: TabService,
    private csvService: CsvService
  ) {}

  logout(): void {
    this.authenticationService.signOut();
  }
  closeWindow(): void {
    this.electronService.close();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tabService.tabs, event.previousIndex, event.currentIndex);
  }
  export() {
    if (this.tabService.current$.value) this.csvService.export(this.tabService.current$.value.userAccount);
  }
  import() {
    // if (this.tabService.current$.value) {
    //   const a = this.csvService.import(
    //     this.tabService.current$.value.userAccount,);
    //   a.then(console.log);
    // }
  }
}
