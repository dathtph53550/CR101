import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View ,StyleSheet, Alert, Modal, TextInput} from "react-native";
import {api} from '../api';
import { useNavigation } from "@react-navigation/native";
import removeAccents from 'remove-accents';
import { RadioButton } from 'react-native-paper';


export default function Index() {
  type Student = {
    thithu4_id: number;
    thithu4_nameCar: string;
    thithu4_image: string;
    thithu4_price: number;
    thithu4_status: boolean;
  }
  const navigation = useNavigation();
  const [data, setData] = useState<Student[]>([]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newCarNameCar, setNewNameCar] = useState("");
  const [newCarImage, setNewCarImage] = useState("");
  const [newCarPrice, setNewCarPrice] = useState(0);
  const [newCarStatus, setNewCarStatus] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [StudentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedAnimal] = useState<Student | null>(null);

  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");





  useEffect(() => {
    api.get('/thithu4')
      .then((response) => {
        setData(response); 
        console.log(data)

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddAnimal = () => {
    console.log(newCarStatus);
    const diemTB = parseFloat(newCarPrice.toString());
  
    if ( !newCarNameCar || !newCarImage || isNaN(diemTB) || diemTB < 0) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin và điểm trung bình phải là số >= 0");
      return;
    }
  
    // const isDuplicate = data.some(student => student.ph53550_ma === newPeopleMa);
    // if (isDuplicate) {
    //   Alert.alert("Lỗi", "Mã sinh viên đã tồn tại!");
    //   return;
    // }
  
    const newStudent: Student = {
      thithu4_id: data.length + 1,
      thithu4_nameCar: newCarNameCar,
      thithu4_image: newCarImage,
      thithu4_price: diemTB,
      thithu4_status: newCa
      rStatus
    };

    // Validate"YYYY-MM-DD"
    const validateDate = (dateString: string): boolean => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      
      if (!regex.test(dateString)) {
        return false;
      }
    
      const [year, month, day] = dateString.split("-").map(Number);
      
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
    };
    
  
    api.post('/thithu4', newStudent)
      .then((response) => {
        setData([...data, response]); 
        setAddModalVisible(false);
        setNewNameCar("");
        setNewCarImage("");
        setNewCarPrice(0);
        setNewCarStatus(false);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };
  

  const openEditModal = (student: Student) => {
    setSelectedAnimal(student);
    setNewNameCar(student.thithu4_nameCar);
    setNewCarImage(student.thithu4_image);
    setNewCarPrice(student.thithu4_price);
    setNewCarStatus(student.thithu4_status);
    console.log(student.thithu4_status);
    setModalVisible(true);
  };

  const openDeleteModal = (student: Student) => {
    setStudentToDelete(student);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (StudentToDelete) {
      api.delete(`/thithu4/${StudentToDelete.thithu4_id}`)
        .then(() => {
          setData(data.filter(item => item.thithu4_id !== StudentToDelete.thithu4_id));
          setDeleteModalVisible(false);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const handleSave = () => {
    const diemTB = parseFloat(newCarPrice.toString());
    if (selectedStudent) {
      if ( !newCarNameCar || !newCarImage || isNaN(diemTB) || diemTB < 0) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin và điểm trung bình phải là số >= 0");
        return;
      }
  
      // const isDuplicate = data.some(student => student.thithu3_ma === newPeopleMa && student.ph53550_id !== selectedStudent.ph53550_id);
      // if (isDuplicate) {
      //   Alert.alert("Lỗi", "Mã sinh viên đã tồn tại!");
      //   return;
      // }
  
      const updatedStudent = { 
        ...selectedStudent, 
        thithu4_nameCar: newCarNameCar,
        thithu4_image: newCarImage,
        thithu4_price: newCarPrice,
        thithu4_status: newCarStatus
      };
  
      api.put(`/thithu4/${selectedStudent.thithu4_id}`, updatedStudent)
        .then(() => {
          const updatedData = data.map(item =>
            item.thithu4_id === selectedStudent.thithu4_id ? updatedStudent : item
          );
          setData(updatedData);
          setModalVisible(false);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };
  

  useEffect(() => {
    const filtered = data.filter(student => {
      const normalizedQuery = removeAccents(searchQuery.toLowerCase());
      return removeAccents(student.thithu4_nameCar.toLowerCase()).includes(normalizedQuery);
    });
    setFilteredData(filtered);
  }, [searchQuery,data]);
  
  const handleSortByScore = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      // return sortOrder === "asc"
      //   ? a.thithu4_price - b.thithu4_price
      // b.thithu4_price - a.thithu4_price;
      return a.thithu4_price - b.thithu4_price;
    });
  
    setFilteredData(sortedData);
    // setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
          keyExtractor={(item) => item.thithu4_id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { student: item})}>
              <Image source={{ uri: item.thithu4_image }} style={styles.image} />
              <View style={{flexDirection: "column", width: 200}}>
                <Text style={styles.text}>Tên: {item.thithu4_nameCar}</Text>
                <Text style={styles.text}>Price: {item.thithu4_price}</Text>
                <Text style={styles.text}>Giới tính :  {item.thithu4_status ? "Nam" : "Nữ"}</Text>
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
                <TextInput style={styles.input} onChangeText={setNewNameCar} placeholder="Nhập tên" />
                <TextInput style={styles.input} onChangeText={setNewCarImage} placeholder="Nhập link ảnh" />
                <TextInput style={styles.input} onChangeText={setNewCarPrice} placeholder="Nhập điểm TB"/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="true"
                    status={newCarStatus ? "checked" : "unchecked"}
                    onPress={() => setNewCarStatus(true)}
                  />
                  <Text>Nam</Text>

                  <RadioButton
                    value="false"
                    status={!newCarStatus ? "checked" : "unchecked"}
                    onPress={() => setNewCarStatus(false)}
                  />
                  <Text>Nữ</Text>
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
                <Text>Bạn có chắc chắn muốn xoá {StudentToDelete?.thithu4_nameCar} không?</Text>
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
                <TextInput style={styles.input} value={newCarNameCar} onChangeText={setNewNameCar} placeholder="Nhập tên" />
                <TextInput style={styles.input} value={newCarImage} onChangeText={setNewCarImage} placeholder="Nhập link ảnh" />
                <TextInput style={styles.input} value={String(newCarPrice)} onChangeText={setNewCarPrice} placeholder="Nhập điểm TB"/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="true"
                    status={newCarStatus ? "checked" : "unchecked"}
                    onPress={() => setNewCarStatus(true)}
                  />
                  <Text>Nam</Text>

                  <RadioButton
                    value="false"
                    status={!newCarStatus ? "checked" : "unchecked"}
                    onPress={() => setNewCarStatus(false)}
                  />
                  <Text>Nữ</Text>
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
    shadowOpacity: 0.3,
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