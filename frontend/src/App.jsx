import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'
import LessonsLanding from './pages/LessonsLanding'
import LessonDetail from './pages/LessonDetail'
import LessonPractice from './pages/LessonPractice'
import Playground from './pages/Playground'
import Quiz from './pages/Quiz'
import AiAssistant from './pages/AiAssistant'
import Resources from './pages/Resources'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<LessonsLanding />} />
        <Route path="/lessons/:lessonId" element={<LessonDetail />} />
        <Route path="/lessons/:lessonId/:difficulty" element={<LessonPractice />} />
        <Route path="/playground" element={<Playground />} />
        {/* Legacy routes — redirect to new lesson system */}
        <Route path="/lesson" element={<Navigate to="/lessons" replace />} />
        <Route path="/lesson/type-1" element={<Navigate to="/lessons/type-1" replace />} />
        <Route path="/lesson/legacy" element={<Lesson />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ai" element={<AiAssistant />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
