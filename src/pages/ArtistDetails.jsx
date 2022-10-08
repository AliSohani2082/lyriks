import { useParams } from "react-router-dom";
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const { data: artistData, isFetching: isFetchingArtist, Error} = useGetSongRelatedQuery({ artistId });

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
  if(Error) return <Error/>;

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

export default ArtistDetails;
