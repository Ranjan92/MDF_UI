import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageflowDiagramComponent } from './pageflow-diagram/pageflow-diagram.component';
import {HttpClientModule} from '@angular/common/http';
import { PageflowServiceService } from './pageflow-service.service';
import {FormsModule} from '@angular/forms';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { PageflowStatusDialogComponent } from './pageflow-status-dialog/pageflow-status-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageflowDiagramComponent,
    RootNavComponent,
    LandingPageComponent,
    JobDetailsComponent,
    PageflowStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  entryComponents: [
    PageflowStatusDialogComponent,
  ],
  providers: [PageflowServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
