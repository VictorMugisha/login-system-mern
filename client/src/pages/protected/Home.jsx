import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">Welcome to MyApp!</h2>
          <p className="text-gray-700">
            This is your protected homepage. You can manage your account, view
            personalized content, and explore more features from here.
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Manage Your Account
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  View Your Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Explore New Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
