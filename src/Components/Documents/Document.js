import React, { useState } from 'react';
import './Document.css';
import { gapi } from 'gapi-script';

function Document({ documents = [], signedInUser, onSignOut }) {
  const [webViewLink, setWebViewLink] = useState('');
  const [viewDocument, setViewDocument] = useState(false);

  async function getViewLink(file_id) {
    const viewLink = await gapi.client.drive.files
      .get({
        fileId: file_id,
        fields: 'webViewLink',
      })
      .then((response) => response.result.webViewLink);
    setWebViewLink(viewLink);
    setViewDocument(true);
  }

  return (
    <>
      <div className="container">
        {/* left sidebar */}
        <div className="sidebar">
          <div className="sidebar-head">
            <p>Documents</p>
            <div
              className="signout"
              onClick={() => {
                onSignOut();
              }}
            >
              <p>Sign Out</p>
            </div>
          </div>
          {documents.map((document, index) => (
            <div className="index">
              <img src="doc_icon.png" alt="doc" width="20" height="20" className="img" />
              <li
                key={index}
                onClick={() => {
                  getViewLink(document.id);
                }}
              >
                {document.name}
              </li>
            </div>
          ))}
        </div>

        {/* right notepad */}
        <div className="right-part">
          {viewDocument ? (
            <div className="frame">
              <iframe src={webViewLink} title="file" width="100%" height="100%" frameBorder="0"></iframe>
            </div>
          ) : (
            <div className="choosedoc">
              <p>Choose a Document.....</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Document;
