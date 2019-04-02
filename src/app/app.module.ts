import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { HttpClientModule } from '@angular/common/http';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, ScoreboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
