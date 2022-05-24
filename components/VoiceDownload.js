import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const VoiceDownload = (props) => {
  const [url, setUrl] = useState();
  const tripId = props.tripId;

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, `/audio/${tripId}/`);

      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };

    func();
  }, []);

  return <View></View>;
};

export default VoiceDownload;
