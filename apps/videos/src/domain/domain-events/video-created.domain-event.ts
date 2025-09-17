export class VideoCreatedDomainEvent {
  constructor(
    public readonly videoCreatedEventDto: { key: string; videoId: string },
  ) {}
}
