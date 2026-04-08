import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider
} from '@mui/material';
import { ShoppingBagOutlined as ShopIcon, CheckCircleOutline } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import LaravelTypography from '../ui/LaravelTypography';
import LaravelButton from '../ui/LaravelButton';

const PurchaseModal = ({ open, onClose, course, onPurchase, onOpenAuth }) => {
  const { user } = useAuth();

  if (!course) return null;

  const handleLoginClick = () => {
    onClose();
    if (onOpenAuth) onOpenAuth();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShopIcon color="primary" />
        <LaravelTypography variant="h6" weight="bold">Acquista Corso</LaravelTypography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <LaravelTypography variant="h6" weight="bold" gutterBottom>
            {course.title}
          </LaravelTypography>
          <LaravelTypography variant="body2" color="text.secondary">
            {course.description}
          </LaravelTypography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <LaravelTypography variant="body1">Prezzo:</LaravelTypography>
          <LaravelTypography variant="h5" weight="bold" color="primary.main">
            {course.price}
          </LaravelTypography>
        </Box>

        {!user && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(244, 67, 54, 0.05)', borderRadius: 2, border: '1px dashed #f44336' }}>
            <LaravelTypography variant="body2" color="error" align="center" weight="medium" sx={{ mb: 1 }}>
              Devi essere loggato per procedere.
            </LaravelTypography>
            <LaravelButton
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              onClick={handleLoginClick}
            >
              Accedi o Registrati ora
            </LaravelButton>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <LaravelButton onClick={onClose} color="inherit">Annulla</LaravelButton>
        <LaravelButton
          variant="contained"
          onClick={onPurchase}
          disabled={!user}
          startIcon={<CheckCircleOutline />}
        >
          Conferma Acquisto
        </LaravelButton>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseModal;
