import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Box, IconButton, Grid, Typography, Modal, Slider } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import CheckIcon from '@mui/icons-material/Check';
import Webcam from 'react-webcam';
import ReactCrop from 'react-image-crop';
import '../assets/ReactCrop.css'
const ImageUploadComponent = ({handleImageChange,image}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [crop, setCrop] = useState({ 
    unit: '%', 
    width: 80, 
    height: 80,
    x: 10,
    y: 10,
    aspect: 1 
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  
  useEffect(() => {
    if (image) {
      setSelectedImage('');  
    }
  }, [image]);  


  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const imgRef = useRef(null);
  
  // Handle the file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempImage(imageUrl);
      setIsCropOpen(true);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle camera capture (for mobile devices)
  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  // Open webcam modal
  const handleOpenWebcam = () => {
    setIsWebcamOpen(true);
  };

  // Close webcam modal
  const handleCloseWebcam = () => {
    setIsWebcamOpen(false);
  };

  // Capture photo from webcam
  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setTempImage(imageSrc);
      setIsWebcamOpen(false);
      setIsCropOpen(true);
    }
  }, [webcamRef]);

  // Handle image load for cropping
  const onImageLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // Close crop modal and discard changes
  const handleCloseCrop = () => {
    setIsCropOpen(false);
    setTempImage(null);
  };

  // Apply the crop and set the final image
  // Apply the crop and set the final image
// Apply the crop and set the final image
const applyCrop = useCallback(() => {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
      
      // Convert canvas to base64
      const base64Image = canvas.toDataURL('image/jpeg', 0.95);
      
      // Also create a blob for local display
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          setSelectedImage(croppedImageUrl);
          
          // Pass the base64 image to parent component
          handleImageChange && handleImageChange(base64Image, blob);
          
          setIsCropOpen(false);
          setTempImage(null);
        }
      }, 'image/jpeg', 0.95);
    }
  }, [completedCrop, handleImageChange]);

  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      <Grid item xs={12}>
        <Typography variant="subtitle1">Visitor Photo</Typography>
      </Grid>
      
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      
      {/* Display selected image */}
      <Grid item xs={12}>
        {selectedImage ? (
          <Box
            component="img"
            src={selectedImage}
            alt="Selected image"
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #ccc',
              mb: 2
            }}
          />
        ) : (
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              border: '1px solid #ccc'
            }}
          >
            <PhotoCamera sx={{ fontSize: 40, color: '#aaa' }} />
          </Box>
        )}
      </Grid>
      
      {/* Action buttons */}
      <Grid item container spacing={1} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleButtonClick}
          >
            Upload Photo
          </Button>
        </Grid>
        <Grid item>
          <IconButton 
            color="primary" 
            aria-label="take picture"
            onClick={handleOpenWebcam}
            sx={{ border: '1px solid', ml: 1 }}
          >
            <PhotoCamera />
          </IconButton>
        </Grid>
       
      </Grid>
      
      {/* Webcam Modal */}
      <Modal
        open={isWebcamOpen}
        onClose={handleCloseWebcam}
        aria-labelledby="webcam-modal"
        aria-describedby="take a photo using your webcam"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ alignSelf: 'flex-end', mb: 1 }}>
            <IconButton onClick={handleCloseWebcam} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 480,
              height: 480,
              facingMode: "user"
            }}
            mirrored={true}
            style={{ borderRadius: '8px' }}
          />
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={capturePhoto}
            sx={{ mt: 2 }}
          >
            Take Photo
          </Button>
        </Box>
      </Modal>

      {/* Crop Modal */}
      <Modal
        open={isCropOpen}
        onClose={handleCloseCrop}
        aria-labelledby="crop-modal"
        aria-describedby="crop your photo"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              <CropIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Crop Photo
            </Typography>
            <IconButton onClick={handleCloseCrop} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {tempImage && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img 
                src={tempImage} 
                alt="Crop preview" 
                onLoad={(e) => onImageLoad(e.currentTarget)}
                style={{ maxHeight: '60vh', maxWidth: '100%' }}
              />
            </ReactCrop>
          )}
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={8}>
              <Typography gutterBottom>Zoom</Typography>
              <Slider
                min={10}
                max={100}
                value={crop.width}
                onChange={(_, value) => setCrop({ ...crop, width: value, height: value })}
                valueLabelDisplay="auto"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={applyCrop}
                startIcon={<CheckIcon />}
              >
                Apply Crop
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ImageUploadComponent;