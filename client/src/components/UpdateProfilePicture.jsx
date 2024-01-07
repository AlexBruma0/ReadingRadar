import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfilePicture } from '../redux/slices/UsersSlice';
import { SpinnerCircular } from 'spinners-react';

function UpdateProfilePicture({ userId }) {
    const fileInput = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];
        if (!file) return;
        setLoading(true);
        await dispatch(updateUserProfilePicture({ userId, profilePicture: file }));
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="font-bold my-4 text-3xl mb-4">Change Profile Picture</div>
            <div className='mt-4'>
            <input
                type="file"
                id="profilePicture"
                ref={fileInput}
                accept="image/*"
                className="mb-4"
            />
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded w-44">
                {loading ? (
                    <SpinnerCircular />
                ) : 'Update Profile Picture'}
            </button>
        </form>
    );
}

export default UpdateProfilePicture;