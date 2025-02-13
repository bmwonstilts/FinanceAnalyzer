import React from 'react';

function App() {
  // Using basic HTML to eliminate any component issues
  return (
    <div style={{minHeight: '100vh', padding: '20px'}}>
      {/* Inline styles above to check if any styles work */}
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Component</h1>
        <p>If Tailwind is working, this should be a white text on blue background</p>
      </div>

      <div className="test-style mt-4 max-w-md mx-auto">
        This should also be styled if Tailwind is processing correctly
      </div>
    </div>
  );
}

export default App;