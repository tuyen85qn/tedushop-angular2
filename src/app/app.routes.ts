import {Routes} from '@angular/router';
import {AuthGuard} from './core/authguard/auth.guard';

export const appRoutes: Routes = [
    {path:'',redirectTo:'login', pathMatch:'full'},
    {path:'login',loadChildren:'./login/login.module#LoginModule'},
    {path:'main',loadChildren:'./main/main.module#MainModule',canActivate:[AuthGuard]}
]