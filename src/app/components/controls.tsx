import { PlayIcon, PauseIcon, MicrophoneIcon } from "@heroicons/react/24/solid";

interface ControlsProps {
  isPlaying: boolean;
  startPlaying: () => void | Promise<void>;
  pausePlaying: () => void | Promise<void>;
  canPlay: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  startPlaying,
  pausePlaying,
  canPlay,
}) => {
  return (
    <div className="flex space-x-4 items-center w-full justify-between pb-4">
      {isPlaying ? (
        <div className="bg-gray-500 rounded-full p-2">
          <PauseIcon
            onClick={pausePlaying}
            className="text-white h-6 w-6 cursor-pointer"
          />
        </div>
      ) : (
        <div
          className={`${
            canPlay ? "bg-green-500" : "bg-gray-500"
          } rounded-full p-2`}
        >
          <PlayIcon
            onClick={canPlay ? startPlaying : () => {}}
            className="text-white h-6 w-6 cursor-pointer"
          />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <MicrophoneIcon className="text-white h-6 w-6" />
        <div className="flex space-x-1">
          <div
            className={`bg-white h-4 w-4 rounded-lg ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className={`bg-white h-4 w-4 rounded-lg ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className={`bg-white h-4 w-4 rounded-lg ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className={`bg-white h-4 w-4 rounded-lg ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
