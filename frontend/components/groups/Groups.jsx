import React, { useState } from 'react';

export default function Groups() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    // Create a YouTube Data API service object
    const youtube = new window.gapi.youtube.Youtube(); // Assuming gapi object is available from the Google JavaScript Client Library

    // Authenticate with your API key (replace with your actual key)
    await youtube.getClient().then((authResult) => {
      console.log('Authenticated!');
    });

    // Construct the request body for upload
    const requestBody = {
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags: ['cs2', 'counterstrike2', 'counterstrike', 'csgo', 'highlight'],
        },
        status: {
          privacyStatus: 'unlisted', // Standardmäßig auf "unlisted" setzen
        },
      },
      mediaBody: file,
    };

    // Upload the video
    const res = await youtube.videos.insert(requestBody, {
      onUploadProgress: (event) => {
        // Handle upload progress (optional)
        const percent = (event.loaded / event.total) * 100;
        console.log(`Upload progress: ${percent}%`);
      },
    });

    setVideoId(res.result.id.videoId);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
      {videoId && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
    </div>
  );
}