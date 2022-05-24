import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    const storage = getStorage(); //the storage itself
    const imageName = uuidv4();
    const ref_con = ref(storage, `${imageName}.jpg`); //how image will be addressed inside storage
    //convert images to bytes
    const img = await fetch(result.uri);

    const bytes = await img.blob();

    await uploadBytes(ref_con, bytes); //upload image
  }
};
