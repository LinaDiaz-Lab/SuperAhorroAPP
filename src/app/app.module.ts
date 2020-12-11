import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/paginas/inicio/inicio.component';
import { CategoriasComponent } from './componentes/paginas/categorias/categorias.component';
import { CarritoComponent } from './componentes/paginas/carrito/carrito.component';
import { HistorialComprasComponent } from './componentes/paginas/historial-compras/historial-compras.component';
import { ProcesarPagoComponent } from './componentes/paginas/procesar-pago/procesar-pago.component';
import { RegistroComponent } from './componentes/usuario/registro/registro.component';
import { InicioSesionComponent } from './componentes/usuario/inicio-sesion/inicio-sesion.component';
import { ActualizarDatosComponent } from './componentes/usuario/actualizar-datos/actualizar-datos.component';
import { AdministracionComponent } from './componentes/paginas/administracion/administracion.component';
import { PaginaNoEncontradaComponent } from './componentes/paginas/pagina-no-encontrada/pagina-no-encontrada.component';
import { ListaUsuarioComponent } from './componentes/paginas/listas/lista-usuario/lista-usuario.component';
import { ListaFacturaComponent } from './componentes/paginas/listas/lista-factura/lista-factura.component';
import { ListaClienteComponent } from './componentes/paginas/listas/lista-cliente/lista-cliente.component';
import { ListaProductoComponent } from './componentes/paginas/listas/lista-producto/lista-producto.component';
import { InisioSesionCuentaComponent } from './componentes/usuario/inisio-sesion-cuenta/inisio-sesion-cuenta.component';

//firebase
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AuthService } from '../app/servicios/auth.service'

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CategoriasComponent,
    CarritoComponent,
    HistorialComprasComponent,
    ProcesarPagoComponent,
    RegistroComponent,
    InicioSesionComponent,
    ActualizarDatosComponent,
    AdministracionComponent,
    PaginaNoEncontradaComponent,
    ListaUsuarioComponent,
    ListaFacturaComponent,
    ListaClienteComponent,
    ListaProductoComponent,
    InisioSesionCuentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBPKcULY4pTomeV74BMUnHlMekn2k7YC0U",
      authDomain: "superahorro-6d495.firebaseapp.com",
      projectId: "superahorro-6d495",
      storageBucket: "superahorro-6d495.appspot.com",
      messagingSenderId: "293175854666",
      appId: "1:293175854666:web:9e9b5fa7313a131bafc8b3",
      measurementId: "G-EDX3BSVMR8"
    }),
    AngularFireAuthModule 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
