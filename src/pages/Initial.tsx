import { ReactComponent } from '*.svg';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './initial.css';
import {  IonLabel,IonInput,IonItem,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonToast,IonButton,IonGrid, IonRow, IonCol,IonRippleEffect } from '@ionic/react';
import { alarmSharp, analytics, dice } from 'ionicons/icons';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { Router, Route, withRouter, RouteComponentProps } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Link, useHistory} from "react-router-dom";
import Cookies from 'js-cookie'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
let s:boolean=true;
const Initial: React.FC<RouteComponentProps> =(props) =>{
    

    const [showToast1, setShowToast1] = useState(false);
    const [text, setText] = useState<string>();
    const [mode,setMode]=useState<number>();
    let ten_list=[]
    let six_list=[]
    let endless_list=[]

 
    function Score_col(props:any){
        return (
            <IonCol className="text-center top">
                <div style={{color:'red'}}>
                    {props.value}
                </div>
                <div >{props.score}</div>
            </IonCol>
        )

    }
    class Board extends React.Component<{},{ten_list:any[],six_list:any[],endless_list:any[]}>{
          constructor(props:any){
            super(props);
            this.state={
                ten_list:[],
                six_list:[],
                endless_list:[]

            }
          }
          async getObject() {
             const ret = await Storage.get({ key: text!});
            console.log(JSON.parse(ret!.value!)+"-------")
            const score = JSON.parse(ret!.value!);
            for(var i in score){
                this.state.ten_list.push({name:text!,score:score[i]?.score??0})
                this.state.six_list.push({name:text!,score:score[i]?.six_score??0})
                this.state.endless_list.push({name:text!,score:score[i]?.endless_card??0})
            }
            this.state.ten_list.sort( function(a, b) {
 
                return a.score < b.score ? 1 : -1;
             
            })
            this.state.ten_list.sort( function(a, b) {
 
                return a.score < b.score ? 1 : -1;
             
            })
            this.state.ten_list.sort( function(a, b) {
 
                return a.score < b.scpre ? 1 : -1;
             
            })

          }
    
          componentDidMount(){
              this.getObject()

          }

        render(){
            return <div>
                
            </div>
        }
    }
    

    class Page extends React.Component<{},{score:number,initial:boolean,six_score:number,endless:number}>{

        constructor(props:any){
            super(props);
            this.state={
                score:0,
                initial:true,
                six_score:0,
                endless:0
            }
          }

            async getObject() {
                const ret = await Storage.get({ key: Cookies.get("namea")! });
                console.log(JSON.parse(ret!.value!)+"-------")
                const score = JSON.parse(ret!.value!);
                this.setState({score:score?.score??0,six_score:score?.six_score??0,endless:score?.endless_score??0})
              }
              async name_change(){
                     const ret = await Storage.get({ key: text!});
                    console.log(JSON.parse(ret!.value!)+"-------")
                    const score = JSON.parse(ret!.value!);
                if(ret){
                    this.setState({score:score?.score??0,six_score:score?.six_score??0,endless:score?.endless_score??0})

                }
              }
          componentDidMount(){
            console.log(s+"aaaaaa")
              this.getObject()
              if(Cookies.get("name2") && this.state.initial && s){
                  console.log(s)
                  if(text){Cookies.set("name2",text!)}
                  setText(Cookies.get("name2")!)
                  this.setState({initial:false})
                  s=false;
                  setMode(parseInt(Cookies.get("mode")!,10))
              }
              this.name_change()
          }
        render(){
            return(
                <IonRow>
                    <Score_col value="10s"  score={this.state.score.toString()}/>
                    <Score_col value="60s"  score={this.state.six_score.toString()}/>
                    <Score_col value="endless"  score={this.state.endless.toString()}/>
                </IonRow>
            )
        }
    }
    const history = useHistory();
    function NextPage(){
        if(text && mode!== undefined){history.push({
            pathname: '/home',
            state: { name: text }
          })}
          Cookies.set("namea",text!)
          Cookies.set("mode",mode?.toString()!)
    }



    return (
        <IonContent >
            <IonPage className="back">
        <IonGrid>
            <Page />
            <IonRow className="text-center">
                <IonCol className="title">
                    <div>Renda</div>
                    <div>Machine</div>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
            <IonCol size="8">
                     <IonItem>
                     <IonInput class="ion-text-center top" value={text} placeholder="Player Name" onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
                </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-around">
                  <IonButton color={mode==0?"primary":"medium"} className="round top" onClick={()=>setMode(0)}>10s</IonButton>
                  <IonButton color={mode==1?"primary":"medium"} className="round top" onClick={()=>setMode(1)}>60s</IonButton>
                  <IonButton color={mode==2?"primary":"medium"} className="round top" onClick={()=>setMode(2)}>endless</IonButton>
    </IonRow>
    <IonRow class="ion-justify-content-center">
    <IonButton class="custom top"  onClick={()=> text?NextPage():setShowToast1(true)}>PLAY</IonButton>
    </IonRow>
    <IonRow>
        
    </IonRow>
          </IonGrid></IonPage>
          <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Enter Player Name"
        duration={1000}

      />
      </IonContent>

      );
}
export default Initial;

// props.history.push({pathname:'/home',state:{name:"aaa"}})