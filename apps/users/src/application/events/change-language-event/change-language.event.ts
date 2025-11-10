export class ChangeLanguageEvent {
  public constructor(
    public readonly langaugeChangedEventDto: { id: string; langauge: string },
  ) {}
}
