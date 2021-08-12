import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';
import { AuthenticationService } from 'src/app/base/services/authentication.service';
import { CsvService } from 'src/app/base/services/csv.service';
import { TabService } from 'src/app/main/services/tab.service';
@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
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
