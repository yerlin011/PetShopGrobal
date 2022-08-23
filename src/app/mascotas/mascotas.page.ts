import { Component } from '@angular/core';
import { ideaTags } from '../idea.interface';
import { IdeasService } from '../core/services/ideas.service';
import { AuthService } from '../core/services/auth.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { Producto } from '../core/services/models/producto';
import { ProductoService } from '../core/services/mascotas.service';
import { GLOBAL } from '../core/services/global';



@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
  providers:[ProductoService]

})
export class MascotasPage {

  
  public titulo:String;
  public productos:Producto[];
  public confirmado;
  public urlImagen: String;

  ideas$ = this.ideasService.getAll();
  user$ = this.authService.user$;

  constructor(
   private _route:ActivatedRoute,
   private _router:Router,
   private _productoService:ProductoService,
   
   private ideasService: IdeasService,
   private authService: AuthService


  ){

   this.confirmado=null;
   this.titulo = "Listado de mascotas";
   this.urlImagen = GLOBAL.urlForImage;
   this.getListaProductos();

  }


 mensajePermiso(){

  alert("No tiene permisos para realizar esta acción")
 }
  /**

* Permite listar todos los productos disponibles

* 

* @return  {void}

*/

  getListaProductos(){

    this._productoService.getProductos().subscribe(
      result=>{
        

        if(result.code!=200){

          console.log(result);
        }else{
          this.productos = result.data;

        }
     
        
      },
      error=>{
        console.log(<any>error);
      }

     );
  }

  goToCreateIdea() {
    this._router.navigate(['/create']);
  }

  goToLogin() {
    this._router.navigate(['/auth/login']);
  }
}
