import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getTokenDetails } from '../services/tokenApi';

const ApiTestComponent = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setTestResult('Testing API...');
    
    try {
      const testAddress = '0xc20059e0317de91738d13af027dfc4a50781b066'; // Spark token
      const result = await getTokenDetails(testAddress);
      setTestResult(`API Success! Response: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setTestResult(`API Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={testApi} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Token Details API'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.result}>{testResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#010D2A',
  },
  button: {
    backgroundColor: '#4898F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  result: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default ApiTestComponent;
