import {  useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiVideoOn } from "react-icons/ci";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../server/axiosConnect";
import { uploadFileDirectly } from "../server/cloudinaryConnect";
import toast from "react-hot-toast";
import { FaAngry } from "react-icons/fa";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import { IoMdHappy } from "react-icons/io";
import { ImHappy2 } from "react-icons/im";
interface VideoReviewProps {
  videoPopup: boolean; 
  setVideoPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setthankpopup: React.Dispatch<React.SetStateAction<boolean>> // Setter function for the state
  setloading:React.Dispatch<React.SetStateAction<boolean>>;
}
const FinalVideo:React.FC<VideoReviewProps>=({setVideoPopup,setthankpopup,setloading})  => {
     const [track,settrack]=useState<String[]>(["",""])
     const [noscreen,setScreen]=useState<Boolean>(true)
     const [videoBlob, setVideoBlob] = useState<Blob | null>(null); 
     const videoRef = useRef<HTMLVideoElement>(null);
     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
     const streamRef = useRef<MediaStream | null>(null);
     const [recording,setrecording]=useState(false);
     const [download,setDownload]=useState(true);
     const [custName,setcustName]=useState("");
     const [custEmail,setcustEmail]=useState("")
     const [reviewVideo,setreviewVideo]=useState("");
     const location = useLocation();
     const url = location.pathname;
     const total = url.split("/");
     const id = Number(total[2]);
    const handleUplaodChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
        if(file){
        uploadFileDirectly(file).then((result)=>{
        console.log(result?.data.secure_url)
        setreviewVideo(result?.data.secure_url)
      })
      }
    };
    const startVideo = async () => {
        setScreen(false)
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          streamRef.current = stream;
          const tracks:any=streamRef.current.getTracks()
          settrack([tracks[0].label,tracks[1].label])
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.muted = true; 
            videoRef.current.play();
          }
        } catch (err) {
          console.error("Error accessing user media:", err);
        }
    };
    const startRecording = () => {
        if (!streamRef.current) return;

        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;
    
        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };
        setrecording(true)
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/mp4" });
          setVideoBlob(blob);
          // const url = URL.createObjectURL(blob);
          // setreviewVideo(url)
          // Play the recorded video
          if (videoRef.current) {
            const url = URL.createObjectURL(blob);
            videoRef.current.srcObject = null; // Detach live stream
            videoRef.current.src = url;
            videoRef.current.controls = true; // Show controls for playback
            videoRef.current.play();
          }
        };
        mediaRecorder.start();
    };    
    const stopRecording = () => {
        setDownload(false)
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
    };
    const downloadVideo = () => {
        if (!videoBlob) return;
        const url = URL.createObjectURL(videoBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.mp4";
        a.click();
        URL.revokeObjectURL(url);
    };
    function blobToBase64(blob:any){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Reads the Blob and encodes as Base64
      });
    }
    const convertinstring=async()=>{
       const base64String=await blobToBase64(videoBlob);
       const CLOUD_NAME = "dcsn0xcuj";
       const UPLOAD_PRESET = "Testimonial_Preset";
       const formData = new FormData();
      // @ts-ignore
       formData.append("file",base64String);
       formData.append("upload_preset", UPLOAD_PRESET);
       const toastId=toast.loading("Loading...")
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData
        );
        console.log(response)
        setreviewVideo(response.data.secure_url);
        toast.dismiss(toastId)
        return response.data.secure_url
      } catch (error) {
        console.error("Upload failed:", error);
      }
      return "";
      // // @ts-ignore  
      //  setreviewVideo(base64String)
    }
    const [rating, setRating] = useState(0);
    const sendHandler=async()=>{
      let videourl:string="";
      if(videoBlob!=null){
        videourl = await convertinstring();
      }
      else{
        videourl=reviewVideo
      }
      console.log(videourl)
      console.log(rating)
       try{
          setloading(true)
          await axios({
            url:`${BACKEND_URL}/nonuser/create-video-review`,
            method:"POST",
            data:{
              id:id,
              custName,
              custEmail,
              reviewVideo:videourl,
              rating:rating
            }
          }).then((result)=>{
            console.log(result)
            setVideoPopup(false)
            setthankpopup(true)
            setloading(false)
          })
        }catch(e){
          console.log(e);
        }
    }
  return (
    <div className="w-full h-screen absolute left-0 top-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className=" w-[90%] md:w-[70%] lg:w-[40%] flex flex-col items-center relative h-[90vh] p-3 overflow-y-scroll scrollbar overflow-x-hidden inset-0 rounded-md bg-[#F9FAFB] shadow-lg">  
        <div onClick={() => { setVideoPopup(false) }} className="absolute right-3 top-3 flex items-center justify-center rounded-md bg-[#E5E7EB] cursor-pointer hover:bg-[#D1D5DB] w-[30px] h-[30px]">
            <RxCross2 />
        </div>

        {noscreen ? (
            <>
                <button onClick={startVideo} className="px-6 mt-10 w-full py-3 bg-[#4d84cb] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a548b] transition duration-300">
                    Record a Video
                </button>
                <div className="text-[24px] flex items-center justify-center font-semibold mt-3">or</div>
                <div className="flex w-full items-start flex-col">
                    <label className="text-[18px] font-semibold">Attach a video file</label>
                    <div className="mt-2 flex items-center gap-x-6">
                        <div className="rounded-lg gap-x-10">
                            {reviewVideo && <video src={reviewVideo} autoPlay className="w-[300px] h-[200px] rounded-lg" />}
                        </div>
                        <input onChange={handleUplaodChange} id="image-file" type="file" />
                    </div>
                </div>
            </>
        ) : (
            <div className="flex flex-col w-full items-center">
                <div className="w-[40px] mt-3 h-[40px] rounded-full flex items-center justify-center bg-[#E5E7EB]">
                    <CiVideoOn />
                </div>
                <div className="text-[21px] text-center text-black font-semibold">
                    Check Your Camera and Microphone
                </div>
                <div className="text-[18px] text-center text-[#1e1f1f] mt-4">
                    You have up to 120 seconds to record your video. Don’t worry: You can review your video before submitting it, and you can re-record if needed.
                </div>
                <video ref={videoRef} autoPlay muted className="w-[400px] h-[300px] mx-auto border rounded-lg mt-3 shadow-md mb-4" />
                <div className="flex flex-row justify-around mt-8 w-full gap-4">
                    {recording ? (
                        download ? (
                            <button onClick={stopRecording} className="px-6 w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                                Stop Recording
                            </button>
                        ) : (
                            <button onClick={downloadVideo} className="px-6 py-3 w-full bg-[#5db94a] text-white font-semibold rounded-lg shadow-md hover:bg-[#47a441] transition duration-300">
                                Download video
                            </button>
                        )
                    ) : (
                        <button onClick={startRecording} className="px-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Start Recording
                        </button>
                    )}
                </div>
                <div className="w-full flex-col items-center mt-4">
                    <label className="text-[18px] text-black font-semibold mt-2">Camera</label>
                    <div className="w-full h-[40px] mt-2 border-[1px] rounded-lg border-[#a2a3a4] py-2 px-3 text-start">
                        {track[0]}
                    </div>
                </div>
                <div className="w-full flex-col items-start mt-4">
                    <label className="text-[18px] text-black font-semibold">Microphone</label>
                    <div className="w-full h-[40px] mt-2 border-[1px] rounded-lg border-[#a2a3a4] py-2 px-3 text-start">
                        {track[1]}
                    </div>
                </div>
            </div>
        )}
        
        <form>
            <div className="flex flex-row items-center mx-auto text-[18px] font-semibold mt-8 mb-5 gap-x-5">
                <div className={`flex flex-col items-center text-[18px] text-[#3a3b3c] ${rating === 1 && "text-[#ff4]"}`} onClick={() => { setRating(1) }}>
                    <FaAngry />
                    Angry
                </div>
                <div className={`flex flex-col items-center text-[18px] text-[#3a3b3c] ${rating === 2 && "text-[#ff4]"}`} onClick={() => { setRating(2) }}>
                    <RiEmotionUnhappyLine />
                    Sad
                </div>
                <div className={`flex flex-col items-center text-[18px] text-[#3a3b3c] ${rating === 3 && "text-[#ff4]"}`} onClick={() => { setRating(3) }}>
                    <IoMdSad />
                    Happy
                </div>
                <div className={`flex flex-col items-center text-[18px] text-[#3a3b3c] ${rating === 4 && "text-[#ff4]"}`} onClick={() => { setRating(4) }}>
                    <IoMdHappy />
                    Amazing
                </div>
                <div className={`flex flex-col items-center text-[18px] text-[#3a3b3c] ${rating === 5 && "text-[#ff4]"}`} onClick={() => { setRating(5) }}>
                    <ImHappy2 />
                    Excellent
                </div>
            </div>
            <div className="flex mt-6 flex-col text-[#3a3b3c] w-full justify-center">
                <label htmlFor="nameSender">Your Name *</label>
                <input value={custName} onChange={(e) => { setcustName(e.target.value) }} required type="text" id="nameSender" className="outline-none focus:border-[#2563EB] focus:border-[2px] p-2 rounded-md mt-3 border-[1px] border-[#a2a3a4]" />
            </div>
            <div className="flex mt-6 flex-col text-[#3a3b3c] w-full justify-center">
                <label htmlFor="senderEmail" className="text-[#3a3b3c]">Your Email *</label>
                <input value={custEmail} onChange={(e) => { setcustEmail(e.target.value) }} required type="email" id="senderEmail" className="outline-none focus:border-[#2563EB] focus:border-[2px] p-2 rounded-md mt-3 border-[1px] border-[#a2a3a4]" />
            </div>
            <div className="flex w-full items-center gap-x-6 my-4 text-[18px] text-[#313131]">
                <input type="checkbox" />
                <p>I give permission to use this testimonial across social channels and other marketing efforts</p>
            </div>
        </form>

        <div onClick={sendHandler} className="w-full text-[18px] font-semibold flex items-center justify-center py-2 bg-[#5D5DFF] rounded-lg mt-10 hover:bg-[#4a4adc] transition duration-300">
            Send
        </div>
    </div>
</div>

  )
}

export default FinalVideo
