import {
  Component, Input, ViewChild, ElementRef, OnInit, OnDestroy
} from '@angular/core';

import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
import { QualityOption } from './quality-option';

@Component({
  selector: 'lib-videojs-quality-selector',
  template: `
    <video #target class="video-js vjs-default-skin" controls></video>
    <div class="quality-selector" [class.show-dropdown]="showDropdown">
      <button class="dropdown-toggle" (click)="toggleDropdown()">
        {{ selectedQuality }}
      </button>
      <div class="dropdown-menu">
        <button
          *ngFor="let q of qualities"
          class="qualityBtn"
          (click)="selectQuality(q)"
        >
          {{ q.label }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./quality-selector-selector.component.scss']
})
export class VideojsQualitySelectorComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true })
  target!: ElementRef<HTMLVideoElement>;

  @Input() src!: string;
  @Input() poster?: string;

  // Typ über ReturnType<typeof videojs> ableiten
  player!: ReturnType<typeof videojs>;
  qualities: QualityOption[] = [];
  selectedQuality = 'Auto';
  showDropdown = false;

  ngOnInit() {
    this.player = videojs(
      this.target.nativeElement,
      {
        sources: [{ src: this.src, type: 'application/x-mpegURL' }],
        poster: this.poster
      },
      () => {
        // Plugin-Methode über any aufrufen
        const levels = (this.player as any)
          .qualityLevels() as Array<{ height?: number; enabled: boolean }>;

        for (let i = 0; i < levels.length; i++) {
          const lvl = levels[i];
          this.qualities.push({
            index: i,
            height: lvl.height ?? 0,
            label: `${lvl.height}p`
          });
        }
      }
    );
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQuality(q: QualityOption) {
    const levels = (this.player as any)
      .qualityLevels() as Array<{ enabled: boolean }>;

    for (let i = 0; i < levels.length; i++) {
      levels[i].enabled = (i === q.index);
    }

    this.selectedQuality = q.label;
    this.showDropdown = false;
  }

  ngOnDestroy() {
    this.player.dispose();
  }
}

