import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from '../models/game.model';

/**
 * Api service to request game data from raspberry pi
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * @ignore
   */
  constructor(private http: HttpClient) {}

  /**
   * Makes an HTTP get request to the raspberry pi server
   * for current game information.
   * @returns observable of IGame data JSON payload from raspberry pi
   */
  getGameData(): Observable<IGame> {
    // Make sure raspberry pi local address is correct.
    return <Observable<IGame>>this.http.get('http://10.0.170.131:5000/score');
  }

  /**
   * TODO: Implement on RPi
   * @returns observable of `true` if game was successfully reset
   * and `false` if not
   */
  resetGameData(): Observable<boolean> {
    return <Observable<boolean>>this.http.get('http://10.0.170.131:5000/reset');
  }
}
