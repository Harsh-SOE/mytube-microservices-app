export interface TranscodeVideoMessage {
  fileIdentifier: string;
  videoId: string;
}

export interface VideoTranscodedUpdateIdentifierDto {
  videoId: string;
  newIdentifier: string;
}
