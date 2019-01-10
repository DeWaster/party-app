ffmpeg -i inputfile.mp4 -vf "select=eq(n\,0)" -q:v 3 output_image.jpg
