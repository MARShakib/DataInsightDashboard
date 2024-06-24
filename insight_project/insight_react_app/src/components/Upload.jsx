import React, { useState } from "react";


export default function Upload({ handleSubmit }) {
    const [file, setFile] = useState(null);

    function handleChange(e) {
        setFile(e.target.files[0])
    }
    function onSubmit(e) {
        e.preventDefault();
        handleSubmit(file);
    }

    return (
        <div className="upload_container">
            <h1>Upload Csv file</h1>
            <form onSubmit={onSubmit}>
                <hr />
                <input className="form-control form-control-lg" id="formFileLg"
                    type="file" onChange={handleChange} required name="data" />
                <hr />
                <div className="uploadBtn">
                    <button type="submit" className="btn btn-primary btn-lg">Upload</button>
                </div>
            </form>
        </div>
    );
};