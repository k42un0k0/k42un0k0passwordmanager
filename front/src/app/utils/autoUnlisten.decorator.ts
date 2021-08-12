import { OnDestroy, OnInit } from '@angular/core';
import { ElectronListener } from 'src/app/base/electron/utils/electron-listener';

export function AutoElectronListener<T extends new (...args: any[]) => { listener: ElectronListener<AnyObject> }>(
  target: T
) {
  const _ngOnInit: OnInit['ngOnInit'] = target.prototype.ngOnInit ?? (() => {});
  target.prototype.ngOnInit = function ngOnInit(this: InstanceType<T>) {
    _ngOnInit.apply(this);
    this.listener.unlisten();
  };
  const _ngOnDestroy: OnDestroy['ngOnDestroy'] = target.prototype.ngOnDestroy ?? (() => {});
  target.prototype.ngOnDestroy = function ngOnDestroy(this: InstanceType<T>) {
    _ngOnDestroy.apply(this);
    this.listener.unlisten();
  };
}
