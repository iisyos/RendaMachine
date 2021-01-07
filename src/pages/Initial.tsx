import { ReactComponent } from '*.svg';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './initial.css';
import {  IonLabel,IonInput,IonItem,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton,IonGrid, IonRow, IonCol,IonRippleEffect } from '@ionic/react';
import { analytics, dice } from 'ionicons/icons';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { Router, Route, withRouter, RouteComponentProps } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Link, useHistory} from "react-router-dom";
import Cookies from 'js-cookie'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const Initial: React.FC<RouteComponentProps> =(props) =>{
    let s:boolean=true;


    const [text, setText] = useState<string>();

    function Score_col(props:any){
        return (
            <IonCol className="text-center">
                <div style={{color:'red'}}>
                    {props.value}
                </div>
                <div>{props.score}</div>
            </IonCol>
        )

    }
    
    class Page extends React.Component<{},{score:number,initial:boolean}>{
        
        constructor(props:any){
            super(props);
            this.state={
                score:0,
                initial:true
            }
          }
            async getObject() {
                const ret = await Storage.get({ key: Cookies.get("namea")! });
                console.log(JSON.parse(ret!.value!)+"-------")
                const score = JSON.parse(ret!.value!)?.score??0;
                this.setState({score:score})
              }
          componentDidMount(){
              this.getObject()
              if(Cookies.get("name2") && this.state.initial){
                  console.log(text)
                  if(text){Cookies.set("name2",text!)}
                  setText(Cookies.get("name2")!)
                  console.log(this.state.initial)
                  this.setState({initial:false})
                  console.log(this.state.initial)
                  console.log(s+"aaaaaa")
                  s=false;
              }
    // setText(Cookies.get("name2"))
    Cookies.get("name2")??console.log(text+"aaaaaaaaaaaaaa")
    // Cookies.get("name2")??console.log("qqqqqqqqqqqqqqqqq")
    // Cookies.get("name2")?console.log("ppppppppppppqqqqqqqqqqqqqqqqq")
          }
        render(){
            return(
                <IonRow>
                    <Score_col value="10s" score={this.state.score.toString()}/>
                    <Score_col value="60s"/>
                    <Score_col value="endless"/>
                </IonRow>
            )
        }
    }
    const history = useHistory();
    function NextPage(){
        history.push({
            pathname: '/home',
            state: { name: text }
          })
          Cookies.set("namea",text!)
    }

    return (
        <IonContent>
        <IonGrid>
            <Page/>
            <IonRow className="text-center">
                <IonCol className="title">
                    <div>Renda</div>
                    <div>Machine</div>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
            <IonCol size="8">
                     <IonItem>
                     <IonInput class="ion-text-center" value={text} placeholder="Player Name" onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
                </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-around">
                  <IonButton color="primary" className="round">10s</IonButton>
                  <IonButton color="primary" className="round">60s</IonButton>
                  <IonButton color="primary" className="round">endless</IonButton>
    </IonRow>
    <IonRow class="ion-justify-content-center">
    <IonButton class="custom" onClick={()=> NextPage()}>PLAY</IonButton>
    </IonRow>
          </IonGrid>
      </IonContent>
      );
}
export default Initial;

// props.history.push({pathname:'/home',state:{name:"aaa"}})