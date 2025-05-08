import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import WriteReview from './screens/WriteReview';
import UserLogin from './screens/UserLogin';
import UserDashboard from './screens/UserDashboard';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import VisitorLogin from './screens/VisitorLogin';
import VisitorDashboard from './screens/VisitorDashboard';
import ParkRouteScreen from './screens/ParkRouteScreen';
import ParkHistoryScreen from './screens/ParkHistoryScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="WriteReview" component={WriteReview} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="VisitorLogin" component={VisitorLogin} />
        <Stack.Screen name="VisitorDashboard" component={VisitorDashboard} />
        <Stack.Screen name="ParkRoutes" component={ParkRouteScreen} />
        <Stack.Screen name="ParkHistory" component={ParkHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
