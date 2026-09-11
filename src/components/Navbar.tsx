import React from 'react';
import { Shield, Terminal, Flame, Zap, Award, LogOut, BookOpen, LayoutDashboard, UserCheck } from 'lucide-react';
import { User, ViewState } from '../types';

interface NavbarProps {
  currentUser: User | null;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onOpenAuth,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate(currentUser ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="navbar-brand-logo"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400/70 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                RAJ<span className="text-emerald-400">HACK</span>ME
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v2.6
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono">CYBERSECURITY LABS</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {currentUser ? (
            <>
              <button
                id="nav-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                id="nav-courses-btn"
                onClick={() => onNavigate('courses')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'courses' || currentView === 'course_detail' || currentView === 'lesson'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Courses & Labs
              </button>
            </>
          ) : (
            <>
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('landing')}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'landing' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                id="nav-preview-courses-btn"
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white"
              >
                Courses Preview
              </button>
              <a
                href="#features-section"
                className="px-3.5 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white"
              >
                Features
              </a>
              <a
                href="#about-section"
                className="px-3.5 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white"
              >
                About
              </a>
            </>
          )}
        </nav>

        {/* Right side / User info or Auth buttons */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* Gamification chips */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  {currentUser.xp} XP
                </span>
                <span className="w-px h-3.5 bg-slate-700" />
                <span className="flex items-center gap-1 text-orange-400 font-medium">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  {currentUser.streak}d
                </span>
              </div>

              {/* User Profile Pill */}
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-xs font-bold font-mono">
                  {currentUser.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-200 leading-tight">
                    {currentUser.username}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono leading-tight">
                    {currentUser.level.split(':')[0]}
                  </span>
                </div>
                <button
                  id="navbar-logout-btn"
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700/80 transition-all font-mono"
              >
                LOGIN
              </button>
              <button
                id="nav-create-account-btn"
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] font-mono"
              >
                CREATE ACCOUNT
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
