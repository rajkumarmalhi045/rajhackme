import React from 'react';
import { 
  Shield, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Award, 
  Users, 
  Code2, 
  Flame, 
  Key, 
  Eye, 
  Network, 
  Globe, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { COURSES_DATA } from '../data/courses';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 cyber-grid">
      {/* Top Banner Alert / Status */}
      <div className="border-b border-emerald-500/20 bg-emerald-950/20 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>[SYSTEM STATUS]: 38 INTERACTIVE CYBERSECURITY LABS ACTIVE • HANDS-ON LEARNING ONLINE</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-slate-800/80">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono mb-6">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE REAL-WORLD CYBERSECURITY ACADEMY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 font-mono leading-tight">
            Learn Cybersecurity By <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Actually Doing It.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8 leading-relaxed">
            Forget passive video lectures. <span className="text-emerald-400 font-semibold font-mono">RAJHACKME</span> delivers in-browser terminals, simulated attack scenarios, step-by-step verified labs, and gamified progress tracking.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              id="hero-create-account-btn"
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 text-base group"
            >
              CREATE ACCOUNT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-login-btn"
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              LOGIN TO PLATFORM
            </button>
          </div>

          {/* Real Learning Flow Diagram */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">rajhackme-learning-protocol.sh</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                PROVEN METHODOLOGY
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
              REAL USER LEARNING FLOW:
            </div>

            {/* Steps pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs text-center">
              {[
                { label: 'SIGN UP / LOGIN', icon: '01', desc: 'Secure Auth' },
                { label: 'DASHBOARD', icon: '02', desc: 'Stats & XP' },
                { label: 'SELECT COURSE', icon: '03', desc: '6 Tracks' },
                { label: 'LEARN LESSON', icon: '04', desc: 'Core Theory' },
                { label: 'COMPLETE TASK', icon: '05', desc: 'CLI / Flag' },
                { label: 'VERIFY', icon: '06', desc: 'Real-time' },
                { label: 'UPDATE PROGRESS', icon: '07', desc: 'Streak & XP' },
                { label: 'COURSE COMPLETED', icon: '08', desc: 'Certified' },
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 p-2.5 rounded-lg flex flex-col items-center justify-center transition-all group"
                >
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1">
                    {step.icon}
                  </span>
                  <span className="font-bold text-slate-200 group-hover:text-emerald-300 text-[11px] leading-tight">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 border-b border-slate-800/80 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-4">
                <Shield className="w-3.5 h-3.5" />
                ABOUT RAJHACKME
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-6 leading-snug">
                Built for Aspiring Hackers & Blue Team Defenders
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                Cybersecurity isn't learned by staring at PowerPoint slides. <strong className="text-white">RajHackMe</strong> was engineered from the ground up to recreate real operational security scenarios right in your web browser.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                From inspecting Linux file permissions and tracking down SUID privilege escalation vectors, to crafting SQL injection payloads and executing defensive incident response with the MITRE ATT&CK framework, each module tests your comprehension with real-time flag verification.
              </p>

              <div className="space-y-3">
                {[
                  '100% In-Browser Interactive Terminal Labs (Zero Local Installs)',
                  'Real-Time Answer & Flag Verification with Helpful Guidance Hints',
                  'Earn XP, Maintain Daily Streaks, and Level Up from Cadet to Elite PenTester',
                  'Formal Certificate of Completion awarded upon 100% course mastery',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual preview card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>terminal-session-01.sh</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  SIMULATED SANDBOX
                </span>
              </div>
              <div className="font-mono text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <p className="text-emerald-400 font-semibold">$ nmap -sV -p 22,80,443 target.rajhackme.local</p>
                <p className="text-slate-400">Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-11 03:30 UTC</p>
                <p className="text-slate-300">Nmap scan report for target.rajhackme.local (10.10.14.22)</p>
                <p className="text-slate-300">Host is up (0.0024s latency).</p>
                <div className="text-slate-400 border-t border-slate-800/60 pt-2 space-y-1">
                  <p className="text-slate-200">PORT   STATE SERVICE VERSION</p>
                  <p className="text-emerald-300">22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu</p>
                  <p className="text-emerald-300">80/tcp open  http    Apache httpd 2.4.52</p>
                </div>
                <div className="mt-3 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-300 text-[11px]">
                  [FLAG DISCOVERED]: FLAG&#123;nmap_stealth_recon_verified&#125;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-20 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
              CURRICULUM PREVIEW
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-4">
              6 Core Cybersecurity Tracks
            </h2>
            <p className="text-slate-400 text-sm">
              Each course contains structured lessons, hands-on tasks, and end-of-course capstones. 
              <span className="text-amber-400 font-semibold block mt-1">
                🔒 You must Login or Create an Account to access course contents and track progress.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES_DATA.map((course, idx) => (
              <div
                key={course.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
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

                  <h3 className="text-lg font-bold text-white font-mono mb-2 group-hover:text-emerald-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-6">
                    <span>{course.totalLessons} Lessons</span>
                    <span>•</span>
                    <span>{course.estimatedTime}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-slate-500">Progress: 0%</span>
                    <span className="text-slate-500">NOT STARTED</span>
                  </div>
                  <button
                    id={`preview-course-btn-${course.id}`}
                    onClick={() => onOpenAuth('login')}
                    className="w-full py-2.5 rounded-lg text-xs font-bold font-mono text-slate-300 bg-slate-800/90 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 border border-slate-700/80"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    LOGIN TO START COURSE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-section" className="py-20 border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
              PLATFORM ARSENAL
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-4">
              Engineered for Hands-On Skill Mastery
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to transform theoretical security concepts into operational instincts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Terminal,
                title: 'Browser Terminal Labs',
                desc: 'Simulated Bash shells and command engines let you inspect logs, test permissions, and analyze services directly.',
              },
              {
                icon: Key,
                title: 'Instant Task Verification',
                desc: 'Submit your findings, answers, or flags and get instant validation feedback with intelligent hint diagnostics.',
              },
              {
                icon: Flame,
                title: 'XP, Levels & Streaks',
                desc: 'Earn experience points for every verified task. Advance from Script Cadet to Byte Sentinel and Elite PenTester.',
              },
              {
                icon: Award,
                title: 'Verifiable Certificates',
                desc: 'Complete 100% of a course curriculum to earn a personalized verifiable certificate of completion.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white font-mono mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-4">
              Ready to Begin Your Cybersecurity Journey?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
              Sign up today, start with Cybersecurity Fundamentals, conquer the interactive labs, and build real offensive and defensive skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="cta-create-account-btn"
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm"
              >
                CREATE ACCOUNT
              </button>
              <button
                id="cta-login-btn"
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm transition-all"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950 text-xs font-mono text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">RAJHACKME</span>
            <span>• Interactive Cybersecurity Platform</span>
          </div>
          <div>
            <span>© 2026 RajHackMe Academy. Built for Hands-on Defenders & Ethical Hackers.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
