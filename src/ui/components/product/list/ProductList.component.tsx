import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import UiProduct from '@/src/model/ui/UiProduct';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { ProgressBar, Text } from 'react-native-paper';
import { styles } from '@/src/ui/components/product/list/ProductList.styles';
import i18n from '@/src/localization/i18n';
import ProductCardComponent from '@/src/ui/components/product/card/ProductCard.component';

interface ProductListProps {
  theme: MD3Theme;
  isLoading: boolean;
  data: UiProduct[];
  containerStyle?: StyleProp<ViewStyle>;
  onProductPress: (id: number) => void;
  onFavouritePress: (product: UiProduct) => void;
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />;
};

const ListEmptyComponent = () => {
  return <Text style={styles.emptyList}>{i18n.t('product.list.empty')}</Text>;
};

const ListFooterComponent = () => {
  return <View style={styles.footer} />;
};

const ProductList = (props: ProductListProps) => {
  const renderItem = ({ item }: { item: UiProduct }) => {
    return (
      <ProductCardComponent
        theme={props.theme}
        product={item}
        onProductPress={() => props.onProductPress(item.id)}
        onFavouritePress={() => props.onFavouritePress(item)}
      />
    );
  };

  return props.isLoading ? (
    <ProgressBar theme={props.theme} indeterminate={true} />
  ) : (
    <FlatList
      style={[styles.container, props.containerStyle]}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default ProductList;
