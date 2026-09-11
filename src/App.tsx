import React, { useState, useEffect } from 'react';
import { User, Course, Lesson, ViewState } from './types';
import { COURSES_DATA } from './data/courses';
import { 
  getCurrentUser, 
  logoutAccount, 
  completeTaskAndLesson,
  getCourseProgress
} from './lib/storage';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { CoursesListView } from './components/CoursesListView';
import { CourseDetailView } from './components/CourseDetailView';
import { LessonPlayerView } from './components/LessonPlayerView';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const user = getCurrentUser();
    return user ? 'dashboard' : 'landing';
  });

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Active course and lesson selection
  const [selectedCourse, setSelectedCourse] = useState<Course>(() => COURSES_DATA[0]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => COURSES_DATA[0].lessons[0].id);

  // Certificate Modal state
  const [certCourse, setCertCourse] = useState<Course | null>(null);

  // Update session on load or view shift
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (!user && currentView !== 'landing') {
      setCurrentView('landing');
    }
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    // Redirect to USER DASHBOARD as specified in requirement
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logoutAccount();
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleNavigate = (view: ViewState) => {
    if (!currentUser && view !== 'landing') {
      handleOpenAuth('login');
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    setSelectedCourse(course);
    setCurrentView('course_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (course: Course, lessonId: string) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    setSelectedCourse(course);
    setSelectedLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerifyAndCompleteTask = (
    courseId: string,
    lessonId: string,
    taskId: string,
    xpEarned: number
  ) => {
    if (!currentUser) return;

    const { updatedUser, isCourseNewlyCompleted } = completeTaskAndLesson(
      courseId,
      lessonId,
      taskId,
      xpEarned,
      currentUser
    );

    setCurrentUser(updatedUser);

    if (isCourseNewlyCompleted) {
      const finishedCourse = COURSES_DATA.find(c => c.id === courseId);
      if (finishedCourse) {
        setCertCourse(finishedCourse);
      }
    }
  };

  const handleNextLesson = (nextLessonId: string) => {
    setSelectedLessonId(nextLessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active lesson object
  const currentLesson = selectedCourse.lessons.find(l => l.id === selectedLessonId) || selectedCourse.lessons[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="pb-16">
        {/* 1. PUBLIC LANDING PAGE (when unauthenticated or explicitly navigated) */}
        {currentView === 'landing' && (
          <LandingPage onOpenAuth={handleOpenAuth} />
        )}

        {/* 2. USER DASHBOARD (authenticated) */}
        {currentView === 'dashboard' && currentUser && (
          <DashboardView
            currentUser={currentUser}
            onSelectCourse={handleSelectCourse}
            onSelectLesson={(course, lessonId) => handleSelectLesson(course, lessonId)}
            onNavigate={handleNavigate}
          />
        )}

        {/* 3. COURSES SECTION (authenticated) */}
        {currentView === 'courses' && currentUser && (
          <CoursesListView
            currentUser={currentUser}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {/* 4. COURSE PAGE (authenticated) */}
        {currentView === 'course_detail' && currentUser && (
          <CourseDetailView
            course={selectedCourse}
            currentUser={currentUser}
            onBack={() => handleNavigate('courses')}
            onSelectLesson={(lessonId) => handleSelectLesson(selectedCourse, lessonId)}
            onOpenCertificate={() => setCertCourse(selectedCourse)}
          />
        )}

        {/* 5. LESSON SYSTEM (authenticated) */}
        {currentView === 'lesson' && currentUser && (
          <LessonPlayerView
            course={selectedCourse}
            lesson={currentLesson}
            currentUser={currentUser}
            onBackToCourse={() => setCurrentView('course_detail')}
            onVerifyAndComplete={handleVerifyAndCompleteTask}
            onGoToNextLesson={handleNextLesson}
          />
        )}
      </main>

      {/* Authentication Modal (Sign Up & Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Certificate Modal for Course Completion */}
      {certCourse && currentUser && (
        <CertificateModal
          isOpen={!!certCourse}
          course={certCourse}
          user={currentUser}
          onClose={() => setCertCourse(null)}
        />
      )}
    </div>
  );
}
