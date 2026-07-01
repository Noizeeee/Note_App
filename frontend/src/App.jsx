import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './features/auth/auth'
import Register from './features/auth/register'

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('access')
    return token ? children : <Navigate to="/login" />
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/notes" element={
                        <ProtectedRoute>
                            <div>Notes Page Coming Soon</div>
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App