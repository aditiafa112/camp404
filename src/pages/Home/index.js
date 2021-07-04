import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
import {Header, ProductCard} from '../../component';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Home = () => {
  const stateGlobal = useSelector(state => state);
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();

    return onRefresh();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData();
    axios
      .get('http://api-test.q.camp404.com/public/api/material', {
        headers: {Authorization: `Bearer ${stateGlobal.access_token}`},
      })
      .then(response => {
        let res = response.data;
        setData(res.materials);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false);
        Alert.alert('Gagal mendapatkan data');
      });
  }, []);

  const deleteProduct = async id => {
    try {
      const DeleteProduct = await axios({
        method: 'delete',
        url: `http://api-test.q.camp404.com/public/api/material/${id}`,
        headers: {
          Authorization: `Bearer ${stateGlobal.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (DeleteProduct.status === 200) {
        onRefresh();
      }
    } catch (error) {
      Alert.alert('Gagal menghapus data');
    }
  };

  const renderItem = ({item}) => (
    <ProductCard
      id={item.id}
      title={item.nama_barang}
      desc={item.deskripsi}
      price={item.harga}
      image={item.gambar}
      deletePress={() => deleteProduct(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Home'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text style={styles.label}>List Product</Text>}
        ListFooterComponent={<View style={styles.footer} />}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
