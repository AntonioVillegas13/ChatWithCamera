import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { observable, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { PhotoService } from '../../services/photo.service'

import { AngularFireStorage } from '@angular/fire/storage';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  
  messages: Observable<any[]>;
  newMsg = '';
  secretKey = "EtuhVJjemKlfIaDNyYIgyljbjpUn4rH4bKACH2og";

  constructor(public photoService: PhotoService,
    private storage: AngularFireStorage,
    private chatService: ChatService,
     private router: Router) { }


  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.content.scrollToBottom();
    
  }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
    this.getImages();
  }




  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }


 
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
  getImages(){
   
    const filePath = "";
    // Crea una referencia de acceso
    const fileRef = this.storage.ref(filePath);
    let listPhotos=fileRef.listAll();
    window.alert(listPhotos);


    console.log("Fotos", listPhotos.forEach);

  }

}
