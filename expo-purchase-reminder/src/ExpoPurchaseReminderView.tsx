import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoPurchaseReminderViewProps } from './ExpoPurchaseReminder.types';

const NativeView: React.ComponentType<ExpoPurchaseReminderViewProps> =
  requireNativeView('ExpoPurchaseReminder');

export default function ExpoPurchaseReminderView(props: ExpoPurchaseReminderViewProps) {
  return <NativeView {...props} />;
}
