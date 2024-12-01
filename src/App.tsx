import './App.css';
import { Footer, Header } from './components';
import { RequestInvitation } from './pages/RequestInvitation';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-100 content-center">
        <RequestInvitation />
      </main>

      <Footer />
    </div>
  );
}

export default App;
