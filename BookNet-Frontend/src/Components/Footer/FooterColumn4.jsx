import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";

const FooterColumn4 = () => {
  return (
    <div className=" md:flex-3 flex flex-col items-center p-5 gap-5">
      <h2 className="text-2xl text-center font-semibold">BookNet Social</h2>
      <div>
        <div>
          <IconButton>
            <FacebookRoundedIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <WhatsAppIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <InstagramIcon style={{ fontSize: "42" }} />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <YouTubeIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <EmailIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <XIcon style={{ fontSize: "42" }} />
          </IconButton>
          <IconButton>
            <LinkedInIcon style={{ fontSize: "42" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FooterColumn4;
