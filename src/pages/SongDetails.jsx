import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data: relatedData, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
    console.log(songData)
    dispatch(setActiveSong({ song, songData, i}))
    dispatch(playPause(true))
  }

  if(isFetchingSongDetails || isFetchingRelatedSongs) return (
    <Loader title="Searching song details..."/>
  );
  if(error) return <Error/>;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        //artistId={artistId}
        songData={songData}
      />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? 
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i}>{line}</p>
            )) : (
              <p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>
            )
          }
        </div>
      </div>
      <RelatedSongs
        data={relatedData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  )
};

export default SongDetails;
