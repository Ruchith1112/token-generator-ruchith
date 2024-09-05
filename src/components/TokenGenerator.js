import React, { useState } from 'react';
import { useTokenGenerator } from './TokenGeneratorContext';
import { TextField, Button, Grid, Typography, Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Confetti from 'react-confetti';
import './TokenGenerator.css';

function TokenGenerator() {
  const { inputs, handleChange, generateTokens, clearTokens, generatedBlueTokens, generatedRedTokens, blueTokensPerRow, redTokensPerRow, errors } = useTokenGenerator();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleGenerate = () => {
    const hasErrors = Object.values(errors).some(error => error); 
    if (!hasErrors) {
      generateTokens();
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000); 
    }
  };

  const handleClearConfirmation = () => {
    if (generatedBlueTokens.length > 0 || generatedRedTokens.length > 0) {
      setConfirmClearOpen(true);
    }
  };

  const handleConfirmClear = () => {
    clearTokens();
    setConfirmClearOpen(false);
  };

  const handleCancelClear = () => {
    setConfirmClearOpen(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
      {showConfetti && !Object.values(errors).some(error => error) && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Card sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: 3, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Token Generator
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Number of Blue Tokens"
                name="numberOfBlue"
                value={inputs.numberOfBlue}
                onChange={handleChange}
                fullWidth
                error={!!errors.numberOfBlue}
                helperText={errors.numberOfBlue}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Blue Prefix"
                name="bluePrefix"
                value={inputs.bluePrefix}
                onChange={handleChange}
                fullWidth
                error={!!errors.bluePrefix}
                helperText={errors.bluePrefix}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Blue Tokens per Row"
                name="bluePerRow"
                value={inputs.bluePerRow}
                onChange={handleChange}
                fullWidth
                error={!!errors.bluePerRow}
                helperText={errors.bluePerRow}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Number of Red Tokens"
                name="numberOfRed"
                value={inputs.numberOfRed}
                onChange={handleChange}
                fullWidth
                error={!!errors.numberOfRed}
                helperText={errors.numberOfRed}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Red Prefix"
                name="redPrefix"
                value={inputs.redPrefix}
                onChange={handleChange}
                fullWidth
                error={!!errors.redPrefix}
                helperText={errors.redPrefix}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Red Tokens per Row"
                name="redPerRow"
                value={inputs.redPerRow}
                onChange={handleChange}
                fullWidth
                error={!!errors.redPerRow}
                helperText={errors.redPerRow}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              sx={{ mr: 2, px: 4, py: 1.5 ,margin:2}}
              startIcon={<CheckCircle />}
            >
              Generate
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearConfirmation}
              sx={{ px: 4, py: 1.5 }}
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={confirmClearOpen} onClose={handleCancelClear}>
        <DialogTitle>Confirm Clear</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all tokens?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClear} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClear} color="secondary" autoFocus>
            Clear
          </Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: 3, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Blue Tokens
          </Typography>
          {generatedBlueTokens.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              Go ahead and generate some tokens to display here.
            </Typography>
          ) : (
            <Box sx={{ overflowX: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#1976d2 #e3f2fd' }}>
              <Grid container spacing={2} sx={{ width: blueTokensPerRow * 120 }}> 
                {generatedBlueTokens.map((token, index) => (
                  <Grid item xs={12 / blueTokensPerRow} key={index}>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        p: 1,
                        border: '1px solid #1976d2',
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: '#e3f2fd',
                        fontWeight: 600,
                        color: '#1976d2'
                      }}
                    >
                      {token}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: 3, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Red Tokens
          </Typography>
          {generatedRedTokens.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              Go ahead and generate some tokens to display here.
            </Typography>
          ) : (
            <Box sx={{ overflowX: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#d32f2f #ffebee' }}>
              <Grid container spacing={2} sx={{ width: redTokensPerRow * 120 }}>
                {generatedRedTokens.map((token, index) => (
                  <Grid item xs={12 / redTokensPerRow} key={index}>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        p: 1,
                        border: '1px solid #d32f2f',
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: '#ffebee',
                        fontWeight: 600,
                        color: '#d32f2f'
                      }}
                    >
                      {token}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default TokenGenerator;
