import { WebPlugin } from '@capacitor/core';

import type { AudioStreamingPlugin } from './definitions';

export class AudioStreamingWeb
  extends WebPlugin
  implements AudioStreamingPlugin
{
  private audio: HTMLAudioElement = new Audio();
  private media: MediaSource = new MediaSource();
  private sourceBuffer?: SourceBuffer;

  async init(): Promise<void> {
    console.log('init called');
    this.audio = new Audio();
  }

  async play(): Promise<void> {
    console.log('audio started playing');
    this.audio
      .play()
      .then(() => {
        console.log('audio started');
      })
      .catch(e => {
        console.log('audio error: ', e);
      });
  }

  async pause(): Promise<void> {
    return this.audio.pause();
  }

  async addBuffer(opts: { buffer: Uint8Array }): Promise<boolean> {
    console.log('buffer started adding');
    return await new Promise((resolve: any) => {
      if (!this.sourceBuffer?.updating) {
        this.sourceBuffer?.appendBuffer(opts.buffer);
        console.log('buffer added successfully');
        if (this.audio.paused) this.play();
        resolve();
      } else {
        this.sourceBuffer.onupdateend = () => {
          this.sourceBuffer?.appendBuffer(opts.buffer);
          console.log('buffer added successfully');
          if (this.sourceBuffer) this.sourceBuffer.onupdateend = null;
          if (this.audio.paused) this.play();
          resolve();
        };
      }
    });
  }

  async createBuffer(): Promise<void> {
    console.log('buffer is being created');
    return new Promise(resolve => {
      this.media = new MediaSource();
      this.audio.src = window.URL.createObjectURL(this.media);
      this.media.addEventListener('sourceopen', () => {
        this.sourceBuffer = this.media.addSourceBuffer('audio/mpeg');
        console.log('source buffer added successfully');
        resolve();
        // Get video segments and append them to sourceBuffer.
      });
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
