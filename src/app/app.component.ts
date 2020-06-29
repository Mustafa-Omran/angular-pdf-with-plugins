import { Component, Inject } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly imageWidth = 285;

  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit() {
  }

  /**
   * capture html as pdf
   * 
   * 
   */
  captureScreen() {
    const data = this.document.getElementById('content');

    html2canvas(data).then(canvas => {
      const imgWidth = this.imageWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'mm', 'a4');
      const position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('capture.pdf');
    });
  }
}
