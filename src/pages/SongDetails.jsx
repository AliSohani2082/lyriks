import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { songid } = useParams();

  return (
    <div className="flex flex-col">
      <DitailsHeader
    </div>
  )
};

export default SongDetails;
