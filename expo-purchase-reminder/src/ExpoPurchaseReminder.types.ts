import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type ExpoPurchaseReminderModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type ExpoPurchaseReminderViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export type AddPurchaseReminderResult = string;

export interface ExpoPurchaseReminderModuleApi {
  addPurchaseReminderAsync: (
    productName: string,
    purchaseTimestamp: number,
    reminderOffsetMinutes: number
  ) => Promise<AddPurchaseReminderResult>;
}
