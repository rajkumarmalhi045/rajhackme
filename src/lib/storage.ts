import { User, Course, Lesson } from '../types';
import { COURSES_DATA } from '../data/courses';

const STORAGE_USERS_KEY = 'rajhackme_registered_users';
const STORAGE_CURRENT_USER_KEY = 'rajhackme_current_user_session';

// Default initial demo user so users can either register fresh or click 1-click demo login
const DEMO_USER: User = {
  fullName: 'Raj Kumar',
  username: 'raj_hacker',
  email: 'rajkumar@rajhackme.local',
  password: 'password123',
  xp: 0,
  streak: 1,
  level: 'Level 1: Script Cadet',
  joinedDate: '2026-09-11',
  lastActiveDate: new Date().toISOString().split('T')[0],
  enrolledCourseIds: [],
  completedCourseIds: [],
  completedLessonIds: [],
  completedTaskIds: [],
  activeCourseId: 'cyber-fundamentals',
  activeLessonId: 'cf-l1'
};

export function getRegisteredUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      const initial = [DEMO_USER];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [DEMO_USER];
  }
}

export function saveRegisteredUsers(users: User[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users', err);
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: User | null): void {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
      // Also update in registered users list
      const users = getRegisteredUsers();
      const idx = users.findIndex(u => u.username.toLowerCase() === user.username.toLowerCase());
      if (idx >= 0) {
        users[idx] = user;
      } else {
        users.push(user);
      }
      saveRegisteredUsers(users);
    }
  } catch (err) {
    console.error('Failed to persist user session', err);
  }
}

export function registerAccount(data: {
  fullName: string;
  username: string;
  email: string;
  password: string;
}): { success: boolean; error?: string; user?: User } {
  const users = getRegisteredUsers();
  const trimmedUsername = data.username.trim();
  const trimmedEmail = data.email.trim().toLowerCase();

  if (users.some(u => u.username.toLowerCase() === trimmedUsername.toLowerCase())) {
    return { success: false, error: 'Username is already taken by another hacker.' };
  }

  if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return { success: false, error: 'Email is already registered.' };
  }

  const today = new Date().toISOString().split('T')[0];
  const newUser: User = {
    fullName: data.fullName.trim(),
    username: trimmedUsername,
    email: trimmedEmail,
    password: data.password,
    xp: 0,
    streak: 1,
    level: 'Level 1: Script Cadet',
    joinedDate: today,
    lastActiveDate: today,
    enrolledCourseIds: [],
    completedCourseIds: [],
    completedLessonIds: [],
    completedTaskIds: [],
    activeCourseId: 'cyber-fundamentals',
    activeLessonId: 'cf-l1'
  };

  users.push(newUser);
  saveRegisteredUsers(users);
  return { success: true, user: newUser };
}

export function loginAccount(identifier: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getRegisteredUsers();
  const cleanId = identifier.trim().toLowerCase();

  const user = users.find(
    u => u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  );

  if (!user) {
    return { success: false, error: 'User not found. Check your email or username.' };
  }

  if (user.password && user.password !== password) {
    return { success: false, error: 'Invalid password. Please try again.' };
  }

  // Update streak if needed
  const today = new Date().toISOString().split('T')[0];
  if (user.lastActiveDate !== today) {
    user.streak = (user.streak || 0) + 1;
    user.lastActiveDate = today;
  }

  saveCurrentUser(user);
  return { success: true, user };
}

export function logoutAccount(): void {
  saveCurrentUser(null);
}

export function calculateLevel(xp: number): string {
  if (xp >= 2000) return 'Level 5: Elite PenTester';
  if (xp >= 1000) return 'Level 4: Threat Hunter';
  if (xp >= 500) return 'Level 3: Cyber Operative';
  if (xp >= 200) return 'Level 2: Byte Sentinel';
  return 'Level 1: Script Cadet';
}

export function getCourseProgress(course: Course, user: User | null): number {
  if (!user) return 0;
  const courseLessons = course.lessons;
  if (courseLessons.length === 0) return 0;

  const completedCount = courseLessons.filter(l => user.completedLessonIds.includes(l.id)).length;
  return Math.round((completedCount / courseLessons.length) * 100);
}

export function isLessonLocked(course: Course, lesson: Lesson, user: User | null): boolean {
  if (!user) return true;
  // First lesson of any course is ALWAYS unlocked
  if (lesson.order === 1) return false;

  // Otherwise, the previous lesson must be completed
  const previousLesson = course.lessons.find(l => l.order === lesson.order - 1);
  if (!previousLesson) return false;

  return !user.completedLessonIds.includes(previousLesson.id);
}

export function completeTaskAndLesson(
  courseId: string,
  lessonId: string,
  taskId: string,
  xpEarned: number,
  currentUser: User
): { updatedUser: User; isCourseNewlyCompleted: boolean } {
  const updatedUser: User = { ...currentUser };

  // Ensure course is in enrolled list
  if (!updatedUser.enrolledCourseIds.includes(courseId)) {
    updatedUser.enrolledCourseIds = [...updatedUser.enrolledCourseIds, courseId];
  }

  // Award XP if task wasn't completed before
  if (!updatedUser.completedTaskIds.includes(taskId)) {
    updatedUser.completedTaskIds = [...updatedUser.completedTaskIds, taskId];
    updatedUser.xp = (updatedUser.xp || 0) + xpEarned;
    updatedUser.level = calculateLevel(updatedUser.xp);
  }

  // Mark lesson completed
  if (!updatedUser.completedLessonIds.includes(lessonId)) {
    updatedUser.completedLessonIds = [...updatedUser.completedLessonIds, lessonId];
  }

  // Find course and check if all lessons are now complete
  const course = COURSES_DATA.find(c => c.id === courseId);
  let isCourseNewlyCompleted = false;
  if (course) {
    const allFinished = course.lessons.every(l => updatedUser.completedLessonIds.includes(l.id));
    if (allFinished && !updatedUser.completedCourseIds.includes(courseId)) {
      updatedUser.completedCourseIds = [...updatedUser.completedCourseIds, courseId];
      isCourseNewlyCompleted = true;
    }
  }

  // Set active course & next lesson
  updatedUser.activeCourseId = courseId;
  if (course) {
    const nextLesson = course.lessons.find(l => !updatedUser.completedLessonIds.includes(l.id));
    if (nextLesson) {
      updatedUser.activeLessonId = nextLesson.id;
    }
  }

  saveCurrentUser(updatedUser);
  return { updatedUser, isCourseNewlyCompleted };
}
