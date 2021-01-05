import { IonFab,IonIcon,IonFabButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { type } from 'os';
import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css'
import { IonButton,IonGrid, IonRow, IonCol,IonRippleEffect } from '@ionic/react';
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
const Home: React.FC = () => {

  function Square(props:any){
    return <button className="square" onClick={props.onClick}>
      {/* {props.value} */}
    </button>
  }


  class Board extends React.Component<{},{squares:any,xIsNext:boolean,counter:number}>{
    constructor(props:any){
      super(props);
      this.state={
        squares:Array(9).fill(null),
        xIsNext: true,
        counter:0
      }
    }
    handleClick(i:any) {
      // const squares = this.state.squares.slice();
      // squares[i] =this.state.xIsNext? 'X':"O";
      // this.setState({squares: squares,xIsNext:!this.state.xIsNext});
      this.setState({counter:this.state.counter+1})
    }
    renderSquare(i:any){
      return( <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
    }

    render(){
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

      return(
        <div>
          <IonGrid>
            <IonRow >
              <IonCol size="8" class="text-center">
               playing
              </IonCol>
              <IonCol>
              <IonButton color="light" routerLink='/initial' class='round'>Quit</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div><h1 className="ion-padding">{this.state.counter}</h1></div>
        <div className="inner">
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
           <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div></div>
        </div></div>
      )
    }
  }

  class Game extends React.Component{
    render(){
      return(
        <div><Board/></div>
      )
    }
  }
  ReactDOM.render(
    <Game/>,document.getElementById('root')
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
