import { Component } from '@angular/core';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss']
})
export class PoliticasComponent {
  policies = [
    {
      image: 'https://www.adres.gov.co/PublishingImages/Header%20Logos/logo-adres.png',
      title: 'ADRES',
      description: 'En la EPS familiar de Colombia para generar cualquier autorización se verifica los derechos de los afiliados.'
    },
    {
      image: 'assets/Imagen2.png',
      title: '',
      description: 'El proceso de autorizaciones de la EPS Familiar de Colombia contara con los medios o recursos físicos, humanos ytecnológicos para garantizar la comunicación fluida y  articulada con los PSS y PTS y los usuarios.'
    },
    {
      image: 'assets/Imagen3.png',
      title: '',
      description: 'Los servicios contratados por PGP no requieren autorización individual.'
    },    {
      image: 'assets/Imagen4.png',
      title: '',
      description: 'Las ordenes de servicios domiciliarios ambulatorios deben ser reportados por PSS, PTS o el usuario a través de los correos electrónicos dispuestos por la EPS y las autorizaciones se remitirán a los correos que notifiquen los usuarios y los PSS, PTS previo cumplimiento del proceso de autorización y aprobación del medio y sus usuarios.'
    },    {
      image: 'assets/Imagen5.png',
      title: '',
      description: 'El horario de atención de los afiliados se iniciará desde las 7 am hasta las 3 pm de lunes a viernes de manera continua sin interrupción.'
    },    {
      image: 'assets/Imagen6.png',
      title: '',
      description: 'Los usuarios deben ser orientados de acuerdo con su patología al prestador que atenderáy entregará la tecnología de salud prescrita (PSS y PTS).'
    },    {
      image: 'assets/Imagen7.png',
      title: '',
      description: 'Las autorizaciones tienen una vigencia de 60 días calendario, si estas se vencen se deben anular y renovar por el mismo tiempo de la inicial si el usuario lo solicita.'
    }
  ];
}
