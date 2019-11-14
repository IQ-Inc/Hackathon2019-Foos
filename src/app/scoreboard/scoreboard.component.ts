import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { interval, timer, Subscription, of, Observable } from 'rxjs';
import { switchMap, tap, catchError, exhaust, exhaustMap } from 'rxjs/operators';
import { IGame } from '../core/models/game.model';

import { webSocket } from 'rxjs/webSocket';
/**
 * Scoreboard component. This component interprets
 * and displays raspberry pi game data.
 */
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  /**
   * IGame Object
   */
  public game: IGame = { redTeamScore: 0, blueTeamScore: 0 };

  /**
   * Timer string
   */
  public timer = '0:00';

  /**
   * Game subscription to interval and Api service to
   * make REST calls to raspberry pi for IGame data.
   */
  private _gameSubscription: Subscription;

  /**
   * @ignore
   */
  constructor(private api: ApiService) {}

  /**
   * OnInit Angular Lifecycle hook.
   * Initializes game
   */
  ngOnInit() {
    const subject = webSocket('ws://10.0.170.224:3000');

    subject.subscribe(
      (msg: any) => {
        console.log(msg);
        this.game.blueTeamScore = msg.blue_goals;
        this.game.redTeamScore = msg.red_goals;
        this.timer = this.tohms(msg.time);
      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  tohms(sec_num: number) {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    let h = hours.toString();
    let m = minutes.toString();
    let s = seconds.toString();
    if (hours < 10) {
      h = '0' + hours;
    }
    if (minutes < 10) {
      m = '0' + minutes;
    }
    if (seconds < 10) {
      s = '0' + seconds;
    }
    return h + ':' + m + ':' + s;
  }

  /**
   * OnDestroy Angular Lifecycle hook.
   * Unsubscribes from constant streaming observables to prevent memory leaks.
   * This infrastructure must be in place for when user navigates away from this
   * component and it is destroyed.
   */
  ngOnDestroy() {
    this._gameSubscription.unsubscribe();
  }

  /**
   * Restarts game data.
   */
  restartGame(): void {
    this._gameSubscription.unsubscribe();
    this.game = { redTeamScore: 0, blueTeamScore: 0 };
    this.timer = '0:00';
  }

  /**
   * Formats seconds to m:ss
   * @param s Number of seconds to format
   * @returns seconds converted to m:ss format
   */
  private _fmtMSS(s: number): string {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }
}
