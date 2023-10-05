import { WebPlugin } from '@capacitor/core';

import type { AudioStreamingPlugin } from './definitions';

export class AudioStreamingWeb
  extends WebPlugin
  implements AudioStreamingPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
