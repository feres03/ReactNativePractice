import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import FavouritesScreen from './Screens/FavouriteScreen';
import HeartIcon from './components/HeartIcon';
import AddMovieScreen from './Screens/AddMovieScreen';
import PlusIcon from './components/PlusIcon';

export default function App() {
  Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style='dark' />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#C89F9c' },
            headerTintColor: 'black',
            contentStyle: { backgroundColor: '#3f2f25' },
            headerRight: () => <HeartIcon />,
            headerLeft: () => <PlusIcon />
          }} >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Details'>
              {(props) => <DetailsScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name='Favourites' component={FavouritesScreen} />
            <Stack.Screen name='AddMovie' component={AddMovieScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
