import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  level:number = 0;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 3000)
  }
 
}
