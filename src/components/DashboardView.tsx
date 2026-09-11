import React from 'react';
import { 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Award, 
  Flame, 
  ArrowRight, 
  Terminal, 
  Play, 
  Clock, 
  ShieldCheck, 
  Code,
  Sparkles
} from 'lucide-react';
import { User, Course, ViewState } from '../types';
import { COURSES_DATA } from '../data/courses';
import { getCourseProgress } from '../lib/storage';

interface DashboardViewProps {
  currentUser: User;
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (course: Course, lessonId: string) => void;
  onNavigate: (view: ViewState) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onSelectCourse,
  onSelectLesson,
  onNavigate,
}) => {
  // Find current course and next lesson for "Continue Learning"
  const activeCourse = COURSES_DATA.find(c => c.id === (currentUser.activeCourseId || 'cyber-fundamentals')) || COURSES_DATA[0];
  const nextLesson = activeCourse.lessons.find(l => !currentUser.completedLessonIds.includes(l.id)) || activeCourse.lessons[0];
  const activeCourseProgress = getCourseProgress(activeCourse, currentUser);

  // Overall calculations across all 6 courses
  const totalLessonsAllCourses = COURSES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const overallCompletedLessons = currentUser.completedLessonIds.length;
  const overallProgressPercentage = Math.round((overallCompletedLessons / totalLessonsAllCourses) * 100);

  const enrolledCount = currentUser.enrolledCourseIds.length;
  const completedCount = currentUser.completedCourseIds.length;
  const tasksCompletedCount = currentUser.completedTaskIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIVE CALLSIGN: @{currentUser.username}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Welcome, {currentUser.username} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Welcome back to the terminal. Advance through your cybersecurity curriculum, solve interactive labs, and build real defense capabilities.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            id="dashboard-explore-courses-btn"
            onClick={() => onNavigate('courses')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            BROWSE ALL COURSES
          </button>
        </div>
      </div>

      {/* 7 Required Dashboard Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total XP */}
        <div 
          id="dashboard-card-total-xp"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Total XP</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {currentUser.xp} <span className="text-sm font-normal text-amber-400">XP</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Experience earned across verified labs
          </div>
        </div>

        {/* 2. Courses Enrolled */}
        <div 
          id="dashboard-card-courses-enrolled"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Courses Enrolled</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {enrolledCount} <span className="text-sm font-normal text-slate-500">/ 6</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Active cybersecurity curricula
          </div>
        </div>

        {/* 3. Courses Completed */}
        <div 
          id="dashboard-card-courses-completed"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Courses Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {completedCount} <span className="text-sm font-normal text-emerald-400">Earned</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Certificates unlocked
          </div>
        </div>

        {/* 4. Tasks Completed */}
        <div 
          id="dashboard-card-tasks-completed"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Tasks Completed</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {tasksCompletedCount} <span className="text-sm font-normal text-indigo-400">Solved</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Interactive labs & verified flags
          </div>
        </div>

        {/* 5. Learning Progress */}
        <div 
          id="dashboard-card-learning-progress"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Learning Progress</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-2">
            {overallProgressPercentage}%
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(overallProgressPercentage, 2)}%` }}
            />
          </div>
        </div>

        {/* 6. Current Level */}
        <div 
          id="dashboard-card-current-level"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Current Level</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-purple-300 leading-tight mb-1">
            {currentUser.level}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Tier ranking system
          </div>
        </div>

        {/* 7. Learning Streak */}
        <div 
          id="dashboard-card-learning-streak"
          className="col-span-2 sm:col-span-2 lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-orange-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold">Learning Streak</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-orange-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {currentUser.streak}
            </span>
            <span className="text-xs font-mono text-orange-400 font-bold">
              {currentUser.streak === 1 ? 'DAY STREAK 🔥' : 'DAYS CONSECUTIVE 🔥'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Log in daily and complete tasks to maintain your operational momentum.
          </p>
        </div>
      </div>

      {/* CONTINUE LEARNING SECTION */}
      <div 
        id="dashboard-continue-learning-section"
        className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Play className="w-4 h-4 fill-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-white">
                Continue Learning
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Resume right where you left off
              </span>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ACTIVE TRACK
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                CURRENT COURSE:
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {activeCourse.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeCourse.description}
              </p>
            </div>

            {/* Next Lesson Info */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  NEXT LESSON TO COMPLETE:
                </span>
                <p className="text-sm font-bold font-mono text-slate-200 mt-0.5">
                  {nextLesson.title}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {nextLesson.duration}
                  </span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">
                    +{nextLesson.task.xp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400">Course Progress</span>
                <span className="text-emerald-400 font-bold">{activeCourseProgress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${Math.max(activeCourseProgress, 2)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              id="dashboard-resume-lesson-btn"
              onClick={() => onSelectLesson(activeCourse, nextLesson.id)}
              className="w-full py-4 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2.5 text-sm group"
            >
              <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
              START / RESUME LESSON
            </button>
            <button
              id="dashboard-view-syllabus-btn"
              onClick={() => onSelectCourse(activeCourse)}
              className="w-full py-2.5 rounded-xl font-medium font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs transition-colors"
            >
              View Full Syllabus ({activeCourse.totalLessons} Lessons)
            </button>
          </div>
        </div>
      </div>

      {/* Course Catalog Quick Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-mono text-white">
              Cybersecurity Tracks
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Select any track to access its curriculum and interactive labs
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            View All Courses <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES_DATA.map((course) => {
            const progress = getCourseProgress(course, currentUser);
            const isCompleted = currentUser.completedCourseIds.includes(course.id);
            const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {course.difficulty}
                    </span>
                    {isCompleted ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> COMPLETED
                      </span>
                    ) : progress > 0 ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        IN PROGRESS
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700">
                        NOT STARTED
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-mono text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500">{course.totalLessons} Lessons</span>
                    <span className="text-emerald-400 font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-emerald-400 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    id={`dashboard-course-action-${course.id}`}
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2 rounded-lg text-xs font-bold font-mono text-slate-200 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center gap-1.5"
                  >
                    {progress > 0 ? 'CONTINUE COURSE' : 'START COURSE'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
