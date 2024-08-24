//angular
import { Component, inject, OnInit, ViewChild } from '@angular/core';
//bootstrab
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { generalService } from '../../services/general.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { NgbPaginationModule, NgbModalConfig  } from '@ng-bootstrap/ng-bootstrap';
//service
//import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-Contacto',
  templateUrl: './contacto.component.html',
  standalone: true,
	imports: [NgbCarouselModule, FormsModule, NgFor, NgbDatepickerModule],
  styleUrls: ['./contacto.component.css']
})



export class ContactoPageComponent implements OnInit {
  today = inject(NgbCalendar).getToday();

	model:NgbDateStruct | undefined;
	date: { year: number; month: number; } | undefined;
  contactos:any;

  id:any=0;
  data:any={
    id:this.id,
    nombre:"",
    apellido:"",
    notas:"",
    cumple:"",
    paginaWeb:"",
    empresa:"",

  }
  constructor(
   private service:generalService,
   private route:ActivatedRoute,
   private config: NgbModalConfig,
   private modalService: NgbModal,
  ){
    this.route.params.subscribe(params =>{
      this.id=params['id'];
    })

  }

  ngOnInit(): void {
    if(this.id!=0){
      this.getContacto(this.id)
    }


  }

  send(){
    if(this.data.id==0){
      this.service.createContacto(this.data).subscribe((response:any) => {
        console.log(response);
        if(response.status==201 || response.status==200){
          let html=this.htmlModal();
          this.open(html);

        }
      },error =>{
        console.log(error);
        let html=this.htmlModal(error.error.errors);
        this.open(html);
      });
    }else{
      this.service.updateContacto(this.data).subscribe((response:any) => {
        console.log(response)
        if(response.status==201 || response.status==200){
          let html=this.htmlModal();
          this.open(html);
        }
      },error =>{
        let html=this.htmlModal(error.error.errors);
        this.open(html);
      });
    }

  }

  getContacto(id:any){
    this.service.getContacto(id).subscribe((response:any) => {
      this.contactos=response.contactos;
      this.data.id=this.contactos.id;
      this.data.nombre=this.contactos.nombre;
      this.data.apellido=this.contactos.apellido;
      this.data.notas=this.contactos.notas;
      this.data.cumple=this.contactos.cumple;
      this.data.paginaWeb=this.contactos.paginaWeb;
      this.data.empresa=this.contactos.empresa;
      console.log(this.data);
    },error =>{
      console.log(error);
    });
  }
  open(content:any) {

		this.modalService.open(content);
	}

  htmlModal(error:any=1){
    let html=``;
    let errors:string=JSON.stringify(error);
    if(error!=1){
      html=errors;
    }else{
      html=`
        Your contacto save successfull
      `;
    }

    return html;
  }
}
