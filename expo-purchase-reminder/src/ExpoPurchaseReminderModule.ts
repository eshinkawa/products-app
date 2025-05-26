import { NativeModule, requireNativeModule } from 'expo';

import { ExpoPurchaseReminderModuleEvents } from './ExpoPurchaseReminder.types';

declare class ExpoPurchaseReminderModule extends NativeModule<ExpoPurchaseReminderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPurchaseReminderModule>('ExpoPurchaseReminder');
