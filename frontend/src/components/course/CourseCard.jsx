import React from 'react';
import { Box, Chip, Tooltip, LinearProgress } from '@mui/material';
import { AccessTime as TimeIcon, ChevronRight as ArrowIcon, LockOutlined as LockIcon, CheckCircle as OwnedIcon } from '@mui/icons-material';
import LaravelCard from '../ui/LaravelCard';
import LaravelTypography from '../ui/LaravelTypography';
import { useAuth } from '../../context/AuthContext';

const CourseCard = ({ course, onSelect }) => {
  const { user, hasAccessToProject } = useAuth();
  const isPrivate = course.isPrivate;
  const hasAccess = !isPrivate || hasAccessToProject(course.id);
  const isOwned = user && user.purchasedProjects?.includes(course.id);

  const progress = user && course.modules ?
    Math.round((course.modules.filter(m => user.completedModules?.includes(`${course.id}-${m.id}`) || user.completedModules?.includes(m.id)).length / (course.modules.length || 1)) * 100) : 0;

  const firstUncompletedModule = course.modules?.find(m =>
    !user?.completedModules?.includes(`${course.id}-${m.id}`) &&
    !user?.completedModules?.includes(m.id)
  );

  const lastVisitedModuleId = user?.lastVisitedModules?.[course.id];
  const lastVisitedModule = course.modules?.find(m => m.id === lastVisitedModuleId);

  // Il modulo da suggerire per la ripresa
  const resumeModule = firstUncompletedModule || lastVisitedModule;

  const handleClick = () => {
    if (course.comingSoon) return; // Se coming soon non facciamo nulla
    onSelect(course);
  };

  return (
    <LaravelCard
      onClick={handleClick}
      disabled={course.comingSoon}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: course.comingSoon ? 0.7 : 1,
        position: 'relative',
        cursor: course.comingSoon ? 'default' : 'pointer'
      }}
    >
      {isPrivate && (
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          {isOwned ? (
            <Tooltip title="Acquistato">
              <OwnedIcon sx={{ color: 'success.main', fontSize: 20 }} />
            </Tooltip>
          ) : (
            <Tooltip title="Progetto Privato">
              <LockIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            </Tooltip>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: `${course.color}15`,
            color: course.color,
            display: 'flex',
            mr: 1.2
          }}
        >
          {React.cloneElement(course.icon, { fontSize: 'small' })}
        </Box>
        <LaravelTypography weight="bold" variant="subtitle2" sx={{ lineHeight: 1.2 }}>
          {course.title}
        </LaravelTypography>
      </Box>

      <LaravelTypography
        variant="caption"
        color="text.secondary"
        sx={{
          mb: 2,
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2rem'
        }}
      >
        {course.description}
      </LaravelTypography>

      <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <TimeIcon sx={{ fontSize: '0.8rem' }} />
          <LaravelTypography variant="caption" weight="semibold" sx={{ fontSize: '0.7rem' }}>
            {course.duration}
          </LaravelTypography>
        </Box>

        {course.comingSoon ? (
          <Chip label="Coming Soon" size="small" variant="outlined" color="secondary" sx={{ fontSize: '0.6rem', height: 18 }} />
        ) : isPrivate && !isOwned ? (
           <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <LaravelTypography variant="button" weight="bold" sx={{ fontSize: '0.65rem', mr: 0.5 }}>
              {course.price}
            </LaravelTypography>
            <LaravelTypography variant="button" weight="bold" sx={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>
              Acquista
            </LaravelTypography>
            <ArrowIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', color: course.color }}>
            <LaravelTypography variant="button" weight="bold" sx={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>
              Dettagli
            </LaravelTypography>
            <ArrowIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
        )}
      </Box>

      {(user && hasAccess && !course.comingSoon) && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <LaravelTypography variant="caption" color="text.secondary" sx={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {progress === 100 ? 'Corso Completato!' : (resumeModule ? `Riprendi: ${resumeModule.title}` : 'Inizia il corso')}
            </LaravelTypography>
            <LaravelTypography variant="caption" weight="bold">{progress}%</LaravelTypography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 4, borderRadius: 2, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 2, bgcolor: progress === 100 ? '#10b981' : 'primary.main' } }}
          />
        </Box>
      )}
    </LaravelCard>
  );
};

export default CourseCard;
