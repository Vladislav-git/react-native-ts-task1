import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from './src/navigation/MainNavigation'
import {Provider} from './src/context/Context'

const App: React.FC = () => {

  return (
    <Provider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>

  );
}

export default App;

