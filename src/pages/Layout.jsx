import { Button } from '../components/ui/Button';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-yellow-300">
      {/* Header */}
      <header className="bg-black border-b-8 border-black shadow-brutal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-black text-white transform -rotate-1">
                NEO TODO
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="secondary"
                className="bg-pink-400 hover:bg-pink-500 text-black font-black border-4 border-black shadow-brutal transform hover:-translate-y-1 transition-all duration-200"
              >
                SETTINGS
              </Button>
              <Button 
                variant="primary"
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-brutal transform hover:-translate-y-1 transition-all duration-200"
              >
                PROFILE
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r-8 border-black min-h-screen">
          <div className="p-6">
            <nav className="space-y-4">
              <div className="bg-red-400 border-4 border-black p-4 transform rotate-1 shadow-brutal">
                <h2 className="font-black text-xl text-black mb-4">MENU</h2>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="block font-bold text-black hover:text-white hover:bg-black p-2 border-2 border-black transform hover:-rotate-1 transition-all duration-200"
                    >
                      ALL TASKS
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="block font-bold text-black hover:text-white hover:bg-black p-2 border-2 border-black transform hover:-rotate-1 transition-all duration-200"
                    >
                      ACTIVE
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="block font-bold text-black hover:text-white hover:bg-black p-2 border-2 border-black transform hover:-rotate-1 transition-all duration-200"
                    >
                      COMPLETED
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-green-400 border-4 border-black p-4 transform -rotate-1 shadow-brutal">
                <h3 className="font-black text-lg text-black mb-3">STATS</h3>
                <div className="space-y-2">
                  <div className="bg-white border-2 border-black p-2">
                    <span className="font-bold text-black">TOTAL: 0</span>
                  </div>
                  <div className="bg-white border-2 border-black p-2">
                    <span className="font-bold text-black">DONE: 0</span>
                  </div>
                  <div className="bg-white border-2 border-black p-2">
                    <span className="font-bold text-black">LEFT: 0</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-400 border-4 border-black p-4 transform rotate-1 shadow-brutal">
                <h3 className="font-black text-lg text-black mb-3">QUICK ADD</h3>
                <Button 
                  className="w-full bg-orange-400 hover:bg-orange-500 text-black font-black border-4 border-black shadow-brutal transform hover:-translate-y-1 transition-all duration-200"
                >
                  + NEW TASK
                </Button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t-8 border-black mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-white font-bold transform -rotate-1">
              NEO BRUTALISM TODO © 2024
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost"
                className="bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-black transform hover:rotate-1 transition-all duration-200"
              >
                HELP
              </Button>
              <Button 
                variant="ghost"
                className="bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-black transform hover:-rotate-1 transition-all duration-200"
              >
                ABOUT
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;