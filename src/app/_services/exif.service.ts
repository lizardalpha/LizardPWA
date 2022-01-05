import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Constants } from '../_config/constants';

import { ConnectionService } from 'ng-connection-service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ExifService {
  public currentSpeedSlow: boolean = false;
  public  KEY_STR = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

  constructor() {

   

  }

    

  public encode64(input) {
    var output = "",
      chr1, chr2, chr3,
      enc1, enc2, enc3, enc4,
      i = 0;

    do {
      chr1 = input[i++];
      chr2 = input[i++];
      chr3 = input[i++];

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this.KEY_STR.charAt(enc1) +
        this.KEY_STR.charAt(enc2) +
        this.KEY_STR.charAt(enc3) +
        this.KEY_STR.charAt(enc4);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
  }

  public restore(origFileBase64, resizedFileBase64) {
    //alert('here in service');
    //console.log(origFileBase64);
    if (!origFileBase64.match("data:image/jpeg;base64,")) {
      return resizedFileBase64;
    }

    var rawImage = this.decode64(origFileBase64.replace("data:image/jpeg;base64,", ""));
   // console.log(rawImage);
    var segments = this.slice2Segments(rawImage);

    var image = this.exifManipulation(resizedFileBase64, segments);

    return this.encode64(image);
  }


  public restoreNew(origFileBase64, resizedFileBase64) {
    //alert('here in service');
    //console.log(origFileBase64);
        // console.log(rawImage);
    var segments = this.slice2Segments(origFileBase64);

    var image = this.exifManipulation(resizedFileBase64, segments);

    return this.encode64(image);
  }


  public exifManipulation(resizedFileBase64, segments) {
    //console.log(resizedFileBase64);
    var exifArray = this.getExifArray(segments),
      
      newImageArray = this.insertExif(resizedFileBase64, exifArray),
      aBuffer = new Uint8Array(newImageArray);

    return aBuffer;
  }

  public getExifArray(segments) {
    var seg;
    for (var x = 0; x < segments.length; x++) {
      seg = segments[x];
      if (seg[0] == 255 && seg[1] == 225) //(ff e1)
      {
        return seg;
      }
    }
    return [];
  }

  public insertExif(resizedFileBase64, exifArray) {
    var imageData = resizedFileBase64.replace("data:image/jpeg;base64,", ""),
      buf = this.decode64(imageData),
      separatePoint = buf.indexOf(255, 3),
      mae = buf.slice(0, separatePoint),
      ato = buf.slice(separatePoint),
      array = mae;

    array = array.concat(exifArray);
    array = array.concat(ato);
    return array;
  }

  public slice2Segments(rawImageArray) {
    var head = 0,
      segments = [];

    while (1) {
      if (rawImageArray[head] == 255 && rawImageArray[head + 1] == 218) { break; }
      if (rawImageArray[head] == 255 && rawImageArray[head + 1] == 216) {
        head += 2;
      }
      else {
        var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3],
          endPoint = head + length + 2,
          seg = rawImageArray.slice(head, endPoint);
        segments.push(seg);
        head = endPoint;
      }
      if (head > rawImageArray.length) { break; }
    }

    return segments;
  }
  //create the functions
  public decode64(input) {
    var output = "",
      chr1, chr2, chr3,
      enc1, enc2, enc3, enc4,
      i = 0,
      buf = [];

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      alert("There were invalid base64 characters in the input text.\n" +
        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
        "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
      enc1 = this.KEY_STR.indexOf(input.charAt(i++));
      enc2 = this.KEY_STR.indexOf(input.charAt(i++));
      enc3 = this.KEY_STR.indexOf(input.charAt(i++));
      enc4 = this.KEY_STR.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      buf.push(chr1);

      if (enc3 != 64) {
        buf.push(chr2);
      }
      if (enc4 != 64) {
        buf.push(chr3);
      }

      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return buf;
  }

  
}
