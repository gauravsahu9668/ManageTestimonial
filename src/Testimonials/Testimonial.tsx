import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx"
import axios from "axios";
import { BACKEND_URL } from "../server/axiosConnect";
import FinalVideo from "./FinalVideo";
import { uploadFileDirectly } from "../server/cloudinaryConnect";
import toast from "react-hot-toast";
import { FaAngry } from "react-icons/fa";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import { IoMdHappy } from "react-icons/io";
import { ImHappy2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
// import { mailSender } from "../../server/mailSender";
const Testimonial:React.FC = () => {
  // const location = useLocation();
  // const url = location.pathname;
  // const total = url.split("/");
  const { id }=useParams()
  const [rating, setRating] = useState(0);

  // const handleRatingChange=(newRating:number) => {
  //   setRating(newRating);
  //   console.log(`Selected Rating: ${newRating}`);
  // };
  const [space, setSpaceDetails] = useState<any>(null); // Initialize as `null`
  const [loading, setLoading] = useState(false);
  const [textpopup,settextpopup]=useState(false);
  const [videopopup,setvideopopup]=useState<boolean>(false)
  const [imageString,setImageString]=useState("");
  const [profileImage,setprofileImage]=useState("");
  const [custMessage,setcustMessage]=useState("");
  const [custName,setcustName]=useState("");
  const [custEmail,setcustEmail]=useState("")
  const [thankPopUp,setthankPopUp]=useState(false);
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
              console.log(file)
              if(file){
                uploadFileDirectly(file).then((result)=>{
                  setImageString(result?.data.secure_url)
                })
      }
      };
      const handleUplaodChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
              if(file){
                uploadFileDirectly(file).then((result)=>{
                  setprofileImage(result?.data.secure_url)
                })
      }
      };
      const reviewSubmit = async () => {
        if(custName===""|| custMessage==="" || custEmail==="" || profileImage===""){
          toast.error("Fill all the details")
        }
        else{
          try {
            setLoading(true)
            const response = await axios({
              url: `${BACKEND_URL}/nonuser/create-text-review`,
              method: "POST",
              data: {
                id:Number(id),
                custName,
                custEmail,
                imageString,
                profileImage,
                custMessage,
                rating,
              },
            });
            console.log("Success Response:", response.data);
            setLoading(false)
            settextpopup(false)
            setthankPopUp(true)
          } catch (error:any) {
            // Catch and log error details
            console.error("Axios Error:", error.response ? error.response.data : error.message);
          }
        }
        
      };
      const getspaceDetails = async () => {
    setLoading(true)
     await axios({
        url: `${BACKEND_URL}/nonuser/getspaceDetails`,
        method: "POST",
        data: {
          spaceId: Number(id),
        },
      }).then((result)=>{
        setSpaceDetails(result.data.data)
        console.log(result.data.data)
        setLoading(false)
      })
      };
      useEffect(() => {
      getspaceDetails();
      }, []);
  return (
        <>
  {loading ? (
      <div className="w-full min-h-[100vh] flex items-center justify-center bg-[#151719]">
      {/* Loader Component */}
      <div className="h-12 w-12 border-4  border-t-[#5D5DFF] border-gray-600 rounded-full animate-spin"></div>
      </div>
      ) : (
      space && (
      thankPopUp ? 
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="w-[30%]   min-h-[60vh] absolute left-[35%] top-[10%]   border-[1px] bg-[#e9e6e666]   rounded-md">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="w-[90%] h-[210px]  mx-auto mt-10 rounded-md flex items-center justify-center">
            <img src={space.Thankyou.thankyougif} className="w-full h-full"></img>
          </div>
          <h1 className="w-full mt-4  text-center text-[40px] px-6 text-[#55595F] font-bold ">
            {
              space.Thankyou.thankyouTitle
            }
          </h1>
          <p className="w-full mt-4  text-center px-6 text-[18px] text-[#55595F]">
            {
              space.Thankyou.thankyouMessage
            }
          </p>
        </div>
    </div>
      </div> 
      :
      <div className="w-full min-h-[100vh] relative  bg-[#151719]  flex flex-col">
        <div className="hidden w-fit absolute top-2 left-2 h-[60px] pl-4 md:flex items-center justify-start bg-[#151719] text-white text-[23px] font-semibold md:text-[28px]">
          Testimonial
        </div>
        <div className="  w-[90%] min-h-screen p-3 mt-3 border-[white] rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.25)] transition-shadow duration-300 mb-5 md:w-[70%] lg:w-[50%] flex flex-col items-center mx-auto bg-[#151719]">
          <img
            src={space.spaceLogo}
            alt="Space Logo"
            className="w-full max-w-[350px] h-[200px] rounded-md object-cover"
          />
          <h1 className="text-[#D9E3EA] font-bold text-[20px] md:text-[20px] lg:text-[30px] mt-1 text-center">
            {space.headerTitle}
          </h1>
          <p className="mt-3 text-[16px] md:text-[18px] lg:text-[20px] text-start text-[#D9E3EA]">
            {space.customMessage}
          </p>
          <div className="w-full flex flex-col items-start mt-2">
            <div className="text-[#D9E3EA] m-3 text-[20px] md:text-[22px] font-bold">
              QUESTIONS
            </div>
            <div className="w-[50px] md:w-[80px] h-[5px] md:h-[8px] mt-2 bg-[#5D5DFF]"></div>
            {space.questions.map((ques: string, index: number) => (
              <div
                className="text-[#D9E3EA] text-[14px] md:text-[16px] lg:text-[18px] mt-2 flex items-center"
                key={index}
              >
                <div className="w-[5px] h-[5px] rounded-full bg-[#D9E3EA] mr-3"></div>
                {ques}
              </div>
            ))}
          </div>
          <div className="w-[90%] md:w-[70%] flex flex-col sm:flex-row items-center justify-around rounded-md mt-10 gap-4">
           <button onClick={()=>{setvideopopup(true)}} className="w-full sm:w-auto text-[white] text-[16px] md:text-[20px] bg-[#5D5DFF] px-5 py-3 rounded-md hover:bg-[#4a4adc]">
              {space.Extras.videoButtonText}
            </button>
            <button onClick={()=>{settextpopup(true)}} className="w-full sm:w-auto text-[white] text-[16px] md:text-[20px] bg-[#33363A] px-5 py-3 rounded-md hover:bg-[#2a2c2e]">
              {space.Extras.textButtonText}
            </button>
          </div>
        </div>
        {
         textpopup &&  
        <div className="w-full min-h-screen absolute gap-x-6 left-0 top-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
         <div className=" w-[90%] md:w-[70%] lg:w-[40%] relative h-[90vh] p-5 flex flex-col mtb-20 items-start inset-0 rounded-md bg-white scrollbar shadow-lg overflow-x-hidden overflow-y-auto">
            <div
      onClick={() => { settextpopup(false) }}
      className="absolute right-3 top-3 flex items-center justify-center rounded-md bg-[#F3F4F6] cursor-pointer hover:bg-[#E5E7EB] w-[30px] h-[30px]"
    >
      <RxCross2 />
            </div>
            <div className="text-[#333333] text-[22px] font-semibold">{space.Extras.textSubmissionTitle}</div>
           <img className="w-[200px] h-[100px] rounded-lg mt-4" src={space.spaceLogo} alt="Space Logo" />
           <div className="w-full flex flex-col items-start mt-6">
      <div className="text-[#1F2937] m-3 text-[20px] md:text-[22px] font-bold">QUESTIONS</div>
      <div className="w-[50px] md:w-[80px] h-[5px] md:h-[8px] mt-2 bg-[#5D5DFF]"></div>

      {space.questions.map((ques: string, index: number) => (
        <div className="text-[#333333] text-[14px] md:text-[16px] lg:text-[18px] mt-2 flex items-center" key={index}>
          <div className="w-[5px] h-[5px] rounded-full bg-[#333333] mr-3"></div>
          {ques}
        </div>
      ))}
           </div>
           <div className="mt-5 flex flex-col">
            <label htmlFor="image-file" className="text-[#4B5563] font-semibold">Attach Image(s)</label>
           <div className="flex flex-row w-fit mt-4 items-center gap-x-6">
           <div className="w-[80px] h-[50px] rounded-md bg-[#F9FAFB] border border-[#E5E7EB]">
           {imageString && <img src={imageString} className="w-full h-full rounded-md" alt="Uploaded Image" />}
           </div>
           <input onChange={handleFileChange} id="image-file" accept="image/*" type="file" />
           </div>
        </div>
    <div className="flex flex-row items-center mx-auto text-[18px] font-semibold mt-8 mb-5 gap-x-5">
      <div className={`flex flex-col items-center text-[18px] text-[#4B5563] ${rating === 1 && "text-[rgb(237,176,44)]"}`} onClick={() => { setRating(1) }}>
        <FaAngry /> Angry
      </div>
      <div className={`flex flex-col items-center text-[18px] text-[#4B5563] ${rating === 2 && "text-[rgb(237,176,44)]"}`} onClick={() => { setRating(2) }}>
        <RiEmotionUnhappyLine /> Sad
      </div>
      <div className={`flex flex-col items-center text-[18px] text-[#4B5563] ${rating === 3 && "text-[rgb(237,176,44)]"}`} onClick={() => { setRating(3) }}>
        <IoMdSad /> Happy
      </div>
      <div className={`flex flex-col items-center text-[18px] text-[#4B5563] ${rating === 4 && "text-[rgb(237,176,44)]"}`} onClick={() => { setRating(4) }}>
        <IoMdHappy /> Amazing
      </div>
      <div className={`flex flex-col items-center text-[18px] text-[#4B5563] ${rating === 5 && "text-[rgb(237,176,44)]"}`} onClick={() => { setRating(5) }}>
        <ImHappy2 /> Excellent
      </div>
    </div>

    <div className="flex mt-6 flex-col text-[#6B7280] w-full justify-center">
      <label htmlFor="message">Your custom message*</label>
      <textarea
        value={custMessage}
        onChange={(e) => { setcustMessage(e.target.value) }}
        className="outline-none focus:border-[#2563EB] focus:border-[2px] p-3 rounded-md mt-3 border-[1px] border-[#D1D5DB]"
        id="message"
        rows={4}
        cols={50}
        required
        placeholder="Give us your feedback"
      ></textarea>
    </div>

    <div className="flex mt-6 flex-col text-[#6B7280] w-full justify-center">
      <label htmlFor="nameSender">Your Name*</label>
      <input
        value={custName}
        onChange={(e) => { setcustName(e.target.value) }}
        required
        type="text"
        id="nameSender"
        className="outline-none focus:border-[#2563EB] focus:border-[2px] p-3 rounded-md mt-3 border-[1px] border-[#D1D5DB]"
      />
    </div>

    <div className="flex mt-6 flex-col text-[#6B7280] w-full justify-center">
      <label htmlFor="senderEmail" className="text-[#6B7280]">Your Email*</label>
      <input
        value={custEmail}
        onChange={(e) => { setcustEmail(e.target.value) }}
        required
        type="email"
        id="senderEmail"
        className="outline-none focus:border-[#2563EB] focus:border-[2px] p-3 rounded-md mt-3 border-[1px] border-[#D1D5DB]"
      />
    </div>

    <label htmlFor="uploadprofile" className="text-[#6B7280] mt-2 font-semibold">Upload Your Photo</label>
    <div className="mt-2 flex items-center gap-x-6">
      <div className="w-[90px] h-[90px] bg-white rounded-full border border-[#E5E7EB]">
        {profileImage && <img src={profileImage} className="w-full h-full rounded-full" alt="Profile Image" />}
      </div>
      <input onChange={handleUplaodChange} id="image-file" accept="image/*" type="file" />
    </div>

    <div className="flex w-full items-center gap-x-6 my-4 text-[18px] text-[#333333]">
      <input type="checkbox" />
      <p>{space.Extras.consentDisplay}</p>
    </div>

    <button onClick={reviewSubmit} className="w-full text-[18px] font-semibold flex items-center justify-center py-2 bg-[#5D5DFF] rounded-lg hover:bg-[#4a4adc]">
      Send
    </button>
         </div>
        </div>
        }
        {
         videopopup && 
        <FinalVideo setloading={setLoading} setthankpopup={setthankPopUp} videoPopup setVideoPopup={setvideopopup} ></FinalVideo>
        }
      </div>
    )
  )} 
        </>
        
)
};

export default Testimonial
