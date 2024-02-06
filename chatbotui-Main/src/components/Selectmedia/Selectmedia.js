import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Selectmedia(props) {
  const { selectMedia } = props;
  const [showMedia, setShowMedia] = useState('uploadfile');

  const handleUploadFile = (data) => {
    setShowMedia(data);
  };
  const handleAddUrl = (data) => {
    setShowMedia(data);
  };

  const handleGiphy = (data) => {
    setShowMedia(data);
  };

  const handleAddVideo = (data) => {
    setShowMedia(data);
  };
  return (
    <>
      <div className='select-media-main-container'>
        <Modal show={selectMedia} onHide={props?.handleSelectmedia} className='select-media-container'>
          <Modal.Header closeButton>
            <Modal.Title>Select media</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='select-add-media-option'>
              <div className='selectmedia-upload-flie'>
                <span name='uploadfile' onClick={() => handleUploadFile('uploadfile')}>
                  UPLOAD YOUR FILE
                </span>
              </div>
              <div className='selectmedia-url'>
                <span name='url' onClick={() => handleAddUrl('url')}>
                  FROM URL
                </span>
              </div>
              <div className='selectmedia-meme'>
                <span name='meme' onClick={() => handleGiphy('meme')}>
                  GIPHY
                </span>
              </div>
              <div className='selectmedia-video'>
                <span name='video' onClick={() => handleAddVideo('video')}>
                  VIDEO EMBED
                </span>
              </div>
            </div>
            <hr />
            {showMedia === 'uploadfile' ? (
              <div className='selectmedia-option-list'>
                <div>
                  <i className='fa fa-paperclip'></i>
                </div>
                <div className='selectmedia-uploadfile-text'>
                  <span>Upload your file</span>
                  <div className='uploadfile-text'>
                    <input type='file' id='myFile' name='filename' />
                  </div>
                </div>
              </div>
            ) : showMedia === 'url' ? (
              <div className='selectmedia-option-list'>
                <div>
                  <i className='fa fa-link'></i>
                </div>
                <div className='selectmedia-uploadfile-text'>
                  <span>Enter a URL</span>
                  <div className='uploadfile-text-input'>
                    <input type='text' id='myFile' name='filename' placeholder='https//....' />
                  </div>
                </div>
              </div>
            ) : showMedia === 'meme' ? (
              <div className='selectmedia-option-list'>
                <div>
                  <i className='fa fa-paperclip'></i>
                </div>
              </div>
            ) : (
              showMedia === 'video' && (
                <div className='selectmedia-option-list'>
                  <div>
                    <i className='fa fa-film'></i>
                  </div>
                  <div className='selectmedia-uploadfile-text'>
                    <span>Enter a valid Youtube, Vimeo or Wistia URL</span>
                    <div className='uploadfile-text-input'>
                      <input type='text' id='myFile' name='filename' placeholder='https//....' />
                    </div>
                  </div>
                </div>
              )
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={props?.handleSelectmedia}>
              Close
            </Button>
            <Button variant='primary' onClick={props?.handleSelectmedia}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Selectmedia;
