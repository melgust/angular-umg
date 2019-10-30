import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthorizatedGuard } from './guard/authorizated.guard';
import { TcProviderComponent } from './catalog/tc-provider/tc-provider.component';
import { TcProviderAddComponent } from './catalog/tc-provider-add/tc-provider-add.component';
import { TtOrder } from './model/tt-order';
import { TtOrderComponent } from './catalog/tt-order/tt-order.component';
import { TtOrderAddComponent } from './catalog/tt-order-add/tt-order-add.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'provider', component: TcProviderComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'provider/add', component: TcProviderAddComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'provider/:providerId/edit', component: TcProviderAddComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'order', component: TtOrderComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'order/add', component: TtOrderAddComponent, canActivate: [ AuthorizatedGuard ]},
  { path: 'order/:orderId/edit', component: TtOrderAddComponent, canActivate: [ AuthorizatedGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
