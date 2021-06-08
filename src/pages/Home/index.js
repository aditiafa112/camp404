import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Header, ProductCard} from '../../component';

const dummy = [
  {
    id: 1,
    title: 'Product Name',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '50000',
    image: 'https://source.unsplash.com/1600x900/?shoes',
  },
  {
    id: 2,
    title: 'Product Name',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '50000',
    image: 'https://source.unsplash.com/1600x900/?shoes',
  },
  {
    id: 3,
    title: 'Product Name',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '50000',
    image: 'https://source.unsplash.com/1600x900/?shoes',
  },
  {
    id: 4,
    title: 'Product Name',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '50000',
    image: 'https://source.unsplash.com/1600x900/?shoes',
  },
  {
    id: 5,
    title: 'Product Name',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '50000',
    image: 'https://source.unsplash.com/1600x900/?shoes',
  },
];

const Home = () => {
  const renderItem = ({item}) => (
    <ProductCard
      title={item.title}
      desc={item.desc}
      price={item.price}
      image={item.image}
    />
  );

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Home'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummy}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text style={styles.label}>List Product</Text>}
        ListFooterComponent={<View style={styles.footer} />}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: 16,
  },
  footer: {
    height: 30,
  },
});
