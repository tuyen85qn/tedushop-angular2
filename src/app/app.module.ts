import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    LoginModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
