import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Network, 
  Globe, 
  ShieldAlert, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';
import { Course, User, Difficulty } from '../types';
import { COURSES_DATA } from '../data/courses';
import { getCourseProgress } from '../lib/storage';

interface CoursesListViewProps {
  currentUser: User;
  onSelectCourse: (course: Course) => void;
}

export const CoursesListView: React.FC<CoursesListViewProps> = ({
  currentUser,
  onSelectCourse,
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredCourses = COURSES_DATA.filter(course => {
    if (filterDifficulty === 'All') return true;
    return course.difficulty === filterDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-2">
            LEARNING PATHS
          </div>
          <h1 className="text-3xl font-extrabold text-white font-mono tracking-tight">
            Cybersecurity Courses & Labs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Choose a specialization track. Complete lessons in order, solve real-world tasks, and earn certification.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterDifficulty === diff
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => {
          const progress = getCourseProgress(course, currentUser);
          const isCompleted = currentUser.completedCourseIds.includes(course.id);
          const isStarted = progress > 0;

          return (
            <div
              key={course.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group hover:-translate-y-1 shadow-lg"
              id={`course-card-${course.id}`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Course {idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    course.difficulty === 'Beginner'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : course.difficulty === 'Intermediate'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>

                {/* Course Name */}
                <h2 className="text-xl font-bold font-mono text-white group-hover:text-emerald-400 transition-colors mb-2.5">
                  {course.title}
                </h2>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Metadata details */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{course.totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{course.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Start Course Button */}
              <div className="border-t border-slate-800/80 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    {progress}% Progress
                  </span>
                  {isCompleted ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                  ) : isStarted ? (
                    <span className="text-amber-400 font-semibold">
                      IN PROGRESS
                    </span>
                  ) : (
                    <span className="text-slate-500 font-semibold">
                      NOT STARTED
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  id={`btn-start-course-${course.id}`}
                  onClick={() => onSelectCourse(course)}
                  className={`w-full py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                    isStarted
                      ? 'bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 border border-slate-700'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  {isStarted ? 'CONTINUE COURSE' : 'START COURSE'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
