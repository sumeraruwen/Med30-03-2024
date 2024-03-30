import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import Slider from "@react-native-community/slider";
import TrackPlayer from "react-native-track-player";
import { height, width } from "./src/constants/dimentions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import flag333 from "./src/images/flag-333.webp";
import flag777 from "./src/images/flag-777.webp";

const SongPlayer = ({
  songsList,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onClose,
  onChange,
}) => {
  const navigation = useNavigation();
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(
    // playbackState !== "stopped" ? true : false
    playbackState !== "stopped" ? false : true
  );

  console.log("paaaaaaaaaaa", playbackState)
  
  useEffect(() => {
    console.log("currentSongIndex", currentSongIndex);
    console.log("currentIndex", currentIndex);
    setCurrentSongIndex(currentIndex);
   
  }, [currentIndex]);

  useEffect(() => {
    setCurrentSongIndex(currentIndex);
   
}, [currentIndex]);
console.log("ISP_PLAYING--------", isPlaying)

const format = seconds => {
let mins = parseInt(seconds / 60)
  .toString()
  .padStart(2, '0');
let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
return `${mins}:${secs}`;
};

const togglePlayback = async () => {
if (isPlaying) {
  await TrackPlayer.pause();
 
} else {
  await TrackPlayer.play();
 
}
setIsPlaying(!isPlaying);

};

// const skipToNext = async () => {
// if (currentSongIndex < songsList.length - 1) {
//   await TrackPlayer.skipToNext();
 
//   onChange((currentSongIndex + 1) % songsList.length);
//   setCurrentSongIndex((currentSongIndex + 1) % songsList.length);
 
//   setIsPlaying(true);
  
// } else {
//   // Loop back to the first audio
//   await TrackPlayer.skip(0);
// }
// };

//workinh--------------------------------------
// const skipToNext = async () => {
//   if (currentSongIndex < songsList.length - 1) {
//     await TrackPlayer.skipToNext();
//     onChange((currentSongIndex + 1) % songsList.length);
//     setCurrentSongIndex((currentSongIndex + 1) % songsList.length);
//     setIsPlaying(false); // Set isPlaying to false to display the play button
//   } else {
//     // Loop back to the first audio
//     await TrackPlayer.skip(0);
//     setIsPlaying(false); // Set isPlaying to false to display the play button
//   }
// };

const skipToNext = async () => {
  if (currentSongIndex < songsList.length - 1) {
    await TrackPlayer.skipToNext();
    onChange((currentSongIndex + 1) % songsList.length);
    setCurrentSongIndex((currentSongIndex + 1) % songsList.length);
    setIsPlaying(false); // Set isPlaying to true since next song is playing
  } else {
    // Loop back to the first audio
    await TrackPlayer.skip(0);
    setCurrentSongIndex(0); // Reset the current song index to the first song
    setIsPlaying(false); // Set isPlaying to true since next song is playing
  }
};


// const skipToPrevious = async () => {
// if (currentSongIndex > 0) {
//   await TrackPlayer.skipToPrevious();
//   onChange((currentSongIndex - 1) % songsList.length);
//   setCurrentSongIndex((currentSongIndex - 1) % songsList.length);
//   setIsPlaying(true);
// } else {
//   // Go to the last audio in a circular manner
//   await TrackPlayer.skip(songsList.length - 1);
// }
// };


// const skipToPrevious = async () => {
//   if (currentSongIndex > 0) {
//     await TrackPlayer.pause(); // Pause the player
//     await TrackPlayer.skipToPrevious();
//     onChange((currentSongIndex - 1) % songsList.length);
//     setCurrentSongIndex((currentSongIndex - 1) % songsList.length);
//     setIsPlaying(false); // Set isPlaying to false to display the play button
//   } else {
//     // Go to the last audio in a circular manner
//     await TrackPlayer.pause(); // Pause the player
//     await TrackPlayer.skip(songsList.length - 1);
//     setCurrentSongIndex(songsList.length - 1);
//     setIsPlaying(false); // Set isPlaying to false to display the play button
//   }
// };

const skipToPrevious = async () => {
  let newIndex = currentSongIndex - 1;
  if (newIndex < 0) {
    newIndex = songsList.length - 1; // Go to the last song if at the beginning
  }

  await TrackPlayer.pause(); // Pause the player
  await TrackPlayer.skip(newIndex);

  setCurrentSongIndex(newIndex); // Update the current song index

  setIsPlaying(false); // Set isPlaying to false to display the play button
};



// const restartAudio = async () => {
// await TrackPlayer.seekTo(0);
// await TrackPlayer.play();
// };



  const restartAudio = async () => {
    await TrackPlayer.seekTo(0);
    await TrackPlayer.play(); 
  };

  useEffect(() => {
    const strNum1 = progress.position.toString().split(".");
    const strNum2 = progress.duration.toString().split(".");
    if (strNum1[0] === strNum2[0] && currentIndex === songsList.length - 1) {
      TrackPlayer.pause();
      setIsPlaying(false);
      TrackPlayer.reset();
      TrackPlayer.add(songsList);
    } else if (
      strNum1[0] === strNum2[0] 
    ) {
      setIsPlaying(false);
    }
  }, [progress]);


  useEffect(() => {
    setIsPlaying(
      playbackState === "playing" ? true : false 
    );
  }, [playbackState])

  return (
    <View>
      <StatusBar hidden={isVisible} backgroundColor={"transparent"} />
      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        onSwipeComplete={onClose}
        statusBarTranslucent
      >
        <LinearGradient
          colors={["#d9d600", "#760075"]}
          style={{ flex: 1, paddingTop: Platform.OS === "android" ? 20 : 0 }}
        >
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}

          <TouchableOpacity
            style={{ marginTop: 0, marginLeft: 20 }}
            onPress={() => {
              onClose();
              setIsPlaying(false); // Set isPlaying to false when down arrow is clicked
            }}
            
          >
            <Image
              source={require("./src/images/down-arrow.webp")}
              style={{
                marginTop: 40,
                width: 30,
                height: 30,
                tintColor: "black",
              }}
            />
          </TouchableOpacity>
          <View style={[styles.imageContainer, styles.shadowProp]}>
            <Image
              //   source={songsList[currentSongIndex].artwork}
              source={songsList[currentIndex]?.artwork}
              style={{
                width: "100%",
                height: "100%",
                marginTop: -5,
                borderRadius: 5,
              }}
            />
          </View>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: 26,
              color: "black",
              fontWeight: "600",
              marginLeft: 31,
              marginTop: 20,
              marginRight: 30,
            }}
          >
            {/* {songsList[currentSongIndex].title} */}
            {songsList[currentIndex]?.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              marginLeft: 33,
            }}
          >
            <MaterialIcons
              name={"record-voice-over"}
              size={width(5.5)}
              color={"black"}
            />
            {songsList[currentSongIndex]?.flag && (
              <Image
                source={
                  songsList[currentSongIndex].flag === "333" ? flag333 : flag777
                }
                style={styles.flag}
              />
            )}
            <Text
              style={{
                color: "black",
                fontSize: 16,
                verticalAlign: "middle",
                marginLeft: 5,
                fontWeight: "600",
              }}
            >
              {songsList[currentSongIndex]?.artist}
            </Text>
          </View>

          <Slider
            style={{
              width: "90%",
              height: 40,
              alignSelf: "center",
              marginTop: 30,
            }}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor="black"
            maximumTrackTintColor="black"
            onSlidingComplete={async (value) => {
              const seconds = Math.floor(value);
              await TrackPlayer.seekTo(seconds);
            }}
            value={progress.position}
          />

          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "black" }}>{format(progress.position)}</Text>
            <Text style={{ color: "black" }}>{format(progress.duration)}</Text>
          </View>

          <View
            style={{
              width: "90%",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              marginTop: height(1),
              marginBottom: height(1),
              marginLeft:40
            }}
          >
            <TouchableOpacity onPress={restartAudio}>
              {/* <MaterialIcons
                name={"restart-alt"}
                size={width(11)}
                color={"#000000"}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToPrevious}>
              <MaterialIcons
                name={"skip-previous"}
                size={width(15)}
                color={"#000000"}
              />
            </TouchableOpacity>

            {/* Botón de reinicio */}

            <TouchableOpacity
              style={{
                width: width(15),
                height: width(15),
                borderRadius: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={togglePlayback}
            >
              <MaterialIcons
                name={isPlaying ? "pause" : "play-arrow"}
                size={width(13)}
                color={"#000000"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipToNext}>
              <MaterialIcons
                name={"skip-next"}
                size={width(15)}
                color={"#000000"}
              />
            </TouchableOpacity>

            <MaterialIcons
              name={"queue-music"}
              size={width(10)}
              color={"#000000"}
              onPress={() => {
                onClose();
                navigation.navigate("TotalSongs");
              }}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: 10,
    width: "90%",
    height: "40%",
    alignSelf: "center",
    backgroundColor: "#000000",
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0)",
    elevation: 4,
  },
  flag: {
    width: 20,
    height: 20,
    marginLeft: 5,
    borderRadius: 100,
  },
});

export default SongPlayer;


