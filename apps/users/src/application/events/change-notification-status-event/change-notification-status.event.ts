export class ChangeNotificationStatusEvent {
  public constructor(
    public readonly notificationStatusChangedEventDto: {
      id: string;
      status: boolean;
    },
  ) {}
}
