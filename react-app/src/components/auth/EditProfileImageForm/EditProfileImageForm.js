import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../SignUpForm/SignUpForm.css';
import './EditProfileImageForm.css';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';


const EditProfileImageForm = ({closeModalSignUp}) => {
  
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const userId = useSelector((state) => state.session.user.id)

  const onSignUp = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    
    const formData2 = new FormData();
    formData2.append('id', userId);
    formData2.append('image', image);
    console.log(formData2);
  
    await dispatch(
      sessionActions.updateExistingUser(
        formData2
      )
    );

    setImageLoading(false);
    closeModalSignUp();    
  };

  const updateImage = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setImage(file);
    };


  return (
      <div className="SignUpModalWrapper">
        <div className="SignUpModalContainer">
          <div className="SignUpModalFormTitleContainer">
            <div className="UpdateModalFormTitle">Update Profile Image</div>
          </div>
          <form onSubmit={onSignUp}>
            
            <div className="SignUpModalInputContainer">
              <label htmlFor="image">Upload Image</label>
              <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={updateImage}
              />
              {imageLoading && <p>Loading...</p>}
          </div>
            <div className="UpdateModalButtonContainer">
              <button className="UpdateModalSubmit" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
  );

};

export default EditProfileImageForm;
