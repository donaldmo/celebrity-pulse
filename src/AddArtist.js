// src/AddArtist.js
import React, { useState } from "react";
import {
    db, collection, addDoc, storage, ref,
    uploadBytes, getDownloadURL
} from "./firebase";

const AddArtist = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && bio && image) {
            setUploading(true);

            try {
                const imageRef = ref(storage, `artists/${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);

                await addDoc(collection(db, "artists"), {
                    name,
                    bio,
                    image_url: imageUrl,
                    votes: 0,
                });

                setName("");
                setBio("");
                setImage(null);
            } catch (error) {
                console.error("Error adding artist: ", error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <h2>Add New Artist</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Add Artist"}
                </button>
            </form>
        </div>
    );
};

export default AddArtist;
