import {Component} from 'react';
import styles from "./App.module.css"
import {Editor} from './Components/Editor/Editor';
import { CanvasContextProvider } from './Store/Editor/Canvas/CanvasContext';

export default class App extends Component {
  constructor(props : any){
    super(props);
  }

  render() {
    return (
      <CanvasContextProvider>
      <Editor />
      </CanvasContextProvider>
    )
  }
}