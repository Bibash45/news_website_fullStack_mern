import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    LinkedinShareButton,
  } from "react-share";
  
  import {
    FaFacebookSquare,
    FaTwitter,
    FaWhatsapp,
  } from "react-icons/fa";
  import { BsMessenger } from "react-icons/bs";
  
  const ShareButtons = ({ url, title, image }) => {
    const emailBody = `${title}\n\nCheck this out: ${url}\n\nImage: ${image}`;
    const whatsappMessage = `${title}\n${url}\n📷 ${image}`;
  
    return (
      <div className="flex flex-wrap gap-3 ml-7 items-center justify-center">
        {/* Facebook Share */}
        <FacebookShareButton url={url} quote={title} >
          <div className="text-[#1877F2]">
            <FaFacebookSquare size={20} />
          </div>
        </FacebookShareButton>
  
        {/* Messenger Share */}
        <FacebookMessengerShareButton url={url} appId="YOUR_APP_ID">
          <div>
            <BsMessenger size={20} className="text-blue-500" />
          </div>
        </FacebookMessengerShareButton>
  
        {/* WhatsApp Share */}
        <WhatsappShareButton url={whatsappMessage}>
          <div>
            <FaWhatsapp size={20} className="text-green-500" />
          </div>
        </WhatsappShareButton>
  
        {/* Twitter Share */}
        <TwitterShareButton url={url} title={title}>
          <div>
            <FaTwitter size={20} className="text-blue-500" />
          </div>
        </TwitterShareButton>
  
        {/* LinkedIn Share */}
        <LinkedinShareButton url={url} title={title} summary={title} source={url}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48">
              <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
              <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.220-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 20.543 20 26.511 20 27v9h-5V19h5v2.616C20.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.20 6.261 7.274L36 36 36 36z"></path>
            </svg>
          </div>
        </LinkedinShareButton>
  
        {/* Email Share */}
        <EmailShareButton url={url} subject={title} body={emailBody}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48">
              <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
              <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
              <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
              <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.201,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
              <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.201,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
            </svg>
          </div>
        </EmailShareButton>
      </div>
    );
  };
  
  export default ShareButtons;
  