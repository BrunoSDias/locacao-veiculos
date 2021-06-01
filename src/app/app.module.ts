import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmacaoPagamentoComponent } from './confirmacao-pagamento/confirmacao-pagamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    VeiculoComponent,
    CadastroComponent,
    CheckoutComponent,
    ConfirmacaoPagamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
