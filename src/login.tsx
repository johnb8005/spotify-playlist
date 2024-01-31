const Login = () => {
  const handleClick = async () => {
    const r = await fetch("/api/spotify/sso/url");

    const j = await r.json();
    window.location.href = j.url;
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-400 p-6 text-3xl rounded-full"
      >
        <i className="fa-brands fa-spotify"></i> Login with Spotify
      </button>
    </div>
  );
};

export default Login;
