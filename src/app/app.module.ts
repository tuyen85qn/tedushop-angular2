import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { AppComponent } from './app.component';
import {AuthGuard} from './core/guards/auth.guard';
import { AuthenService } from './core/services/authen.service';
import { NotificationService } from './core/services/notification.service';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    HttpModule,
    RouterModule.forRoot(appRoutes)
   
  ],
  providers: [AuthGuard,AuthenService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
