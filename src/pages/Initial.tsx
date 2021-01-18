import { ReactComponent } from '*.svg';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './initial.css';
import { IonLabel, IonInput, IonItem, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonToast, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect } from '@ionic/react';
import { alarmSharp, analytics, bluetooth, dice } from 'ionicons/icons';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { Router, Route, withRouter, RouteComponentProps } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import SimpleBar from "simplebar-react";
import { Plugins } from '@capacitor/core';
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar/dist/simplebar.min.css";
import { inherits } from 'util';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const { Storage } = Plugins;
let s: boolean = true;
const Initial: React.FC<RouteComponentProps> = (props) => { 

    const [showToast1, setShowToast1] = useState(false);
    const [text, setText] = useState<string>();
    const [mode, setMode] = useState<number>();


    function Score_col(props: any) {
        return (
            <IonCol className="text-center">
                <div className="top" style={{ color: 'yellow'  }}>
                    {props.value}
                </div>
                <div className="score">{props.score}</div>
            </IonCol>
        )

    }

    class Board extends React.Component<{}, { ten_list: any[], six_list: any[], endless_list: any[], trigger: boolean }>{
        constructor(props: any) {
            super(props);
            this.state = {
                ten_list: [],
                six_list: [],
                endless_list: [],
                trigger: false

            }
        }


        async getObject() {
            const keys = (await Storage.keys()).keys
            let ten = []
            let six = []
            let endless = []
            for (var i in keys) {

                const ret = await Storage.get({ key: keys[i] });
                const score = JSON.parse(ret!.value!);

                ten.push({ name: keys[i], score: score?.score ?? 0 })
                six.push({ name: keys[i], score: score?.six_score ?? 0 })
                endless.push({ name: keys[i], score: score?.endless_score ?? 0 })
            }
            ten.sort(function (a, b) {
                return a.score < b.score ? 1 : -1;
            })
            six.sort(function (a, b) {
                return a.score < b.score ? 1 : -1;
            })
            endless.sort(function (a, b) {
                return a.score < b.score ? 1 : -1;
            })
            this.setState({ ten_list: ten, six_list: six, endless_list: endless })

        }

        componentDidMount() {
            this.getObject()


        }
        ranking(props:any){

            return <div></div>

        }

        
      LeftColumn = () => {

        
        return (
          <div
            id="left-column"
            className="bg-light p-2"
            style={{
              position: "inherit",

            }}
          >
            <SimpleBar className="box2"
            >
        <Table stickyHeader aria-label="sticky table ">
          <TableHead>
            <TableRow >
                <TableCell className={''+' rank aaa'}>
                  rank
                </TableCell>
            <TableCell className={'' +' name'+' aaa'}>
                  Player Name
                </TableCell>
                 <TableCell className={""+" scores aaa"}>
                  Score
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

                      {mode == 0 && this.state.ten_list.map((value,index) =><TableRow> <TableCell className={(index==0?'pa-0 first':index==1?'silver second':index==2?'blo third' :'')+' rank'} >{index+1}</TableCell><TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'') +" name"}>{value.name!}</TableCell> <TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'') +" scores"}>{ value.score}</TableCell></TableRow>)}
                      {mode == 1 && this.state.six_list.map((value,index) =><TableRow> <TableCell className={(index==0?'pa-0 first':index==1?'silver second':index==2?'blo third' :'')+' rank'}>{index+1}</TableCell><TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'')  +" name"}>{value.name!}</TableCell> <TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'') +" scores"}>{ value.score}</TableCell></TableRow>)}
                      {mode == 2 && this.state.endless_list.map((value,index) =><TableRow> <TableCell className={(index==0?'pa-0 first':index==1?'silver second':index==2?'blo third' :'')+' rank'}>{index+1}</TableCell><TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'')  +" name"}>{value.name!}</TableCell> <TableCell className={(index==0?' first':index==1?' second':index==2?' third' :'') +" scores"}>{ value.score}</TableCell></TableRow>)}

          </TableBody>
        </Table>

              {/* <h3>Left column</h3>
              <ul id="list" className="pl-4">
                {Array.from(new Array(20), (_, index) => (
                  <li key={index}>item {String(index + 1).padStart(2)}</li>
                ))}
              </ul> */}
            </SimpleBar>
          </div>
        );
      };

        render() {
            console.log(this.state.endless_list)
            return (
                <div className="box" >
                  <div><this.LeftColumn/></div>
                </div>
              );
            }
        //     return <div className="box top">
        //         {mode == 0 && this.state.ten_list.map((value) => <li>{value.name! + value.score}</li>)}
        //         {mode == 1 && this.state.six_list.map((value) => <li>{value.name! + value.score}</li>)}
        //         {mode == 2 && this.state.endless_list.map((value) => <li>{value.name! + value.score}</li>)}
        //     </div>
        // }
    }


    class Page extends React.Component<{}, { score: number, initial: boolean, six_score: number, endless: number }>{

        constructor(props: any) {
            super(props);
            this.state = {
                score: 0,
                initial: true,
                six_score: 0,
                endless: 0
            }
        }

        async getObject() {
            const ret = await Storage.get({ key: Cookies.get("namea")! });
            console.log(JSON.parse(ret!.value!) + "-------")
            const score = JSON.parse(ret!.value!);
            this.setState({ score: score?.score ?? 0, six_score: score?.six_score ?? 0, endless: score?.endless_score ?? 0 })
        }
        async name_change() {
            const ret = await Storage.get({ key: text! });
            console.log(JSON.parse(ret!.value!) + "-------")
            const score = JSON.parse(ret!.value!);
            if (ret) {
                this.setState({ score: score?.score ?? 0, six_score: score?.six_score ?? 0, endless: score?.endless_score ?? 0 })

            }
        }
        componentDidMount() {
            console.log(s + "aaaaaa")
            this.getObject()
            if (Cookies.get("name2") && this.state.initial && s) {
                console.log(s)
                if (text) { Cookies.set("name2", text!) }
                setText(Cookies.get("name2")!)
                this.setState({ initial: false })
                s = false;
                setMode(parseInt(Cookies.get("mode")!, 10))
            }
            this.name_change()
        }
        render() {
            return (
                <IonRow>
                    <Score_col value="10s" score={this.state.score.toString()} />
                    <Score_col value="60s" score={this.state.six_score.toString()} />
                    <Score_col value="endless" score={this.state.endless.toString()} />
                </IonRow>
            )
        }
    }
    const history = useHistory();
    function NextPage() {
        if (text && mode !== undefined) {
            history.push({
                pathname: '/home',
                state: { name: text }
            })
        }
        Cookies.set("namea", text!)
        Cookies.set("mode", mode?.toString()!)
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
                        <IonButton color={mode == 0 ? "primary" : "medium"} className="round top bbb" onClick={() => setMode(0)}>10s</IonButton>
                        <IonButton color={mode == 1 ? "primary" : "medium"} className="round top bbb" onClick={() => setMode(1)}>60s</IonButton>
                        <IonButton color={mode == 2 ? "primary" : "medium"} className="round top bbb" onClick={() => setMode(2)}>endless</IonButton>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton class="custom top" onClick={() => text ? NextPage() : setShowToast1(true)}>PLAY</IonButton>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <Board />
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