import React from "react";

const Spotify = () => {
  const [playlist, setPlaylist] = React.useState<null | { url: string }>(null);
  const [songs, setSongs] = React.useState<
    | {
        artist: string;
        title: string;
        images?: { url: string }[];
      }[]
    | null
  >(null);
  const [prompt, setPrompt] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const r = await fetch(
        "/api/spotify/songsByPrompt?prompt=" + encodeURIComponent(prompt)
      );
      const j = await r.json();
      setSongs(j);
    } catch (err) {
      alert("something went wrong, try again");
    }
    setLoading(false);
  };

  const handleCreatePlaylist = async () => {
    const body = { playlistName: prompt, tracks: songs };
    const r = await fetch("/api/spotify/playlist/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    });

    const { playlistUrl } = await r.json();
    setPlaylist({ url: playlistUrl });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (songs !== null) {
    return (
      <>
        {playlist ? (
          <a
            target={"_blank"}
            href={playlist.url}
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg fixed bottom-10 right-10 transition duration-300"
          >
            To My Playlist
          </a>
        ) : (
          <button
            onClick={handleCreatePlaylist}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-10 right-10 shadow-lg"
          >
            Create Playlist
          </button>
        )}
        <div
          id="playlist"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-10"
        >
          {songs.map((song, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              {song.images && song.images.length > 0 && (
                <img
                  src={song.images[0].url}
                  alt={song.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                <p className="text-gray-400">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-10 text-gray-100">
          Create Your Music Playlist
        </h1>

        <form onSubmit={onSubmit} className="flex justify-center mb-10">
          <div className="flex border-2 border-gray-300 rounded-full overflow-hidden shadow-lg">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              id="playlistPrompt"
              placeholder="Make a music playlist that..."
              className="px-4 py-3 w-80 lg:w-96 focus:outline-none bg-gray-800 text-white placeholder-gray-300"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-green-600 px-5 rounded-r-full"
            >
              <i className="fas fa-play text-white text-xl"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Spotify;
