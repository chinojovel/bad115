import { Routes } from '@angular/router';
//import {LoginComponent} from './login/login.component';
import {RolComponent} from './rol/rol/rol.component';
import {PermisoComponent} from './permiso/permiso/permiso.component';
import {ProfesionComponent} from './profesion/profesion/profesion.component';
import {EmpresaComponent} from './empresa/empresa/empresa.component';
import {UnidadComponent} from './unidad/unidad/unidad.component';
import {CentroComponent} from './centro/centro/centro.component';
import {AreaComponent} from './area/area/area.component';
import {SubunidadComponent} from './subunidad/subunidad/subunidad.component';
import {PuestoComponent} from './puesto/puesto/puesto.component';
import {EmpleadoComponent} from './empleado/empleado/empleado.component';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import {PlanillaComponent} from './planilla/planilla/planilla.component';
import {DepartamentoComponent} from './departamento/departamento/departamento.component'; 
import {EstadoComponent} from './estado/estado/estado.component';
import {MunicipioComponent} from './municipio/municipio/municipio.component';
import {PaisComponent} from './pais/pais/pais.component';
import {SexoComponent} from './sexo/sexo/sexo.component'; 
import { AuthComponent } from './auth/auth.component';
import { HttpClient } from '@angular/common/http';
export const routes: Routes = [
    //{ path: '', component:  LoginComponent},
    { path: 'roles', component:  RolComponent},
    { path: 'permisos', component:  PermisoComponent},
    { path: 'profesiones', component:  ProfesionComponent},
    { path: 'empresas', component:  EmpresaComponent},
    { path: 'unidades', component:  UnidadComponent},
    { path: 'centros', component:  CentroComponent},
    { path: 'areas', component:  AreaComponent},
    { path: 'subunidades', component:  SubunidadComponent},
    { path: 'puestos', component:  PuestoComponent},
    { path: 'empleados', component:  EmpleadoComponent},
    { path: 'usuarios', component:  UsuarioComponent},
    { path: 'planillas', component:  PlanillaComponent},
    { path: 'departamentos', component:  DepartamentoComponent},
    { path: 'estados', component:  EstadoComponent},
    { path: 'municipios', component:  MunicipioComponent},
    { path: 'paises', component:  PaisComponent},
    { path: 'sexos', component:  SexoComponent},
    {path: '', component: AuthComponent}
];
