import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';

export type SidebarItem = {
  title: string;
  onClick: () => void;
};

@Component({
  selector: 'app-sidebar',
  template: `
    <section #section>
      <ul>
        <li *ngFor="let item of sidebarItems | async" (click)="item.onClick()">
          {{ item.title }}
        </li>
      </ul>
      <footer>
        <button
          class="settings"
          (click)="openUserAccountManager()"
          mat-icon-button
          color="primary"
          aria-label="Example icon button with a open in new tab icon"
        >
          <mat-icon>settings</mat-icon>
        </button>
      </footer>
    </section>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewChecked {
  @ViewChild('section') section!: ElementRef<HTMLDivElement>;
  @Input()
  sidebarItems!: Observable<SidebarItem[]>;
  @Input()
  open!: boolean;

  constructor(private elm: ElementRef<HTMLElement>, private electronService: ElectronService) {}
  ngAfterViewChecked(): void {
    if (this.open) {
      const width = this.section.nativeElement.clientWidth;
      this.elm.nativeElement.style.width = `${width}px`;
      this.elm.nativeElement.style.width = `${width}px`;
    } else {
      this.elm.nativeElement.style.width = '0px';
    }
  }

  openUserAccountManager(): void {
    this.electronService.userAccountManager();
  }
}
