import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Isample } from './Isample';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageflowServiceService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  private _url: string = '/assets/sample.json';
  //private post_url = `http://httpbin.org/post`;
  private post_url = `api/api/add`;

  constructor(private http : HttpClient) { }

  getSampleData() : Observable<Isample[]>{
    return this.http.get<Isample[]>(this._url);
  }

  postEtlJobDetails(jobDetails : any, jobName: String) {
    let jobExecutionStatus : String = '';
    let post_details_url = '';
    post_details_url = this.post_url+'/'+jobName;
    //this.post_url = this.post_url+'/'+jobName;
    alert(post_details_url);
    alert(jobDetails);
    return this.http.post(post_details_url, jobDetails, this.options);
    /*this.http.post(post_details_url, jobDetails, this.options).subscribe(response => 
     {
      //alert(response)
     },err => {
       if(err.status == 200){
        console.log(err.error.text);
        //alert(err.error.text);
        jobExecutionStatus = String(err.error.text);
        alert("Testing "+jobExecutionStatus);
        
       }else{
        console.log(err.error.message);
        jobExecutionStatus = String(err.error.message);
        //alert(err.error.message);
        alert("Testing "+jobExecutionStatus);
        
       }
  } );*/
      
    //this.http.post(post_details_url, jobDetails, this.options).subscribe(data =>{
      //console.log("Response Testing "+data);
    //});
   /* if(jobExecutionStatus != ''){
      return jobExecutionStatus;
    }*/
  }
}
