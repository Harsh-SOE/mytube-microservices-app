export class VideoCreatedEvent {
  constructor(
    public readonly videoCreatedEventDto: {
      fileIdentifier: string;
      videoId: string;
    },
  ) {}
}
