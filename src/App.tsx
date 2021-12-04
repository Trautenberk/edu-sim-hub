import {FunctionComponent} from 'react';
import { Helmet } from 'react-helmet';
import {Editor} from './Components/Editor/Editor';

export const App : FunctionComponent = () => {

  return(
    <>
      <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' /> 
    </Helmet>
      <Editor />
    </>  
  )
}