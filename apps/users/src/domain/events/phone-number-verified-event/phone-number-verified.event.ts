export class PhoneNumberVerfiedEvent {
  public constructor(
    public readonly phoneNumberVerfiedEventDto: {
      id: string;
      phoneNumber: string;
    },
  ) {}
}
