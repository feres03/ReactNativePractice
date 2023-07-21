import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import FavouritesScreen from './Screens/FavouriteScreen';
import HeartIcon from './components/HeartIcon';
import AddMovieScreen from './Screens/AddMovieScreen';
import PlusIcon from './components/PlusIcon';
import EditMovieScreen from './Screens/UpdateMovieScreen';
import FavouritesContextProvider from './store/context/FavouritesContext';
import { MovieProvider } from './store/context/MovieContext';

export default function App() {
  Stack = createNativeStackNavigator();
  const HomeScreenOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: '#C89F9c' },
    headerTintColor: 'black',
    contentStyle: { backgroundColor: '#3f2f25' },
    headerRight: () => <HeartIcon />,
    headerLeft: () => <PlusIcon />
  };
  return (
    <>
      <StatusBar style='dark' />
      <MovieProvider>
        <FavouritesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: '#C89F9c' },
                headerTintColor: 'black',
                contentStyle: { backgroundColor: '#3f2f25' },
              }}
            >
              <Stack.Screen name='Home' component={HomeScreen} options={HomeScreenOptions} />
              <Stack.Screen name='Details' component={DetailsScreen} />
              <Stack.Screen name='Favourites' component={FavouritesScreen} />
              <Stack.Screen name='AddMovie' component={AddMovieScreen} />
              <Stack.Screen name='Edit' component={EditMovieScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </FavouritesContextProvider>
      </MovieProvider>
    </>
  )
}
