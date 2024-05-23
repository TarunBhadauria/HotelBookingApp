import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { copywrites, footerElems } from "../../assets/data/footerElems";
import { IoGlobeOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <Container
        maxWidth={"100vw"}
        style={{
          backgroundColor: "#f7f7f7",
          color: "#222222",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Container maxWidth="lg" sx={{ padding: "20px" }}>
          {/* Upper Box */}
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"baseline"}
            >
              <Typography color="initial" style={{ margin: "5px 0px" }}>
                Support
              </Typography>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                {footerElems.airbnbSupportItems.map((elem) => (
                  <Typography
                    style={{ textTransform: "capitalize", fontSize: "14px" }}
                    sx={{
                      display: "inline",
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {elem}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"baseline"}
            >
              <Typography color="initial" style={{ margin: "5px 0px" }}>
                Hosting
              </Typography>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                {footerElems.airbnbHostItems.map((elem) => (
                  <Typography
                    style={{ textTransform: "capitalize", fontSize: "14px" }}
                    sx={{
                      display: "inline",
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {elem}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"baseline"}
            >
              <Typography color="initial" style={{ margin: "5px 0px" }}>
                Airbnb
              </Typography>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                {footerElems.newsroomItems.map((elem) => (
                  <Typography
                    style={{ textTransform: "capitalize", fontSize: "14px" }}
                    sx={{
                      display: "inline",
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {elem}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Container>
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              margin: "15px 0px",
            }}
          ></Box>
          {/* Lower Container */}
          <Container
            maxWidth="lg"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            {/* Left container */}
            <Box display={"flex"} gap={2} flexDirection={"row"}>
              {copywrites.map((copywrite) => (
                <Typography style={{ fontSize: "14px" }}
                 sx={{
                    "&:hover":{
                        cursor:"pointer",
                        textDecoration:"underline"
                    }
                 }}
                >
                  {copywrite}
                </Typography>
              ))}
            </Box>
            {/* Right Container */}
            <Box display={"flex"} gap={2} flexDirection={"row"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                flexDirection={"row"}
                gap={1}
              >
                <IoGlobeOutline size={20} />
                <Typography style={{ fontSize: "14px" }}>
                  {"English (IN)"}
                </Typography>
              </Box>
              <Typography style={{ fontSize: "14px" }}> ₹ INR</Typography>
              <FaFacebookSquare size={20} />
              <FaSquareXTwitter size={20} />
              <FaSquareInstagram size={20} />
            </Box>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Footer;
