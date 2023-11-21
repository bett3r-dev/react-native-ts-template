import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import { ProvideError } from './src/hooks/useError';

export default function App() {
  return (
    <NavigationContainer>
      <ProvideError>
        <Routes/>
      </ProvideError>
    </NavigationContainer>
  );
}

