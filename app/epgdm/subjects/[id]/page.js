"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Trash2, Edit3, Play, Clock, User, MoreVertical, Eye } from "lucide-react";
import Link from "next/link";

export default function VideoAssignmentPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const subName = searchParams.get("subName");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, videoId: null, videoName: "" });
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch(`video-assignment-subject-wise/${id}`);
        const data = await res.json();
        if (res.ok && data.data) {
          setVideos(data.data);
        } else {
          setError("Failed to fetch videos");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = (videoId) => {
    router.push(`/epgdm/subjects/edit-video/${videoId}`);
    setActiveMenu(null);
  };

  const openDeleteModal = (videoId, videoName) => {
    setDeleteModal({ show: true, videoId, videoName });
    setActiveMenu(null);
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, videoId: null, videoName: "" });
  };

  const confirmDelete = async () => {
    const videoId = deleteModal.videoId;
    try {
      const res = await authFetch(`epgdm-video-assignment-viewset/${videoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVideos(videos.filter((v) => v.id !== videoId));
        closeDeleteModal();
      } else {
        alert("Failed to delete video");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting video");
    }
  };

  const toggleMenu = (videoId) => {
    setActiveMenu(activeMenu === videoId ? null : videoId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* YouTube-style Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">{subName}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <span>{videos.length} videos</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {videos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📹</div>
            <p className="text-gray-600 text-lg">No videos available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onMouseLeave={() => setActiveMenu(null)}
              >
                {/* Thumbnail Container */}
                <div className="relative mb-3">
                  <Link href={`/epgdm/subjects/video/${video.id}`}>
                    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={video.video_link.replace("watch?v=", "embed/")}
                        title={video.lecturer_name}
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      ></iframe>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
                    </div>
                  </Link>
                </div>

                {/* Video Info */}
                <div className="flex gap-3">
                  {/* Channel Icon Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm">
                      L{video.lecturer_number}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/epgdm/subjects/video/${video.id}`}>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-gray-700">
                        {video.lecturer_name}
                      </h3>
                    </Link>
                    
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>Lecturer #{video.lecturer_number}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(video.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => toggleMenu(video.id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === video.id && (
                      <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 z-50">
                        <button
                          onClick={() => handleEdit(video.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit video
                        </button>
                        <button
                          onClick={() => openDeleteModal(video.id, video.lecturer_name)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-3"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete video
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete video?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteModal.videoName}"? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}