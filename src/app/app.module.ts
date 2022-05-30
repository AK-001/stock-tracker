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
      clientId: '52c91d93-6be7-4553-9a66-a88099874f24',
      redirectUri: 'https://earnest-gnome-231e1a.netlify.app/',
      postLogoutRedirectUri: 'https://earnest-gnome-231e1a.netlify.app/'
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
