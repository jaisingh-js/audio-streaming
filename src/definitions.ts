export interface AudioStreamingPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  init(): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  createBuffer(): Promise<void>;
  addBuffer(opts: { buffer: Uint8Array }): Promise<boolean>;
}
