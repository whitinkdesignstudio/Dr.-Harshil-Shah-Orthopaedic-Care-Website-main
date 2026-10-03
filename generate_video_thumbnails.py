import os
import cv2
from PIL import Image

def generate_video_thumbnails():
    video_dir = os.path.join("public", "galleri", "opreation")
    thumb_dir = os.path.join(video_dir, "thumbnails")
    os.makedirs(thumb_dir, exist_ok=True)
    
    files = [f for f in os.listdir(video_dir) if f.lower().endswith(('.mov', '.mp4'))]
    print(f"Found {len(files)} video files.")
    
    for f in sorted(files):
        video_path = os.path.join(video_dir, f)
        base_name = os.path.splitext(f)[0]
        thumb_path = os.path.join(thumb_dir, f"{base_name}.webp")
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            print(f"Could not open video: {f}")
            continue
            
        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 100
        
        # Capture frame at ~1.5s or 20% into the video
        target_frame = int(min(fps * 1.5, frame_count * 0.2))
        cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
        
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            success, frame = cap.read()
            
        if success:
            # Convert BGR to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb_frame)
            
            # Resize if very large (e.g. 4K -> max width 720px for super fast loading)
            w, h = pil_img.size
            if w > 720:
                new_h = int(h * (720 / w))
                pil_img = pil_img.resize((720, new_h), Image.Resampling.LANCZOS)
                
            pil_img.save(thumb_path, "WEBP", quality=82, method=6)
            size_kb = os.path.getsize(thumb_path) / 1024
            print(f"Generated {thumb_path} ({size_kb:.1f} KB)")
        else:
            print(f"Failed to read frame from {f}")
            
        cap.release()
        
    print("All thumbnails generated successfully!")

if __name__ == "__main__":
    generate_video_thumbnails()
