import { ReactComponent } from '*.svg';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './initial.css';
import {  IonLabel,IonInput,IonItem,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton,IonGrid, IonRow, IonCol,IonRippleEffect } from '@ionic/react';
import { dice } from 'ionicons/icons';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { Router, Route, withRouter } from 'react-router';
const Initial: React.FC =() =>{

    const [text, setText] = useState<string>();
    function Score_col(props:any){
        return (
            <IonCol className="text-center">
                <div style={{color:'red'}}>
                    {props.value}
                </div>
                <div>~~~</div>
            </IonCol>
        )

    }
    class Page extends React.Component{
        render(){
            return(
                <IonRow>
                    <Score_col value="10s"/>
                    <Score_col value="60s"/>
                    <Score_col value="endless"/>
                </IonRow>
            )
        }
    }

    // ReactDOM.render(<Page/>,document.getElementById('root')

    // )

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
    <IonButton class="custom" routerLink="/home">PLAY</IonButton>
    </IonRow>
          </IonGrid>
      </IonContent>
      );
}
export default Initial;