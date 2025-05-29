import {   Component, Input, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { QualityOption } from './quality-option';
import videojs from 'video.js';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

@Component({
  selector: 'lib-videojs-quality-selector',
  imports: [],
  styleUrls: ['./quality-selector-selector.component.scss'],
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
  styles: ``
})
export class VideojsQualitySelectorComponent {

  @ViewChild('target', { static: true })
  target!: ElementRef<HTMLVideoElement>;

  @Input() src!: string;
  @Input() poster?: string;

  player!: videojs.Player;
  qualities: QualityOption[] = [];
  selectedQuality = 'Auto';
  showDropdown = false;

  ngOnInit() {
    // Player initialisieren
    this.player = videojs(this.target.nativeElement, {
      sources: [{ src: this.src, type: 'application/x-mpegURL' }],
      poster: this.poster
    }, () => {
      // qualityLevels API aktivieren
      const levels = this.player.qualityLevels();
      // vorhandene Levels sammeln
      for (let i = 0; i < levels.length; i++) {
        const lvl = levels[i];
        this.qualities.push({
          index: i,
          height: lvl.height,
          label: `${lvl.height}p`
        });
      }
      // Default bleibt “Auto” (alle Levels enabled)
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQuality(q: QualityOption) {
    const levels = this.player.qualityLevels();
    // nur das gewählte Level erlauben
    for (let i = 0; i < levels.length; i++) {
      levels[i].enabled = (i === q.index);
    }
    this.selectedQuality = q.label;
    this.showDropdown = false;
  }

  ngOnDestroy() {
    this.player?.dispose();
  }

}

