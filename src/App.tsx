import {FunctionComponent} from 'react';
import {Editor} from './Components/Editor/Editor';
import { CanvasContextProvider } from './Store/Editor/Canvas/CanvasContext';

export const App : FunctionComponent = () => {

  return(
    // <CanvasContextProvider>
      <Editor />
     // </CanvasContextProvider>
  )
}