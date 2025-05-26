import * as React from 'react';

import { ExpoPurchaseReminderViewProps } from './ExpoPurchaseReminder.types';

export default function ExpoPurchaseReminderView(props: ExpoPurchaseReminderViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
