import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
      });
    }

    const blob = await put(file.name, file, {
      access: 'public', // Make file publicly accessible
    });

    return new Response(
      JSON.stringify({
        fileUrl: blob.url,
        fileId: blob.url.split('/').pop(),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to upload file' }),
      { status: 500 }
    );
  }
}







