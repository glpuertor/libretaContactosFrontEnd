//angular
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient,  HttpParams } from '@angular/common/http';
//services
//component
import {API} from '../../environments/api';

@Injectable({
  providedIn: 'root'
})

export class generalService {

  constructor(private router: Router,
    private http:HttpClient,
) { }



  getContacto(id:number) {
      return this.http.get( API.SERVER + API.GET_CONTACTO+""+id);
  }

  getContactos(val:any="", page:any=1) {
    console.log(val, page)
    console.log( API.SERVER + API.GET_CONTACTOSSEARCH+page)

    const body=new HttpParams().set('value', val);
    return this.http.post( API.SERVER + API.GET_CONTACTOSSEARCH+page, body);
  }

  createContacto(data: any) {
    console.log("create Contacto")
    const body = new HttpParams()
      .set('nombre', data.nombre)
      .set('apellido', data.apellido)
      .set('notas', data.notas)
      .set('cumple', data.cumple)
      .set('paginaWeb', data.paginaWeb)
      .set('empresa', data.empresa)
    ;

    return this.http.post( API.SERVER + API.POST_CREATECONTACTOS, body);
  }

  updateContacto(data: any) {
    const body = new HttpParams()
    .set('nombre', data.nombre)
    .set('apellido', data.apellido)
    .set('notas', data.notas)
    .set('cumple', data.cumple)
    .set('paginaWeb', data.paginaWeb)
    .set('empresa', data.empresa)
    ;
    let body2:any={
      nombre:data.nombre,
      apellido:data.apellido,
      notas:data.notas,
      cumple:data.cumple,
      paginaWeb:data.paginaWeb,
      empresa:data.empresa,
    }
    console.log(body2);
    console.log(body)
    return this.http.put( API.SERVER + API.PUT_CONTACTO+data.id, body);
  }

  updateStatus(id:number) {
    const body = new HttpParams()
      .set('status', 0)
    ;

    return this.http.put( API.SERVER + API.PUT_CONTACTO+id, body);
  }


  destroyContacto(id:number) {
    return this.http.delete( API.SERVER + API.DELETE_CONTACTO+id);
  }

}
