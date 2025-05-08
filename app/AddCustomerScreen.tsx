// src/screens/Customers/AddCustomerScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { initializeDatabase } from '../database';
import { CustomerRepository } from '../database/repositories/CustomerRepository';
import { Customer } from '../database/models/Customer';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const AddCustomerScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nameEN, setNameEN] = useState('');
  const [nameAR, setNameAR] = useState('');
  const [buildingEN, setBuildingEN] = useState('');
  const [buildingAR, setBuildingAR] = useState('');
  const [secondaryEN, setSecondaryEN] = useState('');
  const [secondaryAR, setSecondaryAR] = useState('');
  const [streetEN, setStreetEN] = useState('');
  const [streetAR, setStreetAR] = useState('');
  const [districtEN, setDistrictEN] = useState('');
  const [districtAR, setDistrictAR] = useState('');
  const [cityEN, setCityEN] = useState('');
  const [cityAR, setCityAR] = useState('');
  const [postalEN, setPostalEN] = useState('');
  const [postalAR, setPostalAR] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [routeDays, setRouteDays] = useState('Monday');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Required fields validation
  const isValid =
    nameEN.trim() &&
    buildingEN.trim() &&
    streetEN.trim() &&
    districtEN.trim() &&
    cityEN.trim() &&
    postalEN.trim();

  useEffect(() => {
    initializeDatabase()
      .catch(err => {
        console.error('DB init failed', err);
        Alert.alert('Error', 'Failed to initialize database.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }
    setSubmitting(true);

    const newCustomer: Customer = {
      id: `${Date.now()}`,
      name_en: nameEN,
      name_ar: nameAR || null,
      vat_number: vatNumber || null,
      cr_number: crNumber || null,
      contact_person: contactPerson || null,
      phone_number: phoneNumber || null,
      email: email || null,
      route_days: routeDays,
      building_en: buildingEN,
      building_ar: buildingAR || null,
      secondary_en: secondaryEN || null,
      secondary_ar: secondaryAR || null,
      street_en: streetEN,
      street_ar: streetAR || null,
      district_en: districtEN,
      district_ar: districtAR || null,
      city_en: cityEN,
      city_ar: cityAR || null,
      postal_en: postalEN,
      postal_ar: postalAR || null,
    };

    try {
      const repo = new CustomerRepository();
      await repo.create(newCustomer);
      Alert.alert('Success', 'Customer added successfully.');
      navigation.goBack();
    } catch (err) {
      console.error('DB Insert Error:', err);
      Alert.alert('Error', 'Failed to add customer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#263159" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add Customer</Text>

        {/* Bilingual Fields */}
        <TextInput
          placeholder="Name (EN)*"
          style={styles.input}
          value={nameEN}
          onChangeText={setNameEN}
        />
        <TextInput
          placeholder="Name (AR)"
          style={styles.input}
          value={nameAR}
          onChangeText={setNameAR}
        />

        <TextInput
          placeholder="Building Number (EN)*"
          style={styles.input}
          value={buildingEN}
          onChangeText={setBuildingEN}
        />
        <TextInput
          placeholder="Building Number (AR)"
          style={styles.input}
          value={buildingAR}
          onChangeText={setBuildingAR}
        />

        <TextInput
          placeholder="Secondary Number (EN)"
          style={styles.input}
          value={secondaryEN}
          onChangeText={setSecondaryEN}
        />
        <TextInput
          placeholder="Secondary Number (AR)"
          style={styles.input}
          value={secondaryAR}
          onChangeText={setSecondaryAR}
        />

        <TextInput
          placeholder="Street Name (EN)*"
          style={styles.input}
          value={streetEN}
          onChangeText={setStreetEN}
        />
        <TextInput
          placeholder="Street Name (AR)"
          style={styles.input}
          value={streetAR}
          onChangeText={setStreetAR}
        />

        <TextInput
          placeholder="District (EN)*"
          style={styles.input}
          value={districtEN}
          onChangeText={setDistrictEN}
        />
        <TextInput
          placeholder="District (AR)"
          style={styles.input}
          value={districtAR}
          onChangeText={setDistrictAR}
        />

        <TextInput
          placeholder="City (EN)*"
          style={styles.input}
          value={cityEN}
          onChangeText={setCityEN}
        />
        <TextInput
          placeholder="City (AR)"
          style={styles.input}
          value={cityAR}
          onChangeText={setCityAR}
        />

        <TextInput
          placeholder="Postal Code (EN)*"
          style={styles.input}
          keyboardType="numeric"
          value={postalEN}
          onChangeText={setPostalEN}
        />
        <TextInput
          placeholder="Postal Code (AR)"
          style={styles.input}
          keyboardType="numeric"
          value={postalAR}
          onChangeText={setPostalAR}
        />

        {/* Optional Fields */}
        <TextInput
          placeholder="VAT Number"
          style={styles.input}
          value={vatNumber}
          onChangeText={setVatNumber}
        />
        <TextInput
          placeholder="CR Number"
          style={styles.input}
          value={crNumber}
          onChangeText={setCrNumber}
        />
        <TextInput
          placeholder="Contact Person"
          style={styles.input}
          value={contactPerson}
          onChangeText={setContactPerson}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Route Day</Text>
        <Picker
          selectedValue={routeDays}
          onValueChange={setRouteDays}
          style={styles.picker}
        >
          {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>

        <TouchableOpacity
          style={[styles.button, (!isValid || submitting) && styles.disabled]}
          onPress={handleSubmit}
          disabled={!isValid || submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? 'Submitting...' : 'Add Customer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#007BFF', borderRadius: 6, padding: 14, alignItems: 'center', marginBottom: 16 },
  disabled: { backgroundColor: '#999' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  label: { fontSize: 14, marginBottom: 6, fontWeight: '600' },
  picker: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16 },
});


export default AddCustomerScreen;