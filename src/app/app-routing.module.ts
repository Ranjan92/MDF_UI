import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageflowDiagramComponent } from './pageflow-diagram/pageflow-diagram.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { JobDetailsComponent } from './job-details/job-details.component';


const routes: Routes = [
  {
    path : '', component : LandingPageComponent,
  },
  {
    path:'pageflow', component:PageflowDiagramComponent
  },
  {
    path:'jobDetails', component: JobDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
