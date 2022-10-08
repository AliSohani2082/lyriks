import SongBar from './SongBar'

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistid }) => (
  <div className='flex flex-col'>
    <h1 className='font-bold text-3xl text-white'>Related Songs</h1>
    <div className='mt-6 w-full flex flex-col'>
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistid}`}
          song={song}
          i={i}
          artistId={artistid}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>

  </div>
);

export default RelatedSongs;
