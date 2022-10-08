import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { songid } = useParams();

  return (
    <div className="flex flex-col">
      {/* <DitailsHeader
        artistId={artistId}
        songData={songData}
      /> */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {}
        </div>
      </div>
    </div>
  )
};

export default SongDetails;
