export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TaskType = 'flag' | 'terminal' | 'quiz' | 'input';

export interface QuizOption {
  id: string;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  prompt: string;
  type: TaskType;
  practicalContext: string;
  hints: string[];
  xp: number;
  // Answer verification: can be exact string or case-insensitive match
  expectedAnswers: string[];
  explanationOnSuccess: string;
  // Terminal lab context (if type === 'terminal')
  terminalPrompt?: string;
  terminalContext?: {
    files?: Record<string, string>;
    availableCommands?: string[];
  };
  // Quiz context (if type === 'quiz')
  quizOptions?: QuizOption[];
}

export interface LessonContentSection {
  title: string;
  body: string;
  codeSnippet?: string;
  callout?: {
    type: 'tip' | 'warning' | 'alert' | 'concept';
    text: string;
  };
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  duration: string;
  summary: string;
  contentSections: LessonContentSection[];
  task: Task;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  iconName: string;
  tag: string;
  totalLessons: number;
  lessons: Lesson[];
}

export interface User {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  xp: number;
  streak: number;
  level: string;
  joinedDate: string;
  lastActiveDate: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  completedLessonIds: string[];
  completedTaskIds: string[];
  activeCourseId?: string;
  activeLessonId?: string;
}

export type ViewState = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'courses'
  | 'course_detail'
  | 'lesson';
