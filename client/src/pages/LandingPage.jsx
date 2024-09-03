import { Link } from "react-router-dom";

export default function LandngPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">MyApp</h1>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-gray-200 text-blue-600 rounded hover:bg-gray-300">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white flex flex-col justify-center items-center text-center py-20">
        <h2 className="text-5xl font-bold mb-4">Welcome to MyApp</h2>
        <p className="text-lg mb-8">
          Discover amazing features and services that make your life easier.
        </p>
        <div className="space-x-4">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
            Get Started
          </button>
          <button className="px-8 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4 md:px-0">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Why Choose MyApp?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-4">Feature One</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-4">Feature Two</h4>
            <p className="text-gray-600">
              Cras suscipit, quam vitae dapibus efficitur, purus felis vehicula
              odio, et ullamcorper lacus neque eget odio.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-4">Feature Three</h4>
            <p className="text-gray-600">
              Duis vulputate metus et sollicitudin pretium. Nulla facilisi.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-12">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">
                MyApp has transformed the way I manage my daily tasks. Highly
                recommended!
              </p>
              <h4 className="mt-4 text-xl font-bold">John Doe</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">
                A seamless experience from start to finish. Great job!
              </p>
              <h4 className="mt-4 text-xl font-bold">Jane Smith</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">
                I love the simplicity and ease of use. It makes everything so
                much easier!
              </p>
              <h4 className="mt-4 text-xl font-bold">Emily Johnson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-lg mb-8">
          Join thousands of users who are already enjoying MyApp.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
