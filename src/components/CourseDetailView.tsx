import React from 'react';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Play, 
  Shield, 
  Award, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';
import { Course, User } from '../types';
import { getCourseProgress, isLessonLocked } from '../lib/storage';

interface CourseDetailViewProps {
  course: Course;
  currentUser: User;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenCertificate?: () => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  currentUser,
  onBack,
  onSelectLesson,
  onOpenCertificate,
}) => {
  const progress = getCourseProgress(course, currentUser);
  const isCourseComplete = progress === 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to courses bar */}
      <button
        id="course-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK TO ALL COURSES
      </button>

      {/* Course Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {course.tag}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {course.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.estimatedTime}
              </span>
            </div>

            {/* Course title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Progress gauge card */}
          <div className="bg-slate-950/90 border border-slate-800 p-5 rounded-2xl flex flex-col justify-center min-w-[220px] text-center shrink-0">
            <span className="text-xs font-mono text-slate-400 uppercase mb-1">
              Course Progress
            </span>
            <div className="text-4xl font-extrabold font-mono text-emerald-400 mb-2">
              {progress}%
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-3 border border-slate-800">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {course.lessons.filter(l => currentUser.completedLessonIds.includes(l.id)).length} of {course.totalLessons} Lessons Completed
            </span>

            {isCourseComplete && onOpenCertificate && (
              <button
                id="view-certificate-btn"
                onClick={onOpenCertificate}
                className="mt-3 py-2 px-3 rounded-lg text-xs font-bold font-mono text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
              >
                <Award className="w-3.5 h-3.5 fill-slate-950" />
                VIEW CERTIFICATE
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Order Notice */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
        <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong className="text-slate-200">Enforced Learning Progression:</strong> Lessons must be completed in sequential order. Completing each lesson and verifying its hands-on task unlocks the subsequent lesson.
        </span>
      </div>

      {/* Ordered Lessons List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Course Curriculum ({course.lessons.length} Lessons)
          </h2>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson) => {
            const isCompleted = currentUser.completedLessonIds.includes(lesson.id);
            const locked = isLessonLocked(course, lesson, currentUser);

            return (
              <div
                key={lesson.id}
                id={`lesson-row-${lesson.id}`}
                className={`border rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  locked
                    ? 'bg-slate-950/50 border-slate-900/80 opacity-70 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 shadow-md'
                }`}
              >
                {/* Left side: status icon & title */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-sm font-bold ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : locked
                      ? 'bg-slate-900 text-slate-600 border border-slate-800'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : locked ? (
                      <Lock className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Unlock className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base font-bold font-mono ${
                        locked ? 'text-slate-400' : 'text-white'
                      }`}>
                        {lesson.title}
                      </h3>
                      {locked && (
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {lesson.summary}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <span>•</span>
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-amber-400" />
                        +{lesson.task.xp} XP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side action button */}
                <div className="shrink-0 sm:self-center">
                  {locked ? (
                    <button
                      disabled
                      className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold font-mono bg-slate-900/60 text-slate-600 border border-slate-800/80 flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      LOCKED
                    </button>
                  ) : (
                    <button
                      id={`btn-open-lesson-${lesson.id}`}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                        isCompleted
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      }`}
                    >
                      <Play className={`w-3.5 h-3.5 ${isCompleted ? '' : 'fill-slate-950'}`} />
                      {isCompleted ? 'REVIEW LESSON' : 'START LESSON'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
