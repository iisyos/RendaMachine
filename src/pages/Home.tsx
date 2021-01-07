import { IonFab,IonIcon,IonFabButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { type } from 'os';
import React  ,{ FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import './Home.css'
import { IonButton,IonGrid, IonRow, IonCol,IonRippleEffect } from '@ionic/react';
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import { Link, RouteComponentProps, useHistory} from "react-router-dom";
import Cookies from 'js-cookie'
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

type PageProps = {} & RouteComponentProps<{name: string}>;

const Home: React.FC  <PageProps> = (props) => {
  const history = useHistory();
  function Square(props:any){
    return <button className="square" onClick={props.onClick}>
      {/* {props.value} */}
    </button>
  }


  class Board extends React.Component<{name:string},{squares:any,xIsNext:boolean,counter:number,pre_score:number}>{
    constructor(props:any){
      super(props);
      this.state={
        squares:Array(9).fill(null),
        xIsNext: true,
        counter:0,
        pre_score:0
      }
    }
    handleClick(i:any) {
      this.setState({counter:this.state.counter+1})
    }
    renderSquare(i:any){
      return(<div className="square2"><Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} /></div> );
    }
    async setObject() {
      await Storage.set({
        key: Cookies.get("namea")!,
        value: JSON.stringify({
          id: 1,
          score: this.state.counter??0
        })
      });
    }
    async getObject() {
      const ret = await Storage.get({ key: Cookies.get("namea")! });
      console.log(JSON.parse(ret!.value!)+"-------")
      const score = JSON.parse(ret!.value!)?.score??0;
      this.setState({pre_score:score})
    }

    setScore(){
      if(this.state.pre_score<this.state.counter){
        this.setObject()
      }
      Cookies.set("name2",Cookies.get("namea")!)
    }

    componentDidMount(){
      this.getObject()
    }

    render(){
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      return(
        <div>
          <IonGrid>
            <IonRow >
              <IonCol size="8" class="text-center">
            {Cookies.get("namea")}
              </IonCol>
              <IonCol>
              <IonButton color="light" routerLink='/initial' class='round' onClick={()=>this.setScore()}>Quit</IonButton>
              </IonCol>
            </IonRow>
          <IonRow class="ion-justify-content-center"><div><h1 className="ion-padding">{this.state.counter}</h1></div></IonRow>
          <div className="wrapper">
            <IonRow class="ion-justify-content-center">
          <IonRow>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </IonRow>
            <IonRow>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </IonRow>
            <IonRow>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </IonRow>
            </IonRow></div>
        </IonGrid>
        </div>
      )
    }
  }

  class Game extends React.Component<{name:string}>{
    componentDidMount(){
      console.log(props.match.params.name)
    }

    render(){
      return(
        <div><Board name="aaa"/></div>
      )
    }
  }
  ReactDOM.render(
    <Game name={props.match.params.name}/>,document.getElementById('root')
  )

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
