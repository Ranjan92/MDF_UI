import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobName : String = '';
  teamName : String = '';
  jobType : String = '';
  constructor(private router : Router ) { }

  etlJobExecution(){
    const _url = '/pageflow?jobName='+this.jobName+'&teamName='+this.teamName+'&jobType='+this.jobType;
    if(this.jobName == '' || this.teamName == '' || this.jobType == ''){
      alert('Please enter all the required fields..');
    }else{
      this.router.navigateByUrl(_url);
    }
  }
  ngOnInit(): void {
  }

}
