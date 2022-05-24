import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StockinfoService } from '../services/stockinfo.service';
import { EndpointconfigService } from '../services/endpointconfig.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  [x: string]: any;

  username: string | undefined;
  configuredendpoints: object | undefined;

  constructor(private authService: MsalService, private StockinfoService: StockinfoService, private formBuilder: FormBuilder, private reactiveFormsModule: ReactiveFormsModule, private endpointconfigService: EndpointconfigService) { }

  getName () : any {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }
    return this.authService.instance.getActiveAccount()?.username;
  }

  // saveConfigHandler () {
  //   console.log('called stock');
  //   this.StockinfoService.getStockinfo();
  // }

  ngOnInit(): void {
    this.username = this.getName();
    this.endpointconfigService.fetchEndpoints().then(res => {this.configuredendpoints = res[0].data.url});
    console.warn("configuredendpoints"+this.configuredendpoints)
  }

  apiConfigForm = this.formBuilder.group({
    endpointURL: '',
    endpointMethod: '',
    headerParam1: '',
    headerParam2: '',
    headerParam1Value: '',
    headerParam2Value: '',
    reqParam: '',
    reqParamValue: '',
    optionalParam: '',
    optionalParamValue: ''
  });
  
  onSubmit(){
    this.endpointconfigService.saveEndpointConfig(this.apiConfigForm.value.endpointURL);
    window.location.reload();
  }
}