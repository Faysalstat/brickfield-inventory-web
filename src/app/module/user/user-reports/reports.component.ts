import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class UserReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }

}
