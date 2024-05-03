const NoPage = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
        <p className="text-lg mb-3">Sorry, the page you are looking for does not exist.</p>
        <p className="text-lg">You can always go back to the <a href="/" className="text-blue-500 underline">homepage</a>.</p>
      </div>
    );
  };

export default NoPage;
