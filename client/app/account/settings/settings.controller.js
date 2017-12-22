'use strict';
// @flow

type User = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default class SettingsController {
  user: User = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  Auth;

  /*@ngInject*/
  constructor(Auth, Upload) {
    this.Auth = Auth;
    this.Upload = Upload;

  }



  addFile(){

    console.log("Add File Function");
    console.log(this.file);

    if(/jpg$/.test(this.file.name)){
      this.nameFile = this.file.name;
      this.Upload.upload({
        url :'api/users/upload',/* https://angular-file-upload-cors-srv.appspot.com/upload */
        data : {file : this.file}
      }).then(this.ChargerFichier());
    }

    else if(/PNG$/.test(this.file.name)) {
      this.nameFile = this.file.name;
      this.Upload.upload({
        url :'api/users/upload',
        data : {file : this.file}
      }).then(this.ChargerFichier());
    }

    else if(/JPG$/.test(this.file.name)) {
      this.nameFile = this.file.name;
      this.Upload.upload({
        url :'api/users/upload',
        data : {file : this.file}
      }).then(this.ChargerFichier());
    }

    else if(/png$/.test(this.file.name)) {
      this.nameFile = this.file.name;
      this.Upload.upload({
        url :'api/users/upload',
        data : {file : this.file}
      }).then(this.ChargerFichier());
    } else {
      alert("ce n'est pas un fichier Image");
    }
}

ChargerFichier(){

console.log("Charge File Function");
  if (!/jpg$/.test(this.nameFile)){
    this.nameFile = this.nameFile + ".jpg";
  } else if (!/png$/.test(this.nameFile)) {
    this.nameFile = this.nameFile + ".png";
  }
   /*this.$http.get('/../assets/images/'+this.nameFile)
      .then(response => {
      //this.awesomeStudent = response.data.etudiants;
      //this.awesomeChoice = response.data.Choix;
      //this.onglet="valide";
  });*/
}


  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
