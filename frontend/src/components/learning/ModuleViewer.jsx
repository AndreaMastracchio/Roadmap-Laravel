import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { Box, Fade } from '@mui/material';
import { QuizOutlined, AssignmentOutlined, CheckCircle, WarningAmber } from '@mui/icons-material';

import LaravelContainer from '../ui/LaravelContainer';
import LaravelPaper from '../ui/LaravelPaper';
import LaravelLoader from '../ui/LaravelLoader';
import LaravelSection from '../ui/LaravelSection';
import LaravelTypography from '../ui/LaravelTypography';
import LaravelButton from '../ui/LaravelButton';
import Quiz from './Quiz';
import CodingExercises from './CodingExercises';
import NavigationButtons from './NavigationButtons';
import { useAuth } from '../../context/AuthContext';

const ModuleViewer = ({
  activeCourse,
  activeModule,
  content,
  questions,
  exercises,
  loading,
  handleModuleFinish,
  handleModuleSelect
}) => {
  const { user } = useAuth();
  if (!activeCourse) return null;

  const moduleKey = activeModule ? `${activeCourse.id}-${activeModule.id}` : null;
  const isCompleted = user?.completedModules?.includes(moduleKey) || user?.completedModules?.includes(activeModule?.id);

  return (
    <LaravelContainer maxWidth="lg">
      <Fade in={!loading} timeout={400}>
        <Box>
          <LaravelPaper sx={{ mb: 4, minHeight: '60vh', position: 'relative' }}>
            {loading ? (
              <LaravelLoader message="Caricamento contenuti del modulo..." />
            ) : (
              <>
                {!user && (
                   <Box sx={{ mb: 4, p: 2, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #ff980040' }}>
                      <WarningAmber sx={{ color: '#ff9800' }} />
                      <LaravelTypography variant="body2" color="text.secondary">
                        Non sei loggato. Il tuo progresso non verrà salvato sul server. <LaravelButton size="small" variant="text" sx={{ ml: 1, p: 0, minWidth: 0, verticalAlign: 'baseline', textTransform: 'none' }}>Accedi ora</LaravelButton>
                      </LaravelTypography>
                   </Box>
                )}

                {isCompleted && (
                   <Box sx={{ mb: 4, p: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #10b98140' }}>
                      <CheckCircle sx={{ color: '#10b981' }} />
                      <LaravelTypography variant="body2" weight="bold" sx={{ color: '#065f46' }}>
                        Hai completato questo modulo! Ottimo lavoro.
                      </LaravelTypography>
                   </Box>
                )}

                <Box className="markdown-content">
                  <ReactMarkdown rehypePlugins={[rehypeSlug, rehypeRaw]}>{content}</ReactMarkdown>
                </Box>

                {exercises && exercises.length > 0 && activeModule && (
                  <LaravelSection
                    id="exercises-section"
                    title="Esercitazioni Pratiche"
                    icon={<AssignmentOutlined />}
                  >
                    <CodingExercises
                      exercises={exercises}
                      key={`${activeModule.id}-exercises`}
                      onFinish={handleModuleFinish}
                    />
                  </LaravelSection>
                )}

                {questions && questions.length > 0 && activeModule && (
                  <LaravelSection
                    id="quiz-section"
                    title="Quiz di Verifica"
                    icon={<QuizOutlined />}
                  >
                    <Quiz
                      questions={questions}
                      key={activeModule.id}
                      onFinish={handleModuleFinish}
                    />
                  </LaravelSection>
                )}

                {!isCompleted && !activeCourse.isIntro && user && questions.length === 0 && exercises.length === 0 && (
                   <Box sx={{ mt: 6, p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #cbd5e1' }}>
                      <LaravelTypography variant="h6" sx={{ mb: 2 }}>Hai terminato la lettura?</LaravelTypography>
                      <LaravelButton variant="contained" onClick={handleModuleFinish}>
                        Segna come completato
                      </LaravelButton>
                   </Box>
                )}

                {!activeCourse.isIntro && activeModule && (
                  <NavigationButtons
                    currentModule={activeModule}
                    allModules={activeCourse.modules}
                    onModuleSelect={handleModuleSelect}
                  />
                )}
              </>
            )}
          </LaravelPaper>
        </Box>
      </Fade>
    </LaravelContainer>
  );
};

export default ModuleViewer;
