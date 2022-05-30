import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Customer, AnalystService} from '../services/analyst.service';
import { StockinfoService } from '../services/stockinfo.service';
import { EndpointconfigService } from '../services/endpointconfig.service';


@Component({
  selector: 'app-analyst-page',
  templateUrl: './analyst-page.component.html',
  styleUrls: ['./analyst-page.component.css']
})

export class AnalystPageComponent implements OnInit {

  customers:any;
  endpointurl:any;

  constructor(service: AnalystService, private stockinfo: StockinfoService, private endpointconfigService: EndpointconfigService) {
    
  }

  ngOnInit(): void {
    //setInterval(()=> { this.stockinfo.getStockinfo().subscribe((x : any) => { console.log('Func executed subs'+JSON.stringify(x[0].data.quotes));this.customers = x[0].data.quotes}); }, 3000);
    //this.stockinfo.getStockinfo().subscribe((x : any) => { console.log('subs'+JSON.stringify(x[0].data.quotes));this.customers = x[0].data.quotes});
    setInterval(()=> { this.endpointconfigService.fetchEndpoints().then(res => {this.endpointurl = res[res.length-1].data.url;
      this.stockinfo.getStockinfo(encodeURIComponent(this.endpointurl)).then( r => {console.log("csl"+res);this.customers = r[r.length-1].data.quotes} );
    })},3000)
  }
  onExporting(e: { component: any; cancel: boolean; }) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('StockQuotes');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
    e.cancel = true;
  }

}
