import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getTokenDetails } from '../services/tokenApi';
import { getTokenDetailsFallback, getTokenDetailsStandard, getTokenDetailsWithHeaders, getTokenDetailsWithRetry } from '../services/alternativeTokenApi';
import { getMockTokenDetails } from '../services/mockTokenApi';
import { testDataTransformation } from '../utils/testDataTransform';

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

  const testDataTransform = () => {
    setLoading(true);
    setTestResult('Testing Data Transformation...');
    
    try {
      const transformedData = testDataTransformation();
      setTestResult(`Data Transform Success! Result: ${JSON.stringify(transformedData, null, 2)}`);
    } catch (error) {
      setTestResult(`Transform Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testAlternativeApis = async () => {
    setLoading(true);
    setTestResult('Testing Alternative APIs...');
    
    const testAddress = '0x532f27101965dd16442e59d40670faf5ebb142e4'; // Brett token
    const methods = [
      { name: 'Standard', fn: getTokenDetailsStandard },
      { name: 'With Headers', fn: getTokenDetailsWithHeaders },
      { name: 'With Retry', fn: getTokenDetailsWithRetry },
      { name: 'Fallback', fn: getTokenDetailsFallback },
    ];
    
    let results = [];
    
    for (const method of methods) {
      try {
        const result = await method.fn(testAddress);
        results.push(`✅ ${method.name}: Success`);
      } catch (error) {
        results.push(`❌ ${method.name}: ${error.message}`);
      }
    }
    
    setTestResult(`Alternative API Test Results:\n${results.join('\n')}`);
    setLoading(false);
  };

  const testMockApi = async () => {
    setLoading(true);
    setTestResult('Testing Mock API...');
    
    try {
      const testAddress = '0x532f27101965dd16442e59d40670faf5ebb142e4'; // Brett token
      const result = await getMockTokenDetails(testAddress);
      setTestResult(`Mock API Success! Result: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setTestResult(`Mock API Error: ${error.message}`);
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
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 10 }]} onPress={testDataTransform} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Data Transformation'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF9800', marginTop: 10 }]} onPress={testAlternativeApis} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Alternative APIs'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0', marginTop: 10 }]} onPress={testMockApi} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Mock API'}
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
