import { useState, useEffect } from 'react';
import Select from 'react-select';
import Card from './Card';
import { OptionType } from '../types/optionTypes';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, UNSPLASH_ACCESS_KEY } from '../constants/constants';

const SearchBar = () => {
  const [accessTokenSpotify, setAccessTokenSpotify] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState('');
  const [previewTrackName, setPreviewTrackName] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [audioKey, setAudioKey] = useState(0); 

  const [searchResults, setSearchResults] = useState<OptionType[]>([]);

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
        throw new Error ('something went wrong') 
      }
    };

    fetchSpotifyAccessToken();
  }, []);

  const handleSearch = async (query: String) => {
    //fetch songs
    if(query) {
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
        const tracks = data.tracks.items;
        setSearchResults(tracks)
      } catch (error) {
        throw new Error ('something went wrong') 
      }
      //  fetch images
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10`, {
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
        throw new Error ('something went wrong') 
      }
    }
  };
  // map fetched results so it can be properly displayed in Select element
  const mappedTrackOptions = (searchResults as OptionType[]).map(item => ({
    label: item.name,
    value: item.name
  })) 
  
  const handleSelectSong = (selectedOption: {label: string, value: string}) => {
    const selectedSong = searchResults.find(song => song.name === selectedOption.value);
    if (selectedSong) {
      setPreviewTrackName(selectedSong.name);
      setArtistName(selectedSong.artists[0].name);
      setAudioPreviewUrl(selectedSong.preview_url);

      // Increment the key to force audio element to remount
      setAudioKey(prevKey => prevKey + 1);
    }
  };

  return (
    <div className="px-10">
      <div className="w-6/12">
        <Select
          options={mappedTrackOptions}
          isSearchable
          placeholder={'Select an option'}
          inputValue={searchQuery}
          onInputChange={(value) => {
            setSearchQuery(value);
            handleSearch(value);
          }}
          onChange={handleSelectSong}
        />
      </div>
    
      <div className="flex justify-between">
        <div>
          <h1 className='py-5 text-cyan-900 italic'>Images based on search results:</h1>
          <div className="grid grid-rows-5 grid-flow-col gap-4">
            {photos.map((photo) => (
              <Card
                title={photo.alt_description}
                id={photo.id}
                imageSrc={photo.urls.small}
              />  
            ))}
          </div> 
        </div>
        
        {audioPreviewUrl ? (
          <div className="w-1/4">
            <h1 className='py-5 text-cyan-900 italic'>Audio preview based on search results:</h1>
            <label className="ml-5 text-blue-900 font-semibold">{previewTrackName + ' - ' + artistName}</label>
            <audio className="mt-2" key={audioKey} controls>
              <source src={audioPreviewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : <span className="text-red-600">Sorry. Audio for this song is not available due to copyright restrictions.</span>}
      </div>
    </div>
  );
};

export default SearchBar;
