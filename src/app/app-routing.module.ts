import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule) },
  { path: 'report', loadChildren: () => import('./module/report/report.module').then(m => m.ReportModule) },
  { path: 'welcome', loadChildren: () => import('./module/welcome/welcome.module').then(m => m.WelcomeModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
