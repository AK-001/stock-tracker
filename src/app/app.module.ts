import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalystPageComponent } from './analyst-page/analyst-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DxDataGridModule } from 'devextreme-angular';
import { AnalystService } from './services/analyst.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      //clientId: 'a9bf3b96-929a-4059-9b0b-71c2f60f0466',
      clientId: '871433f3-956b-4623-a835-c7389982905d',
      redirectUri: 'http://localhost:8888/',
      postLogoutRedirectUri: 'http://localhost:8888/'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    AnalystPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    DxDataGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    AnalystService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
