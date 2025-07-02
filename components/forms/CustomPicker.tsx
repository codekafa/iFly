import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { FlatList, Modal, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PickerItem {
  label: string;
  value: any;
}

interface CustomPickerProps {
  items: PickerItem[];
  onValueChange: (value: any) => void;
  value: any | null;
  placeholder: { label: string; value: any | null };
  disabled?: boolean;
}

export const CustomPicker = ({ items, onValueChange, value, placeholder, disabled = false }: CustomPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem?.label || placeholder.label;
  const displayColor = selectedItem ? '#0A2A43' : (disabled ? '#cccccc' : '#9E9E9E');

  const handleSelect = (itemValue: any) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.pickerText, { color: displayColor }]}>{displayText}</Text>
        {!disabled && <Ionicons name="chevron-down" size={24} color="#1C7A8C" />}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.option} onPress={() => handleSelect(item.value)}>
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  pickerText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    maxHeight: '50%',
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0A2A43',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 