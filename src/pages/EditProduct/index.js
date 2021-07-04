import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Images from '../../assets';
import {Header} from '../../component';
import {useSelector} from 'react-redux';
import axios from 'axios';
import QueryString from 'qs';

const EditProduct = ({navigation, route}) => {
  const stateGlobal = useSelector(state => state);
  const [productName, setProductName] = useState(route?.params?.title);
  const [description, setDescription] = useState(route?.params?.desc);
  const [price, setPrice] = useState(route?.params?.price);
  const [img, setImg] = useState(route?.params?.image);
  const [image, setImage] = useState();

  const upload = () => {
    // Open Image Library:
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      response => {
        if (response.didCancel || response.error) {
          Alert.alert('oops, batal memilih foto.');
        } else {
          if (response?.assets[0]?.fileSize < 1000000) {
            setImage(response);
          } else {
            Alert.alert('Ukuran gambar tidak boleh lebih dari 500kb');
          }
        }
      },
    );
  };

  const update = async () => {
    if (
      (productName === '' || productName === route?.params?.title) &&
      (description === '' || description === route?.params?.desc) &&
      (price === '' || price === route?.params?.price) &&
      image === undefined
    ) {
      Alert.alert('Peringatan', 'Data isian tidak boleh kosong');
      return false;
    }

    const url = `http://api-test.q.camp404.com/public/api/material/${route?.params?.id}`;

    const data = QueryString.stringify({
      nama_barang: productName,
      deskripsi: description,
      harga: price,
      gambar: image ? `data:image/jpg;base64,${image?.assets[0]?.base64}` : img,
    });

    await axios({
      method: 'PATCH',
      url: url,
      headers: {
        Authorization: `Bearer ${stateGlobal.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then(response => {
        Alert.alert('Berhasil Diubah');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Gagal Diubah');
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Edit Product'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.textInput}
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          numberOfLines={3}
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical={'top'}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textInput}
          value={price.toString()}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.uploadImage} onPress={() => upload()}>
          {img || image ? (
            <Image
              source={{uri: image?.assets[0]?.uri || img}}
              resizeMode={'cover'}
              style={styles.previewImage}
            />
          ) : (
            <Image source={Images.ICPlus} style={styles.plushIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUpdate} onPress={() => update()}>
          <Text style={styles.btnUpdateText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  uploadImage: {
    width: 100,
    height: 100,
    backgroundColor: '#C4C4C4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plushIcon: {
    width: 40,
    height: 40,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  btnUpdate: {
    height: 45,
    width: '100%',
    backgroundColor: '#1F8597',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
  },
  btnUpdateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
