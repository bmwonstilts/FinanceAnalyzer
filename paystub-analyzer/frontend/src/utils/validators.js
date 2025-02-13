// frontend/src/utils/validators.js
export const validators = {
    required: (value) => {
      if (value === null || value === undefined || value === '') {
        return 'This field is required';
      }
      return null;
    },
  
    email: (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        return 'Invalid email address';
      }
      return null;
    },
  
    password: (value) => {
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/[a-z]/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/[0-9]/.test(value)) {
        return 'Password must contain at least one number';
      }
      return null;
    },
  
    fileType: (file, allowedTypes) => {
      const fileType = file.type.split('/')[1];
      if (!allowedTypes.includes(fileType)) {
        return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
      }
      return null;
    },
  
    fileSize: (file, maxSizeMB) => {
      const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
      if (file.size > maxSize) {
        return `File size must be less than ${maxSizeMB}MB`;
      }
      return null;
    },
  };
  