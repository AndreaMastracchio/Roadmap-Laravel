import React, { useState } from 'react';
import { Box } from '@mui/material';
import CodingExercise from './CodingExercise';
import LaravelButton from '../ui/LaravelButton';
import LaravelTypography from '../ui/LaravelTypography';

const CodingExercises = ({ exercises, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [finished, setFinished] = useState(false);

  if (!exercises || exercises.length === 0) return null;

  const handleComplete = () => {
    if (!completedExercises.includes(currentIdx)) {
      setCompletedExercises([...completedExercises, currentIdx]);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < exercises.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setFinished(true);
      if (onFinish) onFinish();
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setCompletedExercises([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <Box sx={{ mt: 4, p: 4, textAlign: 'center', bgcolor: 'rgba(16, 185, 129, 0.05)', borderRadius: 4, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <LaravelTypography variant="h5" weight="bold" sx={{ mb: 2, color: '#065f46' }}>🎉 Esercitazioni Completate!</LaravelTypography>
        <LaravelTypography variant="body1" sx={{ mb: 3 }}>
          Ottimo lavoro! Hai completato tutte le sfide di coding di questo modulo.
          Il tuo progresso è stato salvato con successo.
        </LaravelTypography>
        <LaravelButton variant="contained" onClick={restart}>Ricomincia</LaravelButton>
      </Box>
    );
  }

  const exercise = exercises[currentIdx];
  const isCompleted = completedExercises.includes(currentIdx);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <LaravelTypography variant="subtitle1" weight="medium" sx={{ mb: 2, color: 'text.secondary' }}>
        Sfida {currentIdx + 1} di {exercises.length}
      </LaravelTypography>

      <CodingExercise
        exercise={exercise}
        onComplete={handleComplete}
      />

      {isCompleted && (
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <LaravelButton
            variant="contained"
            onClick={handleNext}
            color="primary"
            sx={{ px: 4 }}
          >
            {currentIdx + 1 < exercises.length ? "Prossima Sfida" : "Termina Sfide"}
          </LaravelButton>
        </Box>
      )}
    </Box>
  );
};

export default CodingExercises;
