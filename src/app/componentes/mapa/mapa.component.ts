import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

//import * as mapboxgl from 'mapbox-gl';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coordenadas: string = '';
  @ViewChild('mapa', { static: true }) mapa: any;

  constructor() { }

  ngOnInit() {
    console.log(this.coordenadas);

    const latLng = this.coordenadas.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhY2VtYW5mcm9taGVsbCIsImEiOiJja3Ryd3ZuOG8xNG5vMnVxc3B0djUyN3kxIn0.J3dSDs4jw92dRyBIrqnpMw';
    const map = new mapboxgl.Map({
      //container: 'mapa',
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
      zoom: 15,
      center: [lng, lat]
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    //   const latLng = this.coordenadas.split(',');
    //   const lat = Number(latLng[0]);
    //   const lng = Number(latLng[1]);

    //   // instanciar mapbox para asignarle el token
    //   const mapbox = (mapboxgl as typeof mapboxgl);
    //   mapbox.accessToken = 'pk.eyJ1Ijoic3BhY2VtYW5mcm9taGVsbCIsImEiOiJja3RyeDA2OHUxYXhyMndwMzN0bnVhbjcyIn0.CK7M5zsPtGcpk8klkTWBHw'; // su token aqui

    //   // crear instancia del mapa
    //   const map = new mapbox.Map({
    //     container: this.mapa.nativeElement,  // elemento div map en html
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     zoom: 15,
    //     center: [lng, lat]
    //   });

    //   // posicionar un marcador en las coordenadas del post
    //  
  }

}
