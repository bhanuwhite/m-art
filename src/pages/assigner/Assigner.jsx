import { Fragment, useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Select from "react-select";
import _ from "lodash";
import { Overlay, Popover } from "react-bootstrap";
import "../../styles.css";
import logo from "../../images/logo.png";
import notificationImage from "../../images/notification.png";
import ImageComponent from "./ImageComponent";
import "./assignee.css";
import { paintings } from "./data";

const currentLoginUser = JSON.parse(localStorage.getItem("loginUserInfo"));

function Assigner() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvedPaintings, setApprovedPaintings] = useState(paintings);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [target, setTarget] = useState(null);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShowProfileOptions(!showProfileOptions);
    setTarget(event.target);
  };
  const [selectedApprovedPainting, setSelectedApprovedPainting] = useState({
    value: 70,
    name: "TajMahal",
  });
  const handleSignout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const getSelectedPainting = () => {
    return _.find(
      approvedPaintings,
      (eachPainting) =>
        eachPainting.id === _.get(selectedApprovedPainting, "value")
    );
  };

  useEffect(() => {
    // getApprovedPaintingsQuery();
  }, []);
  // if (error) {
  //   return (
  //     <div className="vh-100 d-flex align-items-center">
  //       <h3 className="text-danger text-center">Something went wrong</h3>
  //     </div>
  //   );
  // }

  return (
    <div className="col-12 col-lg-3 col-xl-3 art-container">
      <h6>AUTHENTICATOR</h6>
      <img src={logo} alt="Art enRoll Logo" className="art-enroll-logoImg" />
      <h5 className="py-2">
        Please <b>Scan</b> the Art Enroll tag at the back of the Artwork with an
        IoS or Android phone that is NFC capable.
      </h5>
      <div className="art-enroll-NtagImg">
        <img
          id="u39_img"
          className="img"
          src="https://d1icd6shlvmxi6.cloudfront.net/gsc/3KJWY4/8e/9c/da/8e9cda406ed547f1bfe52dcf5ac4d6cb/images/page_1/u39.png?token=b60ee1dd2de3ccc02ebd70a38ec0ba38d4ec7bdf19fb8d30e1865e63394a6c58&amp;pageId=0e0f8ba6-2c4f-4d15-ba23-74834c111909"
        />
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
                      <p className="art-enroll-sub">
                        {_.get(getSelectedPainting(), "name", "")}
                      </p>
                      <ImageComponent
                        selectedPainting={getSelectedPainting()}
                      />
                      <p>
                        Image ID :
                        <span>
                          {/* <tr /> */} {_.get(getSelectedPainting(), "id")}
                        </span>
                      </p>
                    </div>
                    <div className="art-enroll-card-content-right">
                      <button className="original">Original</button>
                      <div className="art-enroll-date">
                        <p className="mb-2">
                          Enrolled: <br /> Oct 19, 2021 7:10:15 PM
                        </p>
                      </div>
                      <p className="artist">
                        Artist:
                        <span>
                          {_.get(getSelectedPainting(), "artistName", "")}
                        </span>
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
                      <p className="uid">UID: 0483462AAA7190</p>
                    </div>
                    <div className="art-enroll-card-content-right">
                      <button className="original">Original</button>
                      <p className="artist">
                        Artist:
                        <span>
                          {_.get(getSelectedPainting(), "artistName", "")}
                        </span>
                      </p>
                      <p className="artist">
                        Enrolled: <span>April 15, 2018</span>
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
                <i className="m-0">24 in X 36 in, framed</i>
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
                <ImageComponent selectedPainting={getSelectedPainting()} />
              ) : null}
            </div>
          </div>
          <div className="row oil-card enquiry-block">
            <div className="col-5 oil-card-left">
              <div className="oil-card-left-text">
                <i className="m-0">
                  Offered at: $ {_.get(getSelectedPainting(), "price", "")}
                </i>
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
