import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import LessonsLanding from './pages/LessonsLanding';
import LessonDetail from './pages/LessonDetail';
import LessonPractice from './pages/LessonPractice';
import Playground from './pages/Playground';
import Quiz from './pages/Quiz';
import QuizTake from './pages/QuizTake';
import AiAssistant from './pages/AiAssistant';
import Resources from './pages/Resources';
import About from './pages/About';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

function LegacyWebLabRedirect() {
  return <Navigate to="/lessons/web-lab/html" replace />;
}

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected */}
        <Route path="/dashboard" element={<P><Dashboard /></P>} />
        <Route path="/lessons" element={<P><LessonsLanding /></P>} />
        <Route path="/lessons/:lessonId" element={<P><LessonDetail /></P>} />
        <Route path="/lessons/:lessonId/:difficulty" element={<P><LessonPractice /></P>} />
        <Route path="/playground" element={<P><Playground /></P>} />
        <Route path="/web-lab/*" element={<P><LegacyWebLabRedirect /></P>} />
        <Route path="/quiz" element={<P><Quiz /></P>} />
        <Route path="/quiz/:quizId" element={<P><QuizTake /></P>} />
        <Route path="/ai" element={<P><AiAssistant /></P>} />
        <Route path="/resources" element={<P><Resources /></P>} />
        <Route path="/about" element={<P><About /></P>} />
        <Route path="/profile" element={<P><Profile /></P>} />

        {/* Legacy redirects */}
        <Route path="/lesson" element={<Navigate to="/lessons" replace />} />
        <Route path="/lesson/type-1" element={<Navigate to="/lessons/type-1" replace />} />
        <Route path="/lesson/legacy" element={<Lesson />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
