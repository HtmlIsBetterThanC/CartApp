import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

enum Routes {
  products = 'Products',
  product = 'Product',
  favourite = 'Favourite',
}

type RootStackParamList = {
  Products: undefined;
  Product: { id: number };
  Favourite: undefined;
};

type ProductsProps = NativeStackScreenProps<RootStackParamList, Routes.products>;
type ProductProps = NativeStackScreenProps<RootStackParamList, Routes.product>;
type FavouriteProps = NativeStackScreenProps<RootStackParamList, Routes.favourite>;

function RouteProducts({ navigation }: ProductsProps) {
  return <View></View>;
}

function RouteProduct({ route }: ProductProps) {
  return <View></View>;
}

function RouteFavourite({ navigation }: FavouriteProps) {
  return <View></View>;
}

const Index = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.products} component={RouteProducts} />
        <Stack.Screen name={Routes.product} component={RouteProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
