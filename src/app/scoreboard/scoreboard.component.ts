import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public score: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    // poll server every second
    interval(1000)
      .pipe(
        switchMap(() => {
          return this.api.getScore();
        })
      )
      .subscribe(score => {
        this.score = score;
      });
  }
}
