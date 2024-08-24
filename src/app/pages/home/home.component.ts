//angular
import { Component, OnInit, ViewChild } from '@angular/core';
//bootstrab
import { NgFor, NgForOf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
//import { generalService } from '../../services/general.service';

import { NgbPaginationModule, NgbModalConfig  } from '@ng-bootstrap/ng-bootstrap';
import { generalService } from '../../services/general.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
	imports: [NgbCarouselModule, FormsModule, HttpClientModule, CommonModule, NgbPaginationModule],
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {
  contacto:any;
  valueInput:any;
  page=1;
  lastPage=1;
  message:any;
  modalId:any;
  modalName:any;
  constructor(
    private service:generalService, private Router:Router,
    config: NgbModalConfig,
		private modalService: NgbModal,
  ){
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit():void{
    this.allContacto(this.page);
  }

  contactoF(id:any=0){
      this.Router.navigate(['contacto/'+id]);
  }

  allContacto(page:any){
    console.log(this.valueInput, page)
    this.page=page;
    this.service.getContactos(this.valueInput, page).subscribe((response:any) => {
      this.contacto=response.contactos.data;
      response.contactos.from;

      this.lastPage=response.contactos.last_page;
      response.contactos.last_page_url;
      response.contactos.to;
      response.contactos.total;
      response.contactos.per_page;
      response.contactos.prev_page_url;
      console.log(response.contactos);

      //return this.Contacto;
      //console.log("respuesta ejecutada getReservation===>",this.getReservationResponse);
    });
  }


  destroyContacto(id:any=0){
    if(id!=0){
      this.service.destroyContacto(id).subscribe((response:any) => {
        this.message=response.message;
        //return this.Contacto;
        //console.log("respuesta ejecutada getReservation===>",this.getReservationResponse);
        this.allContacto(this.page);
      });
    }
  }
	open(content:any, id:any, name:any) {
    this.modalId=id;
    this.modalName=name;
		this.modalService.open(content);
	}
}

