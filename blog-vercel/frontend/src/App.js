import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { UserPostsPage } from "./pages/UserPostsPage";
import { OnePostPage } from "./pages/OnePostPage";
import { EditPostPage } from "./pages/EditPostPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authMe } from "./redux/slices/authSlice";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch]);

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='posts' element={<UserPostsPage />} />
                <Route path=':id' element={<OnePostPage />} />
                <Route path=':id/edit' element={<EditPostPage />} />
                <Route path='create' element={<CreatePostPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
            </Routes>

            <ToastContainer position="top-right"/>
        </Layout>
    )
}

export default App;
