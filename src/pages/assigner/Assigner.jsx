import { Fragment, useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import _ from "lodash";
import "../../styles.css";
import logo from "../../images/logo.png";
import logo1 from "../../images/logo1.png";
import ImageComponent from "./ImageComponent";
import "./assignee.css";
import { paintings } from "./data";
import moment from "moment";

function Assigner() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading] = useState(false);
  const [approvedPaintings, setApprovePaintings] = useState({});
  const [error, setError] = useState("");

  /**
   * Here is the code
   */
  var connectWebSocket = async () => {
    let res = await fetch(`http://10.10.17.4:4000/artEnroll/connectStream`);
    let data = await res.json();
    console.log(data);
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
        setTimeout(() => {
          const updatedData = message.data.findValues;

          setApprovePaintings(updatedData);
        });
      } else {
        setError("Scan Error ...");
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
      {(loading && "") ||
        (_.size(approvedPaintings) && (
          <Fragment>
            <div className="art-enroll-card mt-4">
              <div className="art-enroll-card-content">
                {loading ? (
                  ""
                ) : _.size(approvedPaintings) ? (
                  <ReactCardFlip
                    flipSpeedFrontToBack={1}
                    flipSpeedBackToFront={1}
                    isFlipped={isFlipped}
                    flipDirection="horizontal"
                  >
                    <div className="art-enroll-card-content-front">
                      <div className="art-enroll-card-content-left">
                        <p className="art-enroll-sub">
                          {approvedPaintings.name}
                        </p>
                        <ImageComponent selectedPainting={approvedPaintings} />
                        <div className="d-flex justify-content-center">
                          <p>ArtEnroll ID:</p>
                          <p className="artEnrollid_text">
                            {approvedPaintings.artEnrollId}
                          </p>
                        </div>
                      </div>
                      <div className="art-enroll-card-content-right">
                        <button className="original">Original</button>
                        <div className="art-enroll-date">
                          <p className="mb-2">Enrolled:</p>
                          <p className="text-dark">
                            {moment(approvedPaintings.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                        </div>
                        <p className="artist">Artist:</p>
                        <p className="artist-name">
                          {approvedPaintings.artistName}
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
                          <b>Original Registry:</b>
                          <p className="artEnrollid_text">
                            Martinez Gallery, BOGOTOA ,COLOMBIA
                          </p>

                          <b>Currently Owned By:</b>
                          <p className="artEnrollid_text">
                            Margaret Anne Smith New York, NY 10016 USA{" "}
                          </p>

                          <b>Last Verified Loc:</b>
                          <p className="artEnrollid_text">
                            40°44'46.51" N, 73°58'52.43"
                          </p>
                        </div>
                        <div className="divider"></div>
                        <p className="uid">
                          ArtEnroll ID: {approvedPaintings.artEnrollId}
                        </p>
                      </div>
                      <div className="art-enroll-card-content-right">
                        <button className="original">Original</button>
                        <p className="artist">Artist:</p>
                        <p>{approvedPaintings.artistName}</p>
                        <p className="artist">Enrolled:</p>
                        <p className="text-normal">
                          {moment(approvedPaintings.createdAt).format(
                            "MMMM Do ,YYYY"
                          )}
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
                  <i className="m-0">{approvedPaintings.size} in,framed</i>
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
        )) ||
        ""}
      {error && (
        <div className="alert alert-danger my-5" role="alert">
          <p className="text-danger m-0">{error}</p>
        </div>
      )}
    </div>
  );
}
export default Assigner;
