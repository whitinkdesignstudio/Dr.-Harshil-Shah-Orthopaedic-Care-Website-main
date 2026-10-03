import os
import subprocess
import imageio_ffmpeg

def convert_all_videos_to_mp4():
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    video_dir = os.path.join("public", "galleri", "opreation")
    
    files = [f for f in os.listdir(video_dir) if f.lower().endswith('.mov')]
    print(f"Found {len(files)} MOV files to convert in {video_dir}...")
    
    for f in sorted(files):
        src_path = os.path.join(video_dir, f)
        base_name = os.path.splitext(f)[0]
        dst_path = os.path.join(video_dir, f"{base_name}.MP4")
        
        print(f"\n--- Converting {f} -> {base_name}.MP4 ---")
        
        # FFmpeg command: H.264 video, AAC audio, faststart for instant web streaming
        cmd = [
            ffmpeg_exe,
            "-y",
            "-i", src_path,
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", "23",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            dst_path
        ]
        
        try:
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            orig_size = os.path.getsize(src_path) / (1024 * 1024)
            new_size = os.path.getsize(dst_path) / (1024 * 1024)
            print(f"Success: {base_name}.MP4 ({new_size:.2f} MB, was {orig_size:.2f} MB)")
        except subprocess.CalledProcessError as e:
            print(f"Error converting {f}: {e.stderr.decode('utf-8', errors='ignore')}")

    print("\nAll MOV conversions completed successfully!")

if __name__ == "__main__":
    convert_all_videos_to_mp4()
