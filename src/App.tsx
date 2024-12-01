import "./App.css";
import { Footer, Header } from "./components";
import { SubscribeInvitation } from "./pages/Subscribe";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 content-center">
        <SubscribeInvitation />
      </main>

      <Footer />
    </div>
  );
}

export default App;
