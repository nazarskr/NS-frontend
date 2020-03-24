import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth/auth.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskShareComponent } from './task/task-share/task-share.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule,
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { TaskSharePipe } from './task/pipes/task-share.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    TaskCreateComponent,
    TaskListComponent,
    TaskShareComponent,
    TaskSharePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
