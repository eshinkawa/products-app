import ExpoPurchaseReminderModule from './ExpoPurchaseReminderModule';
export { default } from './ExpoPurchaseReminderModule';
export { default as ExpoPurchaseReminderView } from './ExpoPurchaseReminderView';
export * from  './ExpoPurchaseReminder.types';

export async function addPurchaseReminderAsync(
  productName: string,
  purchaseDate: Date,
  reminderLeadTimeMinutes: number = 30
): Promise<AddPurchaseReminderResult> {
  const purchaseTimestamp = purchaseDate.getTime();

  if (!productName || purchaseTimestamp <= 0) {
    throw new Error("Invalid product name or purchase date provided.");
  }

  return await ExpoPurchaseReminderModule.addPurchaseReminderAsync(
    productName,
    purchaseTimestamp,
    reminderLeadTimeMinutes
  );
}





