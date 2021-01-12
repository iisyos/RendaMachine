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
import { setInterval } from 'timers';

const { Storage } = Plugins;

type PageProps = {} & RouteComponentProps<{name: string}>;

const Home: React.FC  <PageProps> = (props) => {
  const history = useHistory();
  function Square(props:any){
    return <button className="square" onClick={props.onClick}>
      {/* {props.value} */}
    </button>
  }


  class Board extends React.Component<{name:string},{trigger:number,counter:number,pre_score:number,seconds:number,milliseconds:number,time:number}>{
    constructor(props:any){
      super(props);
      this.state={
        counter:0,
        pre_score:0,
        seconds:0,
        milliseconds:0,
        time: 0,
        trigger:0
      }
    }
    milli_update(){
      this.setState({
        milliseconds:this.state.milliseconds+1
      })
      if(this.state.milliseconds>=100){
        this.setState({seconds:this.state.seconds+1,milliseconds:0})
      }
      if(this.state.seconds>=10){
        this.setState({trigger:2})
      }
    }
    startgame(){
      setInterval(()=>this.milli_update(),10)
    }
    game_switch(){
      if(this.state.trigger==0){
        this.startgame();
        this.setState({trigger:1,counter:this.state.counter+1})
      }else if(this.state.trigger==1){
        this.handleClick();
        if(this.state.seconds>=10){
          this.setState({trigger:2})
        }
      }
    }




    handleClick() {
      this.setState({counter:this.state.counter+1})
    }
    renderSquare(){
      return(<div className="square2"><Square onClick={() => this.game_switch()} /></div> );
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
    toText(a:number,b:number){
      let c=a.toString()
      let d=b.toString()
      if(a==0){
        if(b<10){
          return "00:"+"0"+d
        }else{return "00:"+d}
      }else if(a<10){
        if(b<10){
          return "0"+c+":0"+d
        }
        return "0"+c+":"+d
      }else{
         if(b<10){
          return c+":0"+d
        }
        return c+":"+d
      }
    }

    render(){
      return(
        <div>
          <IonGrid>
            <IonRow >
              <IonCol size="8" class="text-center">
            {this.state.trigger==0?"Press any button":this.state.trigger==2?"Finish":this.toText(this.state.seconds,this.state.milliseconds)}
              </IonCol>
              <IonCol>
              <IonButton color="light" routerLink='/initial' class='round' onClick={()=>this.setScore()}>Quit</IonButton>
              </IonCol>
            </IonRow>
          <IonRow class="ion-justify-content-center"><div><h1 className="ion-padding">{this.state.counter}</h1></div></IonRow>
          <div className="wrapper">
            <IonRow class="ion-justify-content-center">
          <IonRow>
            {this.renderSquare()}
            {this.renderSquare()}
            {this.renderSquare()}
    
            </IonRow>
            <IonRow>
            {this.renderSquare()}
            {this.renderSquare()}
            {this.renderSquare()}
            </IonRow>
            <IonRow>
            {this.renderSquare()}
            {this.renderSquare()}
            {this.renderSquare()}
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
