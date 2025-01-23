import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

enum Routes {
  products = 'Products',
}

type RootStackParamList = {
  Products: undefined;
};

type ProductsProps = NativeStackScreenProps<RootStackParamList, Routes.products>;

function RouteProducts({ navigation }: ProductsProps) {
  return <View></View>;
}

const Index = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.products} component={RouteProducts}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
