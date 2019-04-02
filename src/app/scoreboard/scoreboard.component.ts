import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { interval, timer, Subscription, of, Observable } from 'rxjs';
import {
  switchMap,
  tap,
  catchError,
  exhaust,
  exhaustMap
} from 'rxjs/operators';
import { IGame } from '../core/models/game.model';

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
    this._gameInit();
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
    this._gameInit();
  }

  /**
   * Initializes game data. An interval is observed that increments the timer
   * and requests game data from the raspberry pi in the IGame JSON format.
   */
  private _gameInit(): void {
    this._gameSubscription = interval(1000)
      .pipe(
        tap(second => (this.timer = this._fmtMSS(second + 1))),
        switchMap(() => {
          // poll RPi server every second
          return this.api.getGameData();
        })
      )
      .subscribe((game: IGame) => {
        this.game = game;
      });
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
