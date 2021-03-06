import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const url = 'http://200.60.68.125:3000/upload';

@Injectable()
export class UploadService {
  success = false;
  failed = false;
  public file: File = null;
  uploadFailed = false;

  constructor(private http: HttpClient) { }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    const status = {};
    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          console.log("ha ocurrido un edsadsa")
          console.log(event);
          if (event.body["correct"]) {
            console.log("correct");
            progress.complete();
            console.log(event.body);
            this.file = file;
          } else {console.log("incorrecct"); this.uploadFailed = true;}
          // Close the progress-stream if we get an answer form the API
          // The upload is complete

        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}