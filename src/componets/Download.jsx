import React from 'react';
import Maincontainer from './Maincontainer';

const dummyDownloads = [
  { id: 1, name: 'Document1.pdf', size: '2.3 MB' },
  { id: 2, name: 'PhotoArchive.zip', size: '15.7 MB' },
  { id: 3, name: 'Presentation.pptx', size: '4.1 MB' },
  { id: 4, name: 'MusicTrack.mp3', size: '8.6 MB' },
    { id: 1, name: 'Document1.pdf', size: '2.3 MB' },
  { id: 2, name: 'PhotoArchive.zip', size: '15.7 MB' },
  { id: 3, name: 'Presentation.pptx', size: '4.1 MB' },
  { id: 4, name: 'MusicTrack.mp3', size: '8.6 MB' },
    { id: 1, name: 'Document1.pdf', size: '2.3 MB' },
  { id: 2, name: 'PhotoArchive.zip', size: '15.7 MB' },
  { id: 3, name: 'Presentation.pptx', size: '4.1 MB' },
  { id: 4, name: 'MusicTrack.mp3', size: '8.6 MB' },
];

const Download = () => {
  return (
    <Maincontainer>
      <h1 className="text-2xl font-bold mb-4">Download Section</h1>
      <div className="space-y-4">
        {dummyDownloads.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 border rounded shadow-sm"
          >
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{file.size}</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Download
            </button>
          </div>
        ))}
      </div>
    </Maincontainer>
  );
};

export default Download;
