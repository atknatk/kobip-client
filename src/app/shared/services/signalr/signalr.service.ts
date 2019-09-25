import { Injectable } from '@angular/core';
import { SingletonService } from '../singleton.service';

declare const $: any;

@Injectable()
export class SignalrService {
  constructor(private _singleton: SingletonService) {

  }

  private _chatHub;

  get chatHub() {
    return this._chatHub;
  }

  connectChat() {
    if (this._singleton.loadedHubs === false) {
      $.getScript('signalr/hubs').done(this._connectChat);
      this._singleton.setLoadedHubs(true);
    } else {
      this._connectChat();
    }
  }


  private _connectChat() {
    /*this._chatHub = $.connection.kobipChatHub;
    /!*this._chatHub.client.broadcastMessage = function (name, message) {
      // Html encode display name and message.
      var encodedName = $('<div />').text(name).html();
      var encodedMsg = $('<div />').text(message).html();
      // Add the message to the page.
      $('#discussion').append('<li><strong>' + encodedName
        + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };*!/
    */
    // $.connection.hub.url = 'http://localhost:53431/signalr/';
    $.connection.hub.logging = true;
    $.connection.hub.start().done(() => {
      console.log('Started');
    });
  }


  private initChat() {
    this._chatHub.server.subscribe().done(function (stocks) {

    });
  }

}
