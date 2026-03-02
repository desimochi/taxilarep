"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Loader2, ThumbsUp, Share2, Download, MoreHorizontal, Clock, User } from "lucide-react";

export default function VideoPlayerScreen() {
  const { id } = useParams();
  const router = useRouter();
  const [mainVideo, setMainVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mappingSubject, setMappingSubject] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await authFetch(`epgdm-video-assignment-viewset/${id}`);
        if (!res.ok) throw new Error("Failed to fetch video details");
        const data = await res.json();
        setMainVideo(data.data);
        setMappingSubject(data.data.mapping_subject);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    if (!mappingSubject) return;
    const fetchRelated = async () => {
      try {
        const res = await authFetch(`video-assignment-subject-wise/${mappingSubject}`);
        if (!res.ok) throw new Error("Failed to fetch related videos");
        const data = await res.json();
        setRelatedVideos(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();
  }, [mappingSubject]);

  if (loading || !mainVideo)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );

  const extractYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const mainVideoID = extractYouTubeID(mainVideo.video_link);

  const handleVideoClick = (videoId) => {
    router.push(`/epgdm/subjects/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-6 py-12 px-12">
        {/* Main Content Area */}
        <div className="flex-1 max-w-[1280px]">
          {/* Video Player */}
          <h2 className="text-2xl font-semibold text-gray-900 leading-tight mb-3">
              {mainVideo.lecturer_name}
            </h2>
          <div className="w-full bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {mainVideoID ? (
              <iframe
                src={`https://www.youtube.com/embed/${mainVideoID}`}
                title={mainVideo.lecturer_name}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Invalid YouTube Link</p>
              </div>
            )}
          </div>

          {/* Video Title */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-900 leading-tight">
              {mainVideo.lecturer_name}
            </h2>
          </div>

          {/* Video Meta & Actions */}
          <div className="flex items-center justify-between mt-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-4">
              {/* Channel Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                  L{mainVideo.lecturer_number}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    Lecturer #{mainVideo.lecturer_number}
                  </p>
                  <p className="text-xs text-gray-600">Taxila Business School</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm font-medium">Like</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          {/* Description Box */}
          <div className="mt-3 bg-gray-100 rounded-xl p-3">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-900 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(mainVideo.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <p className={`text-sm text-gray-900 whitespace-pre-line ${!showFullDescription ? 'line-clamp-2' : ''}`}>
              {mainVideo.assignment_description || "No description available."}
            </p>
            {mainVideo.assignment_description && mainVideo.assignment_description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm font-medium mt-2 text-gray-900 hover:text-gray-700"
              >
                {showFullDescription ? "Show less" : "...more"}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="lg:w-[402px] flex-shrink-0">
            <h3 className="font-bold text-xl mb-2 text-zinc-950">More Lecture</h3>
            <hr className="border border-b-2 mb-4" />
          <div className="space-y-2">
            {relatedVideos.length > 0 ? (
              relatedVideos.map((video) => {
                const isActive = video.id === mainVideo.id;
                const thumbnailID = extractYouTubeID(video.video_link);
                
                return (
                  <div
                    key={video.id}
                    onClick={() => !isActive && handleVideoClick(video.id)}
                    className={`flex gap-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2 transition-colors ${
                      isActive ? 'bg-gray-100' : ''
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-40 flex-shrink-0 aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      {thumbnailID ? (
                        <img
                          src={`https://img.youtube.com/vi/${thumbnailID}/mqdefault.jpg`}
                          alt={video.lecturer_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <span className="text-white text-xs">No Preview</span>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight mb-1">
                        {video.lecturer_name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-0.5">
                        Lecturer #{video.lecturer_number}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(video.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No related videos found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}