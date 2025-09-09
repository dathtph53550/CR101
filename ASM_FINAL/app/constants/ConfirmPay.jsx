import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmPay = ({ isVisible, onCancel, onConfirm, amount }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Bạn có muốn thành toán không ?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.yesButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#0C0F14',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  noButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  noButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#D17842',
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  yesButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmPay;