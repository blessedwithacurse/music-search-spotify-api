import React, { useState, useEffect } from 'react';

const SPOTIFY_CLIENT_ID = '354aba920fde42baad1953c0ebe19e7a';
const SPOTIFY_CLIENT_SECRET = '70672ab560c7492a9db3fd509fe5e606';
const UNSPLASH_ACCESS_KEY = '477-2ox7H78pK2vyGN9KtARGgM1QMA4YXqCJsgxYrE8';

const SearchBar = () => {
  const [accessTokenSpotify, setAccessTokenSpotify] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState('');

  useEffect(() => {
    const fetchSpotifyAccessToken = async () => {
      try {
        const authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
        };

        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);

        if (!response.ok) {
          throw new Error('Failed to fetch Spotify access token');
        }

        const data = await response.json();
        setAccessTokenSpotify(data.access_token);
      } catch (error) {
        console.error('Error fetching Spotify access token:', error);
      }
    };

    fetchSpotifyAccessToken();
  }, []);

  const search = async (query) => {
    console.log('Search for', query);

    try {
      const artistParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenSpotify}`,
        },
      };

      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, artistParams);

      if (!response.ok) {
        throw new Error('Failed to fetch Spotify search results');
      }

      const data = await response.json();
      const track = data.tracks.items[0];
      const currentAudioPreviewUrl = track?.preview_url;

      console.log('Track:', track);
      console.log('Audio Preview URL:', currentAudioPreviewUrl);

      setAudioPreviewUrl(currentAudioPreviewUrl);
      fetchUnsplashPhotos(query);
    } catch (error) {
      console.error('Error searching on Spotify:', error);
    }
  };

  const fetchUnsplashPhotos = async (query: String) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=7`, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Unsplash photos');
      }

      const data = await response.json();
      setPhotos(data.results);
    } catch (error) {
      console.error('Error fetching Unsplash photos:', error);
    }
  };

  return (
    <div className="px-10">
      <input
        className="rounded-md w-6/12 p-2 border-dashed border-2 border-grey-300 focus:outline-none"
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
          search(event.target.value);
        }}
      />
      <h1>Unsplash Photos</h1>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
          </li>
        ))}
      </ul>

      {audioPreviewUrl && (
        <div>
          <h2>Audio Preview</h2>
          <audio controls>
            <source src={audioPreviewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
