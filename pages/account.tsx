import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../components/Button";
import Layout from "../components/Layout";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectProfile,
  updateFirstName,
  updateLastName,
  updateThumbnail,
} from "../store/profileSlice";

export default function Account() {
  const { firstName, lastName, profileThumbnailUri } =
    useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  const [firstNameValue, setFirstNameValue] = useState(firstName);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [capturing, setCapturing] = useState(false);

  const webcamRef = useRef<Webcam>(null);

  const updateValues = () => {
    if (firstName !== firstNameValue) {
      dispatch(updateFirstName(firstNameValue));
    }

    if (lastName !== lastNameValue) {
      dispatch(updateLastName(lastNameValue));
    }
  };

  const capture = useCallback(() => {
    if (!webcamRef.current) {
      return null;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      dispatch(updateThumbnail(imageSrc));
    }

    setCapturing(false);
  }, [webcamRef]);

  return (
    <Layout>
      <div className="flex m-12">
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
          {capturing ? (
            <Webcam
              width={200}
              height={200}
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
            />
          ) : (
            <Image
              className="rounded-full aspect-square overflow-hidden"
              width={200}
              height={200}
              alt="profile Thumbnail"
              crossOrigin="anonymous"
              src={profileThumbnailUri}
            />
          )}
          <div>
            <Button
              title={capturing ? "Capture" : "Update"}
              onClick={capturing ? capture : () => setCapturing(true)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TextInputWithLabel
            label="First Name"
            onValueChange={(text) => setFirstNameValue(text)}
            value={firstNameValue}
          />
          <TextInputWithLabel
            label="Last Name"
            onValueChange={(text) => setLastNameValue(text)}
            value={lastNameValue}
          />
          <Button title="Save Updates" onClick={updateValues} />
        </div>
      </div>
    </Layout>
  );
}
