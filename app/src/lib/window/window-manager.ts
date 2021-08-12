import { AuthWindow } from './auth-window';
import { InitialWindow } from './initial-window';
import { MainWindow } from './main-window';
import { UserAccountManagerWindow } from './user-account-manager-window';
import type { MyWindow } from 'src/lib/window/my-window';

export class WindowManager {
  windowMap = new Map<number, MyWindow>();

  async createWindow(constructor: new (...args: any[]) => MyWindow): Promise<void> {
    const instance = this._getWindowInstance(constructor);
    this.windowMap.set(instance.id, instance);
    await instance.load();
  }

  initializeWindow(): void {
    const instance = this._getWindowInstance(InitialWindow);
    this.windowMap.set(instance.id, instance);
    void instance.load();
    instance.win.once('ready-to-show', () => {
      instance.win.show();
      instance.win.reload();
    });
  }

  closeWindow(id: number): void {
    const win = this.windowMap.get(id);
    if (win == null) throw new Error('存在しないウィンドウです');
    win.close();
  }

  getEmitterFromWindow<T extends new (...args: any[]) => any>(id: number, constructor: T): InstanceType<T> | undefined {
    const emitters = this.windowMap.get(id)?.emitters ?? [];
    // eslintの解釈ではなぜかanyになりエラーになるのでdisable
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return emitters.find((v): v is InstanceType<T> => v instanceof constructor);
  }

  getEmitters<T extends new (...args: any[]) => any>(constructor: T): InstanceType<T>[] {
    const emitters = this.windowMap.values();
    return Array.from(emitters)
      .reduce((acc, v) => {
        return acc.concat(v.emitters);
      }, [])
      .filter((v): v is InstanceType<T> => v instanceof constructor);
  }

  private _getWindowInstance(constructor: new (...args: any[]) => MyWindow): MyWindow {
    switch (constructor) {
      case AuthWindow:
        return new AuthWindow();
      case MainWindow:
        return new MainWindow();
      case UserAccountManagerWindow:
        return new UserAccountManagerWindow();
      case InitialWindow:
        return new InitialWindow();
      default:
        throw new Error('引数の値が不正です');
    }
  }
}
