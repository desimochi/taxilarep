import { del } from "@vercel/blob";
export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const fileUrl = searchParams.get("fileId");
  
      if (!fileUrl) {
        return new Response(JSON.stringify({ error: "File URL is required" }), {
          status: 400,
        });
      }
  
      await del(fileUrl); // ✅ Use fileUrl instead of fileId
  
      return new Response(
        JSON.stringify({ message: "File deleted successfully" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete file" }),
        { status: 500 }
      );
    }
  }