import React from 'react';
import { Box, Grid, LinearProgress, Chip } from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as ProgressIcon
} from '@mui/icons-material';
import LaravelTypography from '../ui/LaravelTypography';
import LaravelCard from '../ui/LaravelCard';
import { useAuth } from '../../context/AuthContext';

const Dashboard = ({ onSelectCourse, courses = [] }) => {
  const { user } = useAuth();

  if (!user) return null;

  // Filtriamo solo i corsi che l'utente può vedere (pubblici + privati acquistati)
  const userCourses = courses.filter(course =>
    !course.comingSoon &&
    (!course.isPrivate || user.purchasedProjects?.includes(course.id))
  );

  const calculateProgress = (course) => {
    if (!course.modules || course.modules.length === 0) return 0;
    const completedCount = course.modules.filter(mod =>
      user.completedModules?.includes(`${course.id}-${mod.id}`) ||
      user.completedModules?.includes(mod.id)
    ).length;
    return Math.round((completedCount / course.modules.length) * 100);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <LaravelTypography variant="h4" weight="bold" sx={{ color: '#1e293b', mb: 1 }}>
            La tua Dashboard 🚀
          </LaravelTypography>
          <LaravelTypography color="text.secondary">
            Bentornato {user.name}, ecco i tuoi progressi attuali.
          </LaravelTypography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
           <LaravelCard sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, minWidth: 160 }}>
              <Box sx={{ bgcolor: '#326ce515', p: 1, borderRadius: 2, color: '#326ce5' }}>
                <SchoolIcon />
              </Box>
              <Box>
                <LaravelTypography variant="h6" weight="bold">{userCourses.length}</LaravelTypography>
                <LaravelTypography variant="caption" color="text.secondary">Corsi Attivi</LaravelTypography>
              </Box>
           </LaravelCard>
           <LaravelCard sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, minWidth: 160 }}>
              <Box sx={{ bgcolor: '#10b98115', p: 1, borderRadius: 2, color: '#10b981' }}>
                <CheckCircleIcon />
              </Box>
              <Box>
                <LaravelTypography variant="h6" weight="bold">{user.completedModules?.length || 0}</LaravelTypography>
                <LaravelTypography variant="caption" color="text.secondary">Moduli Completati</LaravelTypography>
              </Box>
           </LaravelCard>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Corsi dell'utente */}
        <Grid item xs={12}>
          <LaravelTypography variant="h6" weight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ProgressIcon sx={{ color: '#326ce5' }} /> I tuoi corsi
          </LaravelTypography>

          <Grid container spacing={3}>
            {userCourses.length > 0 ? (
              userCourses.map(course => {
                const progress = calculateProgress(course);
                const firstUncompletedModule = course.modules?.find(m =>
                  !user.completedModules?.includes(`${course.id}-${m.id}`) &&
                  !user.completedModules?.includes(m.id)
                );
                const lastVisitedModuleId = user?.lastVisitedModules?.[course.id];
                const lastVisitedModule = course.modules?.find(m => m.id === lastVisitedModuleId);
                const resumeModule = firstUncompletedModule || lastVisitedModule;

                return (
                  <Grid item xs={12} md={6} lg={4} key={course.id}>
                    <LaravelCard
                      sx={{ p: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}
                      onClick={() => onSelectCourse(course)}
                    >
                      <Box sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ color: course.color, display: 'flex' }}>{course.icon}</Box>
                                <Box>
                                  <LaravelTypography weight="bold">{course.title}</LaravelTypography>
                                  <LaravelTypography variant="caption" color="text.secondary">
                                    {progress === 100 ? 'Completato!' : (resumeModule ? `Prossimo: ${resumeModule.title}` : `${course.modules?.length || 0} Moduli`)}
                                  </LaravelTypography>
                                </Box>
                             </Box>
                             <Chip
                              label={progress === 100 ? 'Completato' : `${progress}%`}
                              color={progress === 100 ? 'success' : 'primary'}
                              size="small"
                              variant={progress === 100 ? 'filled' : 'outlined'}
                             />
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                               <LaravelTypography variant="caption" color="text.secondary">Progresso</LaravelTypography>
                               <LaravelTypography variant="caption" weight="bold">{progress}%</LaravelTypography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{ height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
                            />
                          </Box>
                      </Box>
                    </LaravelCard>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <LaravelCard sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc' }}>
                  <LaravelTypography color="text.secondary">Non hai ancora corsi attivi. Inizia esplorando la Home!</LaravelTypography>
                </LaravelCard>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
