import './App.css';
import { COMPANY_NAME } from './common';
import { Footer, Header } from './components';
import { RequestInvitation } from './pages/RequestInvitation';

function App() {
  const companyName = COMPANY_NAME;

  return (
    <div className="flex flex-col min-h-screen">
      <Header companyName={companyName} />

      <main className="flex-grow bg-gray-100 content-center">
        <RequestInvitation />
      </main>

      <Footer companyName={companyName} />
    </div>
  );
}

export default App;
