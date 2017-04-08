import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	todos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
      this.todos = af.database.list('/todos');
  }

  addTodo(){
    let prompt = this.alertCtrl.create({
      title: 'TODO',
      message: "Enter a title for this new todo you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.todos.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
}

showOptions(todoId, todoTitle) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Todo',
        role: 'destructive',
        handler: () => {
          this.removeTodo(todoId);
        }
      },{
        text: 'Update title',
        handler: () => {
          this.updateTodo(todoId, todoTitle);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeTodo(todoId: string){
  this.todos.remove(todoId);
}

updateTodo(todoId, todoTitle){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Update the name for this song",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: todoTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.todos.update(todoId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

}
