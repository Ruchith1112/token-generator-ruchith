import React, { createContext, useContext, useState } from "react";

const TokenGeneratorContext = createContext();

export function TokenGeneratorProvider({ children }) {
  const [inputs, setInputs] = useState({
    numberOfBlue: '',
    bluePrefix: '',
    bluePerRow: '',
    numberOfRed: '',
    redPrefix: '',
    redPerRow: ''
  });
  const [errors, setErrors] = useState({});
  const [generatedBlueTokens, setGeneratedBlueTokens] = useState([]);
  const [generatedRedTokens, setGeneratedRedTokens] = useState([]);
  const [blueTokensPerRow, setBlueTokensPerRow] = useState(1);
  const [redTokensPerRow, setRedTokensPerRow] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    validateInputs(name, value);
  };

  const validateInputs = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'numberOfBlue':
        newErrors[name] = value && (isNaN(value) || value <= 0) ? 'Must be a positive number' : '';
        if (!newErrors[name] && inputs.bluePerRow) {
          newErrors['bluePerRow'] = Number(value) < Number(inputs.bluePerRow) ? 'Tokens per row cannot exceed the total number of tokens' : '';
        }
        break;
      case 'numberOfRed':
        newErrors[name] = value && (isNaN(value) || value <= 0) ? 'Must be a positive number' : '';
        if (!newErrors[name] && inputs.redPerRow) {
          newErrors['redPerRow'] = Number(value) < Number(inputs.redPerRow) ? 'Tokens per row cannot exceed the total number of tokens' : '';
        }
        break;
      case 'bluePerRow':
        newErrors[name] = value && (isNaN(value) || value < 1) ? 'Must be a number greater than 0' : '';
        if (!newErrors[name] && inputs.numberOfBlue) {
          newErrors[name] = Number(inputs.numberOfBlue) < Number(value) ? 'Tokens per row cannot exceed the total number of tokens' : '';
        }
        break;
      case 'redPerRow':
        newErrors[name] = value && (isNaN(value) || value < 1) ? 'Must be a number greater than 0' : '';
        if (!newErrors[name] && inputs.numberOfRed) {
          newErrors[name] = Number(inputs.numberOfRed) < Number(value) ? 'Tokens per row cannot exceed the total number of tokens' : '';
        }
        break;
      case 'bluePrefix':
      case 'redPrefix':
        newErrors[name] = value.trim() === '' ? 'Prefix cannot be empty' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const generateTokens = () => {
    const requiredFields = ['numberOfBlue', 'bluePrefix', 'bluePerRow', 'numberOfRed', 'redPrefix', 'redPerRow'];

    const validationErrors = {};
    requiredFields.forEach((field) => {
      if (!inputs[field] || (typeof inputs[field] === 'string' && inputs[field].trim() === '')) {
        validationErrors[field] = 'This field is required';
      }
    });

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== '') || Object.values(errors).some((error) => error !== '')) {
      return; 
    }

    const generate = (number, prefix) => Array.from({ length: number }, (_, i) => `${prefix}${i + 1}`);
    setGeneratedBlueTokens(generate(Number(inputs.numberOfBlue), inputs.bluePrefix));
    setGeneratedRedTokens(generate(Number(inputs.numberOfRed), inputs.redPrefix));
    setBlueTokensPerRow(Number(inputs.bluePerRow));
    setRedTokensPerRow(Number(inputs.redPerRow));
  };

  const clearTokens = () => {
    setInputs({
      numberOfBlue: '',
      bluePrefix: '',
      bluePerRow: '',
      numberOfRed: '',
      redPrefix: '',
      redPerRow: ''
    });
    setGeneratedBlueTokens([]);
    setGeneratedRedTokens([]);
    setBlueTokensPerRow(1);
    setRedTokensPerRow(1);
    setErrors({});
  };

  return (
    <TokenGeneratorContext.Provider value={{
      inputs, handleChange, generateTokens, clearTokens, generatedBlueTokens, generatedRedTokens, blueTokensPerRow, redTokensPerRow, errors
    }}>
      {children}
    </TokenGeneratorContext.Provider>
  );
}

export const useTokenGenerator = () => useContext(TokenGeneratorContext);
