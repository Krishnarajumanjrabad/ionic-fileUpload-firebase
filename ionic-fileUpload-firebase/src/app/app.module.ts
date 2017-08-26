import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AngularFireModule} from "angularfire2";
import {FileServiceProvider} from '../providers/file-service/file-service';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpModule} from "@angular/http";
import {AngularFireOfflineModule} from "angularfire2-offline";

export var firebaseConfig = {
  apiKey: "AIzaSyCv7cqUEGXK-qppDXpx0kV7YvlNN0ralv8",
  authDomain: "myionic2project-3ee5a.firebaseapp.com",
  databaseURL: "https://myionic2project-3ee5a.firebaseio.com",
  projectId: "myionic2project-3ee5a",
  storageBucket: "myionic2project-3ee5a.appspot.com",
  messagingSenderId: "381372404027"
};

@NgModule( {
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireOfflineModule,
    IonicModule.forRoot( MyApp ),
    AngularFireModule.initializeApp( firebaseConfig )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileServiceProvider
  ]
} )
export class AppModule {
}
