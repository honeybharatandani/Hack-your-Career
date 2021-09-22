import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCounsellorDetails,
  updateCounsellor,
} from "../actions/counsellorActions";
import { COUNSELLOR_UPDATE_RESET } from "../constants/counsellorConstants";

const CounsellorEditScreen = ({ history, match }) => {
  const counsellorId = match.params.id;

  const [name, setName] = useState("");
  const [googleMeet, setGoogleMeet] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [availability, setAvailability] = useState("");
  const [category, setCategory] = useState("");
  const [working, setWorking] = useState("");
  const [workingHrs, setWorkingHrs] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const counsellorDetails = useSelector((state) => state.counsellorDetails);
  const { loading, error, counsellor } = counsellorDetails;

  const counsellorUpdate = useSelector((state) => state.counsellorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = counsellorUpdate;

  useEffect(() => {
    if (successUpdate) {
      console.log("Success");
      dispatch({ type: COUNSELLOR_UPDATE_RESET });
      history.push("/admin/counsellorlist");
    } else {
      if (!counsellor.name || counsellor._id !== counsellorId) {
        dispatch(listCounsellorDetails(counsellorId));
      } else {
        setName(counsellor.name);
        setGoogleMeet(counsellor.googleMeet);
        setDescription(counsellor.description);
        setImage(counsellor.image);
        setAvailability(counsellor.availability);
        setCategory(counsellor.category);
        setWorking(counsellor.working);
        setWorkingHrs(counsellor.workingHrs);
      }
    }
  }, [history, dispatch, counsellorId, counsellor, successUpdate]);

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCounsellor({
        _id: counsellorId,
        name,
        googleMeet,
        description,
        image,
        availability,
        category,
        working,
        workingHrs,
      }),
    );
  };
  return (
    <>
      <Link to="/admin/counsellorlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Counsellor</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="googleMeet">
              <Form.Label>Google Meet url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Google Meet Url"
                value={googleMeet}
                onChange={(e) => setGoogleMeet(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="About the Counsellor"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                value={availability}
                required
                onChange={(e) => setAvailability(e.target.value)}>
                <option value="0">Select...</option>
                <option value="available">available</option>
                <option value="unavailable">unavailable</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}>
                <option value="0">Select...</option>
                <option value="Marriage and family counsellor">
                  Marriage and family counsellor
                </option>
                <option value="Guidance and career counsellor">
                  Guidance and career counsellor
                </option>
                <option value="Rehabilitation counsellor">
                  Rehabilitation counsellor
                </option>
                <option value="Mental health counsellor">
                  Mental health counsellor
                </option>
                <option value="Substance abuse counsellor">
                  Substance abuse counsellor
                </option>
                <option value="Educational Counsellor">
                  Educational Counsellor
                </option>
                <option value="Child development counsellor">
                  Child development counsellor
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="working">
              <Form.Label>Working Days</Form.Label>
              <Form.Control
                type="text"
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                value={working}
                required
                onChange={(e) => setWorking(e.target.value)}>
                <option value="0">Select...</option>
                <option value="Monday to Friday">Monday to Friday</option>
                <option value="Monday to Wednesday">Monday to Wednesday</option>
                <option value="Wednesday to Friday">Wednesday to Friday</option>
                <option value="Wednesday to Sunday">Wednesday to Sunday</option>
                <option value="Saturday and Sunday">Saturday and Sunday</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="workingHrs">
              <Form.Label>Working Hours</Form.Label>
              <Form.Control
                type="text"
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                value={workingHrs}
                required
                onChange={(e) => setWorkingHrs(e.target.value)}>
                <option value="0">Select...</option>
                <option value="12:00 PM -- 06:00 PM">
                  12:00 PM -- 06:00 PM
                </option>
                <option value="10:30 AM -- 04:00 PM">
                  10:30 AM -- 04:00 PM
                </option>
                <option value="10:30 AM -- 02:00 PM">
                  10:30 AM -- 02:00 PM
                </option>
                <option value="10:00 AM -- 12:00 PM">
                  10:00 AM -- 12:00 PM
                </option>
                <option value="06:30 PM -- 01:00 AM">
                  06:30 AM -- 01:00 AM
                </option>
                <option value="09:30 PM -- 05:00 AM">
                  09:30 PM -- 05:00 AM
                </option>
                <option value="09:30 PM -- 11:00 PM">
                  09:30 PM -- 11:00 PM
                </option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CounsellorEditScreen;
