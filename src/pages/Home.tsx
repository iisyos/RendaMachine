import { IonFab,IonIcon,IonFabButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { type } from 'os';
import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css'
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
const Home: React.FC = () => {

  class Toggle extends React.Component <{},{count:number}>{
    constructor(props:any) {
      super(props);
      this.state = {
          count: 0
      }
      this.doPlus = this.doPlus.bind(this);
  }

  doPlus(){
    this.setState({count: this.state.count + 1})
}
  
  
    render() {
      return (
        <div>
        <h1 className="greeting" onClick={this.doPlus}>{this.state.count}</h1>
        <div className="ion-padding">
        <a className="btn-circle-flat" onClick={this.doPlus}>+</a>
        </div>
        </div>
        
      );
    }
  }
  
  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="dark">
        <IonIcon icon={add} />
      </IonFabButton>
      </IonFab>

      </IonContent>
    </IonPage>
  );


};

export default Home;
