import { registerPlugin } from '@capacitor/core';

import type { AudioStreamingPlugin } from './definitions';

const AudioStreaming = registerPlugin<AudioStreamingPlugin>('AudioStreaming', {
  web: () => import('./web').then(m => new m.AudioStreamingWeb()),
});

export * from './definitions';
export { AudioStreaming };
