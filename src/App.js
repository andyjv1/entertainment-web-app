import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public';
import Login from './features/auth/Login';
import NewUserForm from './features/users/NewUserForm';
import MoviesList from './features/movies/MoviesList';
import TvList from './features/tvshows/TvList';
import TrendingList from './features/trending/TrendingList';
import BrowseLayout from './components/BrowseLayout';
import BookmarkList from './features/bookmarked/BookmarkList';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import useTitle from './features/hooks/useTitle'

function App() {
  useTitle('Entertainment Web App')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<NewUserForm />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="browse" element={<BrowseLayout />}>
              <Route index element={<TrendingList />} />
              <Route path="movies" element={<MoviesList />} />
              <Route path="tvshows" element={<TvList />} />
              <Route path="bookmarked" element={<BookmarkList />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;
