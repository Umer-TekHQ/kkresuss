import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { setEmail, setUsername, setProfilePicture } from '../src/store/slices/userSlice';
import { Images } from '../src/assets';

describe('Redux User State', () => {
  test('should update email in store', () => {
    // Initial state
    expect(store.getState().user.email).toBe('');
    
    // Dispatch action to update email
    store.dispatch(setEmail('test@example.com'));
    
    // Check if state was updated
    expect(store.getState().user.email).toBe('test@example.com');
  });
  
  test('should update username in store', () => {
    // Initial state might be empty or have value from previous test
    
    // Dispatch action to update username
    store.dispatch(setUsername('testuser'));
    
    // Check if state was updated
    expect(store.getState().user.username).toBe('testuser');
  });
  
  test('should update profile picture in store', () => {
    // Initial state
    expect(store.getState().user.profilePicture).toBe(Images.profileicon);
    
    // Dispatch action to update profile picture
    store.dispatch(setProfilePicture(Images.primary));
    
    // Check if state was updated
    expect(store.getState().user.profilePicture).toBe(Images.primary);
  });
}); 