import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMeansService } from '../../shared/services/contact-means.service';
import { UserService } from '../../shared/services/user.service';
import { BaseService } from '../../shared/services/base.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  private contactMeansService = inject(ContactMeansService)
  private baseService = inject(BaseService)

  session;
  btnDisabled:boolean = true;
  showChannels:boolean = false;
  collectionAlerts = [
    {
      name: "Correo eléctronico",
      id: "collectionAlerts1",
      check: true
    },
    {
      name: "Mensaje de texto",
      id: "collectionAlerts2",
      check: true
    },
    {
      name: "Llamada",
      id: "collectionAlerts3",
      check: true
    },
    {
      name: "Whatsapp",
      id: "collectionAlerts4",
      check: true
    },
  ]
  advertisingMessages = [
    {
      name: "Correo eléctronico",
      id: "advertisingMessages1",
      check: true
    },
    {
      name: "Mensaje de texto",
      id: "advertisingMessages2",
      check: true
    },
    {
      name: "Llamada",
      id: "advertisingMessages3",
      check: true
    },
    {
      name: "Whatsapp",
      id: "advertisingMessages4",
      check: true
    },
  ]

  invoiceNegotiation = [
    {
      name: "Correo eléctronico",
      id: "invoiceNegotiation1",
      check: true
    },
    {
      name: "Mensaje de texto",
      id: "invoiceNegotiation2",
      check: true
    },
    {
      name: "Llamada",
      id: "invoiceNegotiation3",
      check: true
    },
    {
      name: "Whatsapp",
      id: "invoiceNegotiation4",
      check: true
    },
  ]

  constructor() {
    this.session = this.baseService.getSession();
    this.getContactMeans();
  }

  ngOnChanges(){
    this.getContactMeans();
  }

  async getContactMeans(){
    await this.contactMeansService.getDontBother(this.session.idUser).subscribe(async (response:any)  => {
      await this.collectionAlerts.forEach((item, index) => {
        if(response.dataUser.data[0].notificationChannelCollectionId.includes(index+1)){
          item.check = true;
        }else{
          item.check = false;
        }
      })
      
      await this.invoiceNegotiation.forEach((item, index) => {
        if(response.dataUser.data[0].notificationChannelInvoiceNegotiationId.includes(index+1)){
          item.check = true;
        }else{
          item.check = false;
        }
      })

      await this.advertisingMessages.forEach((item, index) => {
        if(response.dataUser.data[0].notificationChannelAdvertisingId.includes(index+1)){
          item.check = true;
        }else{
          item.check = false;
        }
      })
      this.showChannels = await  true;
    })
  }

  sendChannel(){
    const CollectionId: number[] = []
    this.collectionAlerts.map((item, index) => {
      if(item.check){
        CollectionId.push(index + 1)
      }
    })

    const AdvertisingId: any[] = []
    this.advertisingMessages.map((item, index) => {
      if(item.check){
        AdvertisingId.push(index + 1)
      }
    })

    const InvoiceNegotiationId: any[] = []
    this.invoiceNegotiation.map((item, index) => {
      if(item.check){
        InvoiceNegotiationId.push(index + 1)
      }
    })

    const data = {
      notificationChannelCollectionId: CollectionId,
      notificationChannelInvoiceNegotiationId: InvoiceNegotiationId,
      notificationChannelAdvertisingId: AdvertisingId,
      userId: this.session.idUser
    }
    
    this.contactMeansService.putDontBother(data).subscribe(response => {
      console.log(response);
      this.btnDisabled = true;
      this.showChannels =  false;
      this.getContactMeans();
    })
  }

  changeCheck(){
    console.log("ddddddddddddddddddddddddddddddd");
    this.btnDisabled = false;
  }

}
