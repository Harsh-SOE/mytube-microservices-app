export class VideoCreatedEvent {
  constructor(
    public readonly videoCreatedEventDto: { key: string; videoId: string },
  ) {}
}
