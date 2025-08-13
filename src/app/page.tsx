'use client';

import { useState, useEffect } from 'react';

interface Song {
  "Artist(s)": string;
  song: string;
  text: string;
  Length: string;
  emotion: string;
  Genre: string;
  Album: string;
  "Release Date": string | null;
  Key: string;
  Tempo: number;
  "Loudness (db)": number;
  "Time signature": string;
  Explicit: string;
  Popularity: string;
  Energy: string;
  Danceability: string;
  Positiveness: string;
  Speechiness: string;
  Liveness: string;
  Acousticness: string;
  Instrumentalness: string;
  "Good for Party": number;
  "Good for Work/Study": number;
  "Good for Relaxation/Meditation": number;
  "Good for Exercise": number;
  "Good for Running": number;
  "Good for Yoga/Stretching": number;
  "Good for Driving": number;
  "Good for Social Gatherings": number;
  "Good for Morning Routine": number;
  "Similar Songs": Array<{
    [key: string]: string | number;
  }>;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetch('/spotify-sample.json')
      .then(response => response.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const parsedSongs = lines.map(line => JSON.parse(line));
        setSongs(parsedSongs);
      });
  }, []);

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const getUsageContexts = (song: Song) => {
    const contexts = [
      { key: 'Good for Party', label: 'Party' },
      { key: 'Good for Work/Study', label: 'Work/Study' },
      { key: 'Good for Relaxation/Meditation', label: 'Relaxation' },
      { key: 'Good for Exercise', label: 'Exercise' },
      { key: 'Good for Running', label: 'Running' },
      { key: 'Good for Yoga/Stretching', label: 'Yoga' },
      { key: 'Good for Driving', label: 'Driving' },
      { key: 'Good for Social Gatherings', label: 'Social' },
      { key: 'Good for Morning Routine', label: 'Morning' }
    ];
    return contexts.filter(context => song[context.key as keyof Song] === 1);
  };

  const exportData = async () => {
    setIsExporting(true);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const extractedData: any[] = [];
    
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      
      const songData: any = {};
      
      songData['Artist'] = '';
      songData['Song'] = '';
      songData['Album'] = '';
      songData['Genre'] = '';
      songData['Length'] = '';
      songData['Emotion'] = '';
      songData['Popularity'] = '';
      songData['Release Date'] = '';
      songData['Key'] = '';
      songData['Tempo'] = '';
      songData['Energy'] = '';
      songData['Danceability'] = '';
      songData['Positiveness'] = '';
      songData['Liveness'] = '';
      songData['Acousticness'] = '';
      songData['Speechiness'] = '';
      songData['Loudness'] = '';
      songData['Time Signature'] = '';
      songData['Explicit'] = '';
      songData['Instrumentalness'] = '';
      songData['Lyrics'] = '';
      songData['Good for Party'] = '';
      songData['Good for Work/Study'] = '';
      songData['Good for Relaxation/Meditation'] = '';
      songData['Good for Exercise'] = '';
      songData['Good for Running'] = '';
      songData['Good for Yoga/Stretching'] = '';
      songData['Good for Driving'] = '';
      songData['Good for Social Gatherings'] = '';
      songData['Good for Morning Routine'] = '';
      songData['Similar Songs'] = '';
      
      for (let j = 0; j < 50; j++) {
        songData['Artist'] = song['Artist(s)'];
        songData['Song'] = song.song;
        songData['Album'] = song.Album;
        songData['Genre'] = song.Genre;
        songData['Length'] = song.Length;
        songData['Emotion'] = song.emotion;
        songData['Popularity'] = song.Popularity;
        songData['Release Date'] = song['Release Date'] || 'N/A';
        songData['Key'] = song.Key;
        songData['Tempo'] = song.Tempo.toString();
        songData['Energy'] = song.Energy + '%';
        songData['Danceability'] = song.Danceability + '%';
        songData['Positiveness'] = song.Positiveness + '%';
        songData['Liveness'] = song.Liveness + '%';
        songData['Acousticness'] = song.Acousticness + '%';
        songData['Speechiness'] = song.Speechiness + '%';
        songData['Loudness'] = song['Loudness (db)'].toString() + ' dB';
        songData['Time Signature'] = song['Time signature'];
        songData['Explicit'] = song.Explicit;
        songData['Instrumentalness'] = song.Instrumentalness + '%';
        songData['Lyrics'] = song.text.substring(0, 100) + '...';
        songData['Good for Party'] = song['Good for Party'].toString();
        songData['Good for Work/Study'] = song['Good for Work/Study'].toString();
        songData['Good for Relaxation/Meditation'] = song['Good for Relaxation/Meditation'].toString();
        songData['Good for Exercise'] = song['Good for Exercise'].toString();
        songData['Good for Running'] = song['Good for Running'].toString();
        songData['Good for Yoga/Stretching'] = song['Good for Yoga/Stretching'].toString();
        songData['Good for Driving'] = song['Good for Driving'].toString();
        songData['Good for Social Gatherings'] = song['Good for Social Gatherings'].toString();
        songData['Good for Morning Routine'] = song['Good for Morning Routine'].toString();
        
        let similarSongsStr = '';
        for (let k = 0; k < song['Similar Songs'].length; k++) {
          const similar = song['Similar Songs'][k];
          const values = Object.values(similar);
          similarSongsStr += values[0] + ' - ' + values[1] + ' (' + (Number(values[2]) * 100).toFixed(1) + '%)';
          if (k < song['Similar Songs'].length - 1) similarSongsStr += '; ';
        }
        songData['Similar Songs'] = similarSongsStr;
      }
      
      extractedData.push(songData);
      
      if (i % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    const jsonString = JSON.stringify(extractedData, null, 2);
    
    let csvContent = '';
    const headers = Object.keys(extractedData[0] || {});
    
    csvContent += headers.join(',') + '\n';
    
    for (let i = 0; i < extractedData.length; i++) {
      const row = extractedData[i];
      const values: string[] = [];
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        let value = row[header] || '';
        
        for (let k = 0; k < 10; k++) {
          value = value.toString().replace(/"/g, '""');
        }
        
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = '"' + value + '"';
        }
        values.push(value);
      }
      
      csvContent += values.join(',') + '\n';
      
      if (i % 3 === 0) {
        await new Promise(resolve => setTimeout(resolve, 25));
      }
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'spotify-data-export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              🎵 Spotify Music Analytics
            </h1>
            <p className="text-xl opacity-90 mb-2">
              Comprehensive Music Data Explorer
            </p>
            <p className="text-lg opacity-75">
              Discover detailed insights, audio features, and recommendations for your favorite tracks
            </p>
            <div className="flex justify-center items-center gap-6 mt-8 text-sm opacity-80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {songs.length} Songs Loaded
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Audio Features
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                Usage Recommendations
              </span>
              <button
                onClick={exportData}
                disabled={isExporting || songs.length === 0}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isExporting ? 'Exporting...' : '📥 Export to CSV'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {songs.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                <div className="col-span-3">Artist & Song</div>
                <div className="col-span-2">Album</div>
                <div className="col-span-2">Genre</div>
                <div className="col-span-1">Length</div>
                <div className="col-span-1">Emotion</div>
                <div className="col-span-1">Popularity</div>
                <div className="col-span-1">Release Date</div>
                <div className="col-span-1">Details</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {songs.map((song, index) => (
                <div key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Main Row */}
                  <div 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => toggleRow(index)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <div className="font-medium text-gray-900">{song["Artist(s)"]}</div>
                        <div className="text-sm text-gray-600">{song.song}</div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-600 truncate">
                        {song.Album}
                      </div>
                      <div className="col-span-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {song.Genre}
                        </span>
                      </div>
                      <div className="col-span-1 text-sm text-gray-600">
                        {song.Length}
                      </div>
                      <div className="col-span-1">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          song.emotion === 'joy' ? 'bg-green-100 text-green-800' :
                          song.emotion === 'sadness' ? 'bg-blue-100 text-blue-800' :
                          song.emotion === 'anger' ? 'bg-red-100 text-red-800' :
                          song.emotion === 'fear' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {song.emotion}
                        </span>
                      </div>
                      <div className="col-span-1 text-sm text-gray-600">
                        {song.Popularity}
                      </div>
                      <div className="col-span-1 text-sm text-gray-600">
                        {song["Release Date"] || 'N/A'}
                      </div>
                      <div className="col-span-1">
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          {expandedRows.has(index) ? '▼ Hide' : '▶ Show'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Row */}
                  {expandedRows.has(index) && (
                    <div className="px-6 pb-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Lyrics */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">📝 Lyrics</h3>
                          <div className="bg-white p-4 rounded-lg border text-sm text-gray-700 max-h-64 overflow-y-auto">
                            {song.text.split('\n').map((line, lineIndex) => (
                              <p key={lineIndex} className="mb-1">{line}</p>
                            ))}
                          </div>
                        </div>

                        {/* Audio Features */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">🎵 Audio Features</h3>
                          <div className="bg-white p-4 rounded-lg border">
                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                              <div><span className="font-medium text-gray-900">Key:</span> {song.Key}</div>
                              <div><span className="font-medium text-gray-900">Tempo:</span> {song.Tempo.toFixed(3)}</div>
                              <div><span className="font-medium text-gray-900">Energy:</span> {song.Energy}%</div>
                              <div><span className="font-medium text-gray-900">Danceability:</span> {song.Danceability}%</div>
                              <div><span className="font-medium text-gray-900">Positiveness:</span> {song.Positiveness}%</div>
                              <div><span className="font-medium text-gray-900">Liveness:</span> {song.Liveness}%</div>
                              <div><span className="font-medium text-gray-900">Acousticness:</span> {song.Acousticness}%</div>
                              <div><span className="font-medium text-gray-900">Speechiness:</span> {song.Speechiness}%</div>
                              <div><span className="font-medium text-gray-900">Loudness:</span> {song["Loudness (db)"].toFixed(2)} dB</div>
                              <div><span className="font-medium text-gray-900">Time Sig:</span> {song["Time signature"]}</div>
                              <div><span className="font-medium text-gray-900">Explicit:</span> {song.Explicit}</div>
                              <div><span className="font-medium text-gray-900">Instrumental:</span> {song.Instrumentalness}%</div>
                            </div>
                          </div>
                        </div>

                        {/* Usage Context */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">🎯 Good For</h3>
                          <div className="bg-white p-4 rounded-lg border">
                            <div className="flex flex-wrap gap-2">
                              {getUsageContexts(song).map((context) => (
                                <span key={context.key} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                                  {context.label}
                                </span>
                              ))}
                              {getUsageContexts(song).length === 0 && (
                                <span className="text-gray-500 text-sm">No specific recommendations</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Similar Songs */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">🔗 Similar Songs</h3>
                          <div className="bg-white p-4 rounded-lg border">
                            <div className="space-y-2">
                              {song["Similar Songs"].map((similar, simIndex) => (
                                <div key={simIndex} className="flex justify-between items-center text-sm">
                                  <div>
                                    <div className="font-medium">{Object.values(similar)[0]}</div>
                                    <div className="text-gray-600">{Object.values(similar)[1]}</div>
                                  </div>
                                  <div className="text-purple-600 font-medium">
                                    {(Number(Object.values(similar)[2]) * 100).toFixed(1)}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
