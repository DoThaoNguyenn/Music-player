const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query: string) => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    console.log("data youtube api",data);
    return data.items?.map((item: any) => ({
      id: item.id.videoId,
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
      albumArt: item.snippet.thumbnails.high.url,
      duration: 0,
      uri: `https://www.youtube.com/watch?v=${item.id.videoId}`
    })) || [];
  } catch (error) {
    console.error('YouTube search failed:', error);
    return [];
  }
};

export const getVideoDetails = async (videoId: string) => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    const video = data.items?.[0];
    if (!video) return null;

    return {
      id: video.id,
      name: video.snippet.title,
      artist: video.snippet.channelTitle,
      albumArt: video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration,
      uri: `https://www.youtube.com/watch?v=${video.id}`
    };
  } catch (error) {
    console.error('Failed to get video details:', error);
    return null;
  }
}; 