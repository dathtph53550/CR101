import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View ,StyleSheet, Alert, Modal, TextInput} from "react-native";
import {api} from '../api';
import { useNavigation } from "@react-navigation/native";
import removeAccents from 'remove-accents';
import { RadioButton } from 'react-native-paper';


export default function Index() {
  type Student = {
    thithu2_id: number;
    thithu2_ma: string;
    thithu2_name: string;
    thithu2_image: string;
    thithu2_diemTB: number;
    thithu2_gender: string;
  }
  const navigation = useNavigation();
  const [data, setData] = useState<Student[]>([]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newPeopleMa, setNewPeopleMa] = useState("");
  const [newPeopleName, setNewPeopleName] = useState("");
  const [newPeopleImage, setNewPeopleImages] = useState("");
  const [newPeopleDiemTB, setNewPeopleDiemTB] = useState(0);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [StudentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedAnimal] = useState<Student | null>(null);

  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const [newPeopleGender, setNewPeopleGender] = useState("Nam");

  



  useEffect(() => {
    api.get('/thithu1')
      .then((response) => {
        setData(response); 
        console.log(data)

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddAnimal = () => {
    const diemTB = parseFloat(newPeopleDiemTB.toString());
  
    if (!newPeopleMa || !newPeopleName || !newPeopleImage || isNaN(diemTB) || diemTB < 0) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin và điểm trung bình phải là số >= 0");
      return;
    }
  
    const isDuplicate = data.some(student => student.thithu2_ma === newPeopleMa);
    if (isDuplicate) {
      Alert.alert("Lỗi", "Mã sinh viên đã tồn tại!");
      return;
    }
  
    const newStudent: Student = {
      thithu2_id: data.length + 1,
      thithu2_ma: newPeopleMa,
      thithu2_name: newPeopleName,
      thithu2_image: newPeopleImage,
      thithu2_diemTB: diemTB,
      thithu2_gender: newPeopleGender
    };
  
    api.post('/thithu1', newStudent)
      .then((response) => {
        setData([...data, response]); 
        setAddModalVisible(false);
        setNewPeopleMa("");
        setNewPeopleName("");
        setNewPeopleImages("");
        setNewPeopleDiemTB(0);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };
  

  const openEditModal = (student: Student) => {
    setSelectedAnimal(student);
    setNewPeopleMa(student.thithu2_ma);
    setNewPeopleName(student.thithu2_name);
    setNewPeopleImages(student.thithu2_image);
    setNewPeopleDiemTB(student.thithu2_diemTB);
    setNewPeopleGender(student.thithu2_gender);
    setModalVisible(true);
  };

  const openDeleteModal = (student: Student) => {
    setStudentToDelete(student);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (StudentToDelete) {
      api.delete(`/thithu1/${StudentToDelete.thithu2_id}`)
        .then(() => {
          setData(data.filter(item => item.thithu2_id !== StudentToDelete.thithu2_id));
          setDeleteModalVisible(false);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const handleSave = () => {
    const diemTB = parseFloat(newPeopleDiemTB.toString());
  
    if (selectedStudent) {
      if (!newPeopleMa || !newPeopleName || !newPeopleImage || isNaN(diemTB) || diemTB < 0) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin và điểm trung bình phải là số >= 0");
        return;
      }
  
      const isDuplicate = data.some(student => student.thithu2_ma === newPeopleMa && student.thithu2_id !== selectedStudent.thithu2_id);
      if (isDuplicate) {
        Alert.alert("Lỗi", "Mã sinh viên đã tồn tại!");
        return;
      }
  
      const updatedStudent = { 
        ...selectedStudent, 
        thithu2_ma: newPeopleMa,
        thithu2_name: newPeopleName,
        thithu2_image: newPeopleImage,
        thithu2_diemTB: newPeopleDiemTB,
        thithu2_gender: newPeopleGender
      };
  
      api.put(`/thithu1/${selectedStudent.thithu2_id}`, updatedStudent)
        .then(() => {
          const updatedData = data.map(item =>
            item.thithu2_id === selectedStudent.thithu2_id ? updatedStudent : item
          );
          setData(updatedData);
          setModalVisible(false);
          setNewPeopleMa("");
          setNewPeopleName("");
          setNewPeopleImages("");
          setNewPeopleDiemTB(0);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };
  

  useEffect(() => {
    const filtered = data.filter(student => {
      const normalizedQuery = removeAccents(searchQuery.toLowerCase());
      return removeAccents(student.thithu2_ma.toLowerCase()).includes(normalizedQuery) || 
             removeAccents(student.thithu2_name.toLowerCase()).includes(normalizedQuery);
    });
    setFilteredData(filtered);
  }, [searchQuery, data]);
  
  const handleSortByScore = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortOrder === "asc"
        ? a.thithu2_diemTB - b.thithu2_diemTB
        : b.thithu2_diemTB - a.thithu2_diemTB;
    });
  
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };




  return (
    <SafeAreaView style={{flex: 1}}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Tìm kiếm theo mã hoặc tên" 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
          />

          <TouchableOpacity style={styles.sortButton} onPress={handleSortByScore}>
            <Text style={styles.sortButtonText}>
              Sắp xếp điểm: {sortOrder === "asc" ? "↓" : "↑"}
            </Text>
          </TouchableOpacity>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.thithu2_id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail',{student: item})}>
              <Image source={{ uri: item.thithu2_image }} style={styles.image} />
              <View style={{flexDirection: "column", width: 200}}>
                <Text style={styles.text}>Mã SV:  {item.thithu2_ma}</Text>
                <Text style={styles.text}>Tên: {item.thithu2_name}</Text>
                <Text style={styles.text}>Điểm: {item.thithu2_diemTB}</Text>
              </View>
              <View style={{flexDirection: 'column',padding: 10}}>
              <TouchableOpacity style={styles.btnEdit} onPress={() => openEditModal(item)}>
                <Text style={styles.buttonText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDelete} onPress={() => openDeleteModal(item)}>
                <Text style={styles.buttonText}>Xoá</Text>
              </TouchableOpacity>
              </View>
          </TouchableOpacity>
          )}
        />

          <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

         


          {/* Add */}
          <Modal visible={addModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Thêm Student</Text>
                <TextInput style={styles.input} value={newPeopleMa} onChangeText={setNewPeopleMa} placeholder="Nhập mã" />
                <TextInput style={styles.input} value={newPeopleName} onChangeText={setNewPeopleName} placeholder="Nhập tên" />
                <TextInput style={styles.input} value={newPeopleImage} onChangeText={setNewPeopleImages} placeholder="Nhập link ảnh" />
                <TextInput style={styles.input} value={String(newPeopleDiemTB)} onChangeText={setNewPeopleDiemTB} placeholder="Nhập điểm TB"/>
                <View>
                  <Text style={{marginLeft: -85}}>Giới Tính: </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                      value="Nam"
                      status={newPeopleGender === "Nam" ? "checked" : "unchecked"}
                      onPress={() => setNewPeopleGender("Nam")}
                    />
                    <Text>Nam</Text>

                    <RadioButton
                      value="Nữ"
                      status={newPeopleGender === "Nữ" ? "checked" : "unchecked"}
                      onPress={() => setNewPeopleGender("Nữ")}
                    />
                    <Text>Nữ</Text>
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.btnAdd} onPress={handleAddAnimal}>
                    <Text style={styles.buttonText}>Thêm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setAddModalVisible(false)}>
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Delete */}
          <Modal visible={deleteModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Xác nhận xoá</Text>
                <Text>Bạn có chắc chắn muốn xoá {StudentToDelete?.thithu2_name} không?</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={[styles.btnDelete,{backgroundColor:'#007bff',width: 60}]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Xoá</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btnCancel,{width: 60}]} onPress={() => setDeleteModalVisible(false)}>
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Update */}
          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
                <TextInput style={styles.input} value={newPeopleMa} onChangeText={setNewPeopleMa} placeholder="Nhập mã" />
                <TextInput style={styles.input} value={newPeopleName} onChangeText={setNewPeopleName} placeholder="Nhập tên" />
                <TextInput style={styles.input} value={newPeopleImage} onChangeText={setNewPeopleImages} placeholder="Nhập link ảnh" />
                <TextInput style={styles.input} value={String(newPeopleDiemTB)} onChangeText={setNewPeopleDiemTB} placeholder="Nhập điểm TB"/>
                <View>
                  <Text style={{marginLeft: -85}}>Giới Tính: </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                      value="Nam"
                      status={newPeopleGender === "Nam" ? "checked" : "unchecked"}
                      onPress={() => setNewPeopleGender("Nam")}
                    />
                    <Text>Nam</Text>

                    <RadioButton
                      value="Nữ"
                      status={newPeopleGender === "Nữ" ? "checked" : "unchecked"}
                      onPress={() => setNewPeopleGender("Nữ")}
                    />
                    <Text>Nữ</Text>
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                    <Text style={styles.buttonText}>Lưu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
    </SafeAreaView>
  );

  
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 5, 
    borderRadius: 8,
    padding: 5, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 8,
  },
  text: {
    marginLeft: 10,
    fontSize: 18, 
    fontWeight: "500",
  },
  btnEdit: { 
    width: 50,
    backgroundColor: '#007bff', 
    padding: 8, 
    borderRadius: 5, 
    marginRight: 5 ,
    alignItems: "center",
  },
  btnDelete: { 
    width: 50,
    backgroundColor: '#dc3545', 
    padding: 8, 
    borderRadius: 5 ,
    marginTop: 5,
    alignItems: "center"
  }, 
  buttonText: { 
    color: '#fff' 
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  btnCancel: {
    width: 50,
    backgroundColor: '#dc3545', 
    padding: 8, 
    borderRadius: 5 ,
    marginTop: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  btnAdd : {
    width: 60,
    backgroundColor: '#28a745',
    padding: 8, 
    borderRadius: 5 ,
    marginTop: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  btnSave: {
    width: 50,
    backgroundColor: '#28a745', 
    padding: 8, 
    borderRadius: 5 ,
    marginTop: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  sortButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
  },
  sortButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});