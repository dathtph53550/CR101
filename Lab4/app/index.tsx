import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Modal, Button,Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  type ContactType = {
    name: string;
    email: string;
    position: string;
    photo: string;
  };

  const [data, setData] = useState<ContactType[]>([
    { name: 'Hwang Min-hyun', email: 'email1@example.com', position: 'Manager', photo: 'data:image/jpeg;base64,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' },
    { name: 'Choi Wo-sik', email: 'email2@example.com', position: 'Developer', photo: 'data:image/webp;base64,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' },
    { name: 'Park Hang Seo', email: 'email3@example.com', position: 'Designer', photo: 'data:image/jpeg;base64,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' },
    { name: 'Son Heung Min', email: 'email4@example.com', position: 'Designer', photo: 'data:image/webp;base64,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' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);

  const btnXoa = (email: string) => {
    setData(data.filter(contact => contact.email !== email));
  };

  const btnSua = (dulieu: ContactType) => {
    setSelectedContact(dulieu);
    setModalVisible(true);
  };

  const txtLuu = () => {
    if(selectedContact?.name === '' || selectedContact?.position === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    else{
      setData(suaData => suaData.map(contact => 
        contact.email === selectedContact?.email ? selectedContact : contact
      ));
      setModalVisible(false);
    }
  };

  const ContactItem = ({ contact }: { contact: ContactType }) => {
    return (
      <View style={styles.listItem}>
        <Image source={{ uri: contact.photo }} style={styles.avatar} />
        <View style={styles.bodyItem}>
          <Text style={styles.nameText}>{contact.name}</Text>
          <Text>{contact.position}</Text>
        </View>
        <TouchableOpacity style={styles.btnEdit} onPress={() => btnSua(contact)}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => btnXoa(contact.email)}>
          <Text style={styles.buttonText}>Xoá</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <ContactItem contact={item} />}
        keyExtractor={(item) => item.email}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={{fontSize:25,fontWeight: 'bold'}}>Sửa thông tin</Text>
          <TextInput 
            style={styles.input} 
            value={selectedContact?.name} 
            onChangeText={(text) => setSelectedContact(textNew => textNew ? { 
              name: text,
              email: textNew.email,
              position: textNew.position,
              photo: textNew.photo
            } : null)} 
          />
          <TextInput 
            style={styles.input} 
            value={selectedContact?.position} 
            onChangeText={(text) => setSelectedContact(textNew => textNew ? { 
              name: textNew.name,
              email: textNew.email,
              position: text,
              photo: textNew.photo
            } : null)} 
          />
          <Button title="Lưu" onPress={txtLuu} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'white', 
    padding: 10 
  },
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    margin: 6, 
    borderRadius: 12, 
    backgroundColor: '#fff' 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 12 
  },
  bodyItem: { 
    flex: 1 
  },
  nameText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  btnEdit: { 
    backgroundColor: '#007bff', 
    padding: 8, 
    borderRadius: 5, 
    marginRight: 5 
  },
  btnDelete: { 
    backgroundColor: '#dc3545', 
    padding: 8, 
    borderRadius: 5 
  }, 
  buttonText: { 
    color: '#fff' 
  },
  modalContainer: { 
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '30%',
    borderRadius: 20,
    marginTop: '50%',
    margin: 0,
    // opacity: 0.9
  },
  input: {
     width: '80%', 
     marginBottom: 10, 
     marginTop: 10,
     padding: 8 ,
     borderColor: 'black', 
     borderWidth: 1, 
     borderRadius: 5
  }
});

export default Index;
