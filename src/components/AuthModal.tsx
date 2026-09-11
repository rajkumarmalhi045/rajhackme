import React, { useState, useEffect } from 'react';
import { Shield, Lock, User as UserIcon, Mail, CheckCircle2, AlertCircle, X, ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { registerAccount, loginAccount } from '../lib/storage';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signupSuccessMsg, setSignupSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSignupSuccessMsg(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSignupSuccessMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!username.trim() || username.length < 3) {
      setErrorMsg('Username must be at least 3 characters.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('A valid email address is required.');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-check.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = registerAccount({
        fullName,
        username,
        email,
        password: signupPassword,
      });

      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed. Please try again.');
        return;
      }

      // Show required message: "Account Created Successfully ✓"
      setSignupSuccessMsg('Account Created Successfully ✓');

      // Automatically redirect the user to the Login page after brief delay
      setTimeout(() => {
        setMode('login');
        setLoginIdentifier(username);
        setLoginPassword('');
        setSignupSuccessMsg(null);
        setErrorMsg(null);
      }, 1500);
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your Email or Username.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginAccount(loginIdentifier, loginPassword);
      setIsLoading(false);

      if (!res.success || !res.user) {
        setErrorMsg(res.error || 'Invalid credentials.');
        return;
      }

      onLoginSuccess(res.user);
      onClose();
    }, 350);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const res = loginAccount('raj_hacker', 'password123');
      setIsLoading(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
        onClose();
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        id="auth-modal-card"
      >
        {/* Cyber terminal top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          id="auth-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-mono text-white tracking-wide">
            {mode === 'login' ? 'ACCESS RAJHACKME' : 'ENLIST AS A HACKER'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {mode === 'login'
              ? 'Authenticate to unlock interactive labs & dashboard'
              : 'Create your verified cybersecurity student profile'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-lg bg-slate-950 p-1 mb-6 border border-slate-800">
          <button
            id="tab-login-btn"
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
              setSignupSuccessMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold font-mono rounded-md transition-all ${
              mode === 'login'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LOGIN
          </button>
          <button
            id="tab-signup-btn"
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
              setSignupSuccessMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold font-mono rounded-md transition-all ${
              mode === 'signup'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Success Alert Banner */}
        {signupSuccessMsg && (
          <div 
            id="signup-success-alert"
            className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5 animate-pulse"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">{signupSuccessMsg}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div 
            id="auth-error-alert"
            className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' ? (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="signup-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  id="signup-username-input"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. cyber_hawk"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="signup-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password-input"
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password-input"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs font-mono text-slate-400 pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-emerald-400 hover:underline font-bold"
              >
                LOGIN
              </button>
            </p>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Email / Username
              </label>
              <div className="relative">
                <input
                  id="login-identifier-input"
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="raj_hacker or user@mail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password-input"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 font-mono"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>

            {/* Quick Demo Access Helper Button */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                id="quick-demo-login-btn"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700/70 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Demo Login (raj_hacker)</span>
              </button>
            </div>

            <p className="text-center text-xs font-mono text-slate-400 pt-1">
              Need an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-emerald-400 hover:underline font-bold"
              >
                Create Account
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
