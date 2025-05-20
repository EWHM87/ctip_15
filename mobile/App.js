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
import MustSeeSpotScreen from './screens/MustSeeSpotScreen';
import Wildlife from './screens/Wildlife';
import Accommodations from './screens/Accommodations';
import Activities from './screens/Activities'; 
import VisitorRegister from './screens/VisitorRegister';
import UserRegister from './screens/UserRegister';
import Tranning from './screens/Tranning';
import Certification from './screens/Certification';
import Notifications from './screens/Notifications';
import AIBiodiversityScanner from './screens/AIBiodiversityScanner';
import UserProfile from './screens/UserProfile';
import CreateTraining from './screens/CreateTraining';
import SendReminders from './screens/SendReminders';
import GuidePerformance from './screens/GuidePerformance';
import AdminProfile from './screens/AdminProfile';
import AdminRegister from './screens/AdminRegister';
import VisitorFeedbackReview from './screens/VisitorFeedbackReview';
import RegisterGuide from './screens/RegisterGuide';
import ManageGuide from './screens/ManageGuide';
import IoTMonitor from './screens/IoTMonitor';
import AlertSystem from './screens/AlertSystem';

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
        <Stack.Screen name="MustSeeSpot" component={MustSeeSpotScreen} />
        <Stack.Screen name="Wildlife" component={Wildlife} />
        <Stack.Screen name="Accommodations" component={Accommodations} />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="VisitorRegister" component={VisitorRegister} />
        <Stack.Screen name="UserRegister" component={UserRegister} />
        <Stack.Screen name="Tranning" component={Tranning} />
        <Stack.Screen name="Certification" component={Certification} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="AIBiodiversityScanner" component={AIBiodiversityScanner} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="CreateTraining" component={CreateTraining} />
        <Stack.Screen name="SendReminders" component={SendReminders} />
        <Stack.Screen name="GuidePerformance" component={GuidePerformance}  />
        <Stack.Screen name="AdminProfile" component={AdminProfile} />
        <Stack.Screen name="AdminRegister" component={AdminRegister} />
        <Stack.Screen name="VisitorFeedbackReview" component={VisitorFeedbackReview} />
        <Stack.Screen name="RegisterGuide" component={RegisterGuide} />
        <Stack.Screen name="ManageGuide" component={ManageGuide} />
        <Stack.Screen name="IoTMonitor" component={IoTMonitor} />
        <Stack.Screen name="AlertSystem" component={AlertSystem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
