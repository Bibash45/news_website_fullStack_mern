import { Home, Article, Register, Login, Admin } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dasboard from "./pages/Admin/Dashboard";
import CreateNews from "./pages/Admin/CreateNews";
import NewsList from "./pages/Admin/NewsList";
import PoliticsNews from "./pages/Admin/Politics";
import MarketEconomyNews from "./pages/Admin/MarketEconomy";
import IdeaNews from "./pages/Admin/Idea";
import NepaliBrandNews from "./pages/Admin/NepaliBrand";
import SocietyNews from "./pages/Admin/Society";
import ArtNews from "./pages/Admin/Art";
import SportsNews from "./pages/Admin/Sports";
import BlogNews from "./pages/Admin/Blog";
import GlobalNews from "./pages/Admin/Global";
import AdminNewsDetails from "./pages/Admin/NewsDetailsPage";
import Search from "./pages/Search/";
import PoliticsPage from "./pages/Politics";
import MarketEconomy from "./pages/MarketEconomy";
import IdeaPage from "./pages/IdeaPage";
import BlogPage from "./pages/BlogPage";
import GlobalPage from "./pages/GlobalPage";
import NepalBrandPage from "./pages/NepalBrandPage";
import ArtPage from "./pages/ArtPage";
import SocietyPage from "./pages/SocietyPage";
import SportsPage from "./pages/SportsPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/xyz">
            <Route path="xyz/register" element={<Register />} />
            <Route path="xyz/login" element={<Login />} />
          </Route>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/news/:newsId" element={<Article />} />
            <Route path="/search" element={<Search />} />
            <Route path="/politics" element={<PoliticsPage />} />
            <Route path="/marketeconomy" element={<MarketEconomy />} />
            <Route path="/idea" element={<IdeaPage />} />
            <Route path="/nepalbrand" element={<NepalBrandPage />} />
            <Route path="/society" element={<SocietyPage />} />
            <Route path="/art" element={<ArtPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/global" element={<GlobalPage />} />
          </Route>


          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dasboard />} />
            <Route path="createnews" element={<CreateNews />} />
            <Route path="newsdetails/:newsId" element={<AdminNewsDetails />} />
            <Route path="newslist" element={<NewsList />} />
            <Route path="politics" element={<PoliticsNews />} />
            <Route path="marketeconomy" element={<MarketEconomyNews />} />
            <Route path="idea" element={<IdeaNews />} />
            <Route path="nepalbrand" element={<NepaliBrandNews />} />
            <Route path="society" element={<SocietyNews />} />
            <Route path="art" element={<ArtNews />} />
            <Route path="sports" element={<SportsNews />} />
            <Route path="blog" element={<BlogNews />} />
            <Route path="global" element={<GlobalNews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
