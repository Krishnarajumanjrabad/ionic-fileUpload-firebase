import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {AfoListObservable} from "angularfire2-offline";

@Component( {
  selector: 'page-home',
  templateUrl: 'home.html'
} )
export class HomePage {
  public photos: Promise<any> | AfoListObservable<any[]>;
  @ViewChild( "input" )
  private nativeInputBtn: ElementRef;
  private fileInfo: any;
  private noteMessage: any = "Please select the file";
  private errorAlert: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public fileService: FileServiceProvider,
              public alertCrt: AlertController) {

  }

  //This method is the life cycle call from ionic framework.
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create( {
      content: 'Please wait content is loading...'
    } );
    loading.present();

    this.photos = this.fileService.getUploadedFile();
    if (this.photos) {
      console.log( 'found the record' );
    } else {
      console.log( 'no records were found' );
    }

    loading.dismiss();
  }

  fileUpload() {
    let files = this.nativeInputBtn.nativeElement.files;


    //Check whether file is browsed while clicking the upload button
    if (files.length == 0) {
      this.showAlert();
      return null;
    }

    let loading = this.loadingCtrl.create( {
      content: 'Please wait content is saving...'
    } );
    loading.present();


    return new Promise( (resolve, reject) => {
      for (this.fileInfo of files) {

        this.blobToBase64( this.fileInfo ).then( (base64) => {
          if (base64) {
            this.fileService.addFileServices( base64 ).then( res => {
              console.log( res );
            } );
          }
          loading.dismiss();
          resolve();
        } ).catch( (err) => {
          console.log( err );
        } );

      }

      // this.sendPhotoForm.reset();
      this.ionViewDidLoad();

    } );
  }

  private showAlert() {
    this.errorAlert = this.alertCrt.create( {
      title: 'No File selected',
      message: this.noteMessage,
      buttons: [
        {
          text: "Ok",
          handler: data => {
            console.log( 'Save Clicked' );

            return null;
          }

        }
      ]
    } );
    this.errorAlert.present();
  }

  private blobToBase64(blob) {
    return new Promise( (resolve) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        //This will convert to base64 string
        resolve( reader.result );
      };
      reader.readAsDataURL( blob );

    } ).catch( (err) => {
      console.log( err );
    } );

  }

}
