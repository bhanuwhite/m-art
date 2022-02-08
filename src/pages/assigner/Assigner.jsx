import { Fragment, useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import _ from "lodash";
import "../../styles.css";
import logo from "../../images/logo.png";
import logo1 from "../../images/logo1.png";
import ImageComponent from "./ImageComponent";
import "./assignee.css";
import { paintings } from "./data";

function Assigner() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading] = useState(false);
  const [approvedPaintings, setApprovePaintings] = useState({});
  const [error] = useState(false);

  /**
   * Here is the code
   */
  var connectWebSocket = async () => {
    let res = await fetch(`http://10.10.17.4:4000/artEnroll/connectStream`);
    let data = await res.json();
    var ws = new WebSocket(data.url, "json.webpubsub.azure.v1");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "joinGroup",
          group: "stream",
        })
      );
    };
    ws.onmessage = (event) => {
      let message = JSON.parse(event.data);

      if (message.type === "message" && message.group === "stream") {
        console.log(message.data);
        setTimeout(() => {
          const updatedData = message.data.findValues;
          setApprovePaintings(updatedData);
        });
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <div className="col-12 col-lg-5 col-xl-6 art-container">
      <h6>AUTHENTICATOR</h6>
      <img src={logo} alt="Art enRoll Logo" className="art-enroll-logoImg" />
      <h5 className="py-2">
        Please <b>Scan</b> the Art Enroll tag at the back of the Artwork with an
        IoS or Android phone that is NFC capable.
      </h5>
      <div className="art-enroll-NtagImg">
        <img id="u39_img" className="img" src={logo1} />
      </div>
      {error ? (
        <div className="d-flex align-items-center justify-content-center error-box">
          <h3 className="text-danger text-center">Something went wrong</h3>
        </div>
      ) : (
        <Fragment>
          <div className="art-enroll-card mt-4">
            <div className="art-enroll-card-content">
              {loading ? (
                <div className="loader_container">
                  <div className="loader"></div>
                </div>
              ) : _.size(approvedPaintings) ? (
                <ReactCardFlip
                  flipSpeedFrontToBack={1}
                  flipSpeedBackToFront={1}
                  isFlipped={isFlipped}
                  flipDirection="horizontal"
                >
                  <div className="art-enroll-card-content-front">
                    <div className="art-enroll-card-content-left">
                      <p className="art-enroll-sub">{approvedPaintings.name}</p>
                      <ImageComponent selectedPainting={approvedPaintings} />
                      <p>
                        Image ID :<span>{approvedPaintings.id}</span>
                      </p>
                    </div>
                    <div className="art-enroll-card-content-right">
                      <button className="original">Original</button>
                      <div className="art-enroll-date">
                        <p className="mb-2">
                          Enrolled: <br /> {approvedPaintings.updatedAt}
                        </p>
                      </div>
                      <p className="artist">
                        Artist:
                        <span>{approvedPaintings.artistName}</span>
                      </p>
                      <button
                        className="more"
                        onClick={() => setIsFlipped(true)}
                      >
                        More.
                      </button>
                    </div>
                  </div>
                  <div className="art-enroll-card-content-back">
                    <div className="art-enroll-card-content-left">
                      <div className="art-enroll-card-content-left-inside">
                        <p>
                          <b>Original Registry:</b> Martinez Gallery, BOGOTOA
                          ,COLOMBIA
                        </p>
                        <p>
                          <b>Currently Owned By:</b> Margaret Anne Smith New
                          York, NY 10016 USA
                        </p>
                        <p>
                          <b>Last Verified Loc:</b> 40°44'46.51" N, 73°58'52.43"
                        </p>
                      </div>
                      <div className="divider"></div>
                      <p className="uid">UID:{approvedPaintings.artEnrollId}</p>
                    </div>
                    <div className="art-enroll-card-content-right">
                      <button className="original">Original</button>
                      <p className="artist">
                        Artist:
                        <span>{approvedPaintings.artistName}</span>
                      </p>
                      <p className="artist">
                        Enrolled: <span>{approvedPaintings.updatedAt}</span>
                      </p>
                      <button
                        className="more"
                        onClick={() => setIsFlipped(false)}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </ReactCardFlip>
              ) : null}
            </div>
          </div>
          <div className="row oil-card">
            <div className="col-5 oil-card-left">
              <div className="oil-card-left-text">
                <i className="m-0">Oil on Canvas</i>
              </div>
            </div>
            <div className="col-7 oil-card-right">
              <div className="oil-card-right-text">
                <i className="m-0">{approvedPaintings.size} inch, framed</i>
              </div>
            </div>
          </div>
          <div className="art-enroll-card mt-4">
            <div className="art-enroll-scan">
              {loading ? (
                <div className="loader_container">
                  <div className="loader"></div>
                </div>
              ) : _.size(approvedPaintings) ? (
                <ImageComponent selectedPainting={approvedPaintings} />
              ) : null}
            </div>
          </div>
          <div className="row oil-card enquiry-block">
            <div className="col-5 oil-card-left">
              <div className="oil-card-left-text">
                <i className="m-0">Offered at: ${approvedPaintings.price}</i>
              </div>
            </div>
            <div className="col-7 oil-card-right ">
              <div className="enquiry-block-right">
                <button>Make Offer</button>
                <button className="green-text">Acquire</button>
              </div>
            </div>
          </div>
          <div className="row oil-card enquiry-block">
            <div className="col-5 oil-card-left">
              <div className="oil-card-left-text">
                <i className="m-0">For more info</i>
              </div>
            </div>
            <div className="col-7 oil-card-right">
              <div className="enquiry-block-right">
                <button>Call</button>
                <button className="green-text">Email</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
export default Assigner;
