import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import HomeNavbar from './components/ui/HomeNavbar';

// pages
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HomeNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;