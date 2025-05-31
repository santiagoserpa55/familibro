import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  features = [
    {
      image: 'https://via.placeholder.com/150', // Reemplaza con URL real
      title: 'Historia Clínica Electrónica',
      description:
        'Facilita la gestión de información médica para garantizar una atención continua y segura.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Interoperabilidad de Sistemas',
      description:
        'Conexión entre EPS, IPS y usuarios para agilizar trámites y procesos administrativos.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Telemedicina',
      description:
        'Acceso a consultas médicas remotas, especialmente en zonas rurales o de difícil acceso.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Autorizaciones en Línea',
      description:
        'Sistema automatizado para la aprobación de servicios médicos en tiempo real.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Medicamentos en Línea',
      description:
        'Consulta de disponibilidad de medicamentos y órdenes de entrega desde cualquier lugar.',
    },
  ];
}
