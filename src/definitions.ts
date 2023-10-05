export interface AudioStreamingPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
