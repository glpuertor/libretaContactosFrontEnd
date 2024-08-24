import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { ContactoPageComponent } from './pages/contacto/contacto.component';
import { Routes } from '@angular/router';
export const routes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'contacto/:id', component: ContactoPageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
