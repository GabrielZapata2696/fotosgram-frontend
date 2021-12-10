import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelect = new EventEmitter<string>();
  @Input() avatarPrevio: string = 'av-1.png';

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };


  constructor() { }

  ngOnInit() {
    for (const avatar of this.avatars) {

      if (avatar.img === this.avatarPrevio) {
        avatar.seleccionado = true;
        break;
      } else {
        avatar.seleccionado = false;
      }
    }

  }


  seleccionarAvatar(avatar: any) {
    this.avatars.forEach(av => {
      av.seleccionado = false;
    });
    avatar.seleccionado = true;


    this.avatarSelect.emit(avatar.img);
  }



}
