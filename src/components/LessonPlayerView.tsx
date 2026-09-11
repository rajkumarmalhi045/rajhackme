import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Zap, 
  Terminal, 
  Key, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Course, User } from '../types';

interface LessonPlayerViewProps {
  course: Course;
  lesson: Lesson;
  currentUser: User;
  onBackToCourse: () => void;
  onVerifyAndComplete: (courseId: string, lessonId: string, taskId: string, xpEarned: number) => void;
  onGoToNextLesson?: (nextLessonId: string) => void;
}

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({
  course,
  lesson,
  currentUser,
  onBackToCourse,
  onVerifyAndComplete,
  onGoToNextLesson,
}) => {
  const isAlreadyCompleted = currentUser.completedLessonIds.includes(lesson.id);
  const [answerInput, setAnswerInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasJustCompleted, setHasJustCompleted] = useState(false);

  // Simulated Interactive Terminal state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'whoami', out: currentUser.username },
    { cmd: 'uname -a', out: 'Linux rajhackme-node-01 6.8.0-31-generic #31-Ubuntu SMP x86_64 GNU/Linux' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Find next lesson
  const currentLessonIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < course.lessons.length - 1
    ? course.lessons[currentLessonIndex + 1]
    : null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFeedback(null);
    setIsVerifying(true);

    const cleanInput = answerInput.trim();

    if (!cleanInput) {
      setIsVerifying(false);
      setFeedback({
        type: 'error',
        message: 'Please provide an answer or flag to verify.',
      });
      return;
    }

    setTimeout(() => {
      setIsVerifying(false);
      const isMatch = lesson.task.expectedAnswers.some(expected => 
        expected.trim().toLowerCase() === cleanInput.toLowerCase()
      );

      if (isMatch) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#fbbf24', '#ffffff']
          });
        } catch {
          // ignore if canvas not supported
        }

        setFeedback({
          type: 'success',
          message: lesson.task.explanationOnSuccess || 'Task verified successfully! Outstanding work, hacker.',
        });
        setHasJustCompleted(true);

        // Update progress in app state
        onVerifyAndComplete(course.id, lesson.id, lesson.task.id, lesson.task.xp);
      } else {
        setFeedback({
          type: 'error',
          message: 'Verification failed: Answer does not match expected solution. Review the hints or lesson notes and try again!',
        });
      }
    }, 400);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    let output = '';
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'ls' || lower === 'ls -la') {
      output = 'drwxr-xr-x 2 student student 4096 Sep 11 03:30 .\ndrwxr-xr-x 4 root    root    4096 Sep 11 03:00 ..\n-rw-r--r-- 1 student student  142 Sep 11 03:25 notes.txt\n-r-------- 1 root    root      48 Sep 11 03:20 /etc/secret.txt';
    } else if (lower === 'cat /etc/secret.txt') {
      output = 'FLAG{linux_root_hierarchy_mastered}';
      setAnswerInput('cat /etc/secret.txt');
    } else if (lower.startsWith('cat notes.txt')) {
      output = 'Target IP: 10.10.14.22\nOpen Ports: 22, 80, 443\nRemember: verify the CIA triad.';
    } else if (lower === 'pwd') {
      output = '/home/student';
    } else if (lower === 'whoami') {
      output = currentUser.username;
    } else if (lower === 'help') {
      output = 'Available commands: cat, ls, pwd, whoami, clear, help';
    } else {
      output = `bash: ${cmd.split(' ')[0]}: command executed. Output logged to console.`;
    }

    setTerminalHistory(prev => [...prev, { cmd, out: output }]);
    setTerminalInput('');

    // If command matched expected task answer, auto-populate answer
    if (lesson.task.expectedAnswers.some(ans => ans.toLowerCase() === cmd.toLowerCase())) {
      setAnswerInput(cmd);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumbs and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          id="lesson-back-to-course-btn"
          onClick={onBackToCourse}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO COURSE SYLLABUS
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Course:</span>
          <span className="text-emerald-400 font-bold">{course.title}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Lesson {lesson.order} of {course.totalLessons}</span>
        </div>
      </div>

      {/* Lesson Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                LESSON {lesson.order}
              </span>
              {(isAlreadyCompleted || hasJustCompleted) && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED & COMPLETED
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {lesson.title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              {lesson.summary}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
            <div>
              <span className="text-slate-500 block text-[10px]">TIME TO LEARN</span>
              <span className="text-slate-200 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {lesson.duration}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">LAB REWARD</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" />
                +{lesson.task.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Deep Content, Right = Interactive Task Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LESSON CONTENT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 border-b border-slate-800 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>THEORY & OPERATIONAL PRINCIPLES</span>
            </div>

            {lesson.contentSections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg font-bold font-mono text-white">
                  {section.title}
                </h3>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                  {section.body}
                </div>

                {/* Callout box */}
                {section.callout && (
                  <div className={`p-4 rounded-xl text-xs font-mono border flex items-start gap-3 ${
                    section.callout.type === 'concept'
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                      : section.callout.type === 'alert'
                      ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                      : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300'
                  }`}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{section.callout.text}</span>
                  </div>
                )}

                {/* Code / Command Snippet */}
                {section.codeSnippet && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{section.codeSnippet}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: HANDS-ON TASK & VERIFICATION ENGINE (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <div 
            id="lesson-task-panel"
            className="bg-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono text-white">
                    {lesson.task.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    INTERACTIVE VERIFICATION
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                +{lesson.task.xp} XP
              </span>
            </div>

            {/* Task Prompt / Question */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                MISSION OBJECTIVE:
              </span>
              <p className="text-xs font-mono text-slate-200 leading-relaxed font-semibold">
                {lesson.task.prompt}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {lesson.task.practicalContext}
              </p>
            </div>

            {/* Simulated Interactive CLI (if task type is terminal) */}
            {lesson.task.type === 'terminal' && (
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
                <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    bash shell session
                  </span>
                  <span>port 22</span>
                </div>
                <div className="p-3 max-h-48 overflow-y-auto space-y-2 terminal-scroll text-slate-300">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-emerald-400">
                        student@rajhackme:~$ <span className="text-white">{item.cmd}</span>
                      </div>
                      <div className="text-slate-400 whitespace-pre-wrap pl-2 border-l border-slate-800 text-[11px]">
                        {item.out}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleTerminalSubmit} className="border-t border-slate-800 flex items-center bg-slate-950 p-2">
                  <span className="text-emerald-400 text-xs mr-2 shrink-0">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="e.g. cat /etc/secret.txt"
                    className="w-full bg-transparent text-white focus:outline-none text-xs font-mono placeholder-slate-600"
                  />
                  <button 
                    type="submit"
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono shrink-0 ml-1"
                  >
                    Run
                  </button>
                </form>
              </div>
            )}

            {/* Answer / Flag Input Form */}
            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Enter Solution / Flag</span>
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    {showHint ? 'Hide Hint' : 'Need a Hint?'}
                  </button>
                </label>

                <div className="relative">
                  <input
                    id="lesson-answer-input"
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder={
                      lesson.task.type === 'flag'
                        ? 'FLAG{...}'
                        : 'Type your verified answer...'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                  />
                  <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Expandable Hint Box */}
              {showHint && lesson.task.hints && lesson.task.hints.length > 0 && (
                <div 
                  id="task-hint-box"
                  className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1"
                >
                  <div className="font-bold flex items-center gap-1.5 text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Operational Hint:
                  </div>
                  <p>{lesson.task.hints[hintIndex % lesson.task.hints.length]}</p>
                  {lesson.task.hints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setHintIndex(prev => prev + 1)}
                      className="text-[10px] text-cyan-400 underline block mt-1"
                    >
                      Next Hint ({hintIndex + 1}/{lesson.task.hints.length})
                    </button>
                  )}
                </div>
              )}

              {/* Feedback Banner */}
              {feedback && (
                <div 
                  id="task-feedback-banner"
                  className={`p-3.5 rounded-xl text-xs font-mono flex items-start gap-2.5 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block">
                      {feedback.type === 'success' ? 'Task Verified! ✓' : 'Verification Failed'}
                    </span>
                    <span>{feedback.message}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  id="btn-verify-task"
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3.5 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isVerifying ? 'VERIFYING SUBMISSION...' : 'VERIFY TASK'}
                </button>

                {/* If verified or already completed, show next lesson button */}
                {(isAlreadyCompleted || hasJustCompleted) && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {nextLesson ? (
                      <button
                        id="btn-next-lesson"
                        type="button"
                        onClick={() => onGoToNextLesson && onGoToNextLesson(nextLesson.id)}
                        className="w-full py-3 rounded-xl font-bold font-mono text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2 text-xs"
                      >
                        CONTINUE TO LESSON {nextLesson.order}: {nextLesson.title.split('. ')[1] || nextLesson.title}
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                      </button>
                    ) : (
                      <div className="text-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                        🎉 ALL LESSONS IN THIS COURSE ARE COMPLETED!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
