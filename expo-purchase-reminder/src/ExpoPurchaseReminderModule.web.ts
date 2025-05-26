import { registerWebModule, NativeModule } from 'expo';

import { ExpoPurchaseReminderModuleEvents } from './ExpoPurchaseReminder.types';

class ExpoPurchaseReminderModule extends NativeModule<ExpoPurchaseReminderModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoPurchaseReminderModule, 'ExpoPurchaseReminderModule');
