import { Fragment, useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Select from "react-select";
import _ from "lodash";
import { Overlay, Popover } from "react-bootstrap";
import "../../styles.css";
import logo from "../../images/logo.png";
import notificationImage from "../../images/notification.png";
import { getApprovedPaintings } from "../../api/helpers";
import ImageComponent from "./ImageComponent";

const currentLoginUser = JSON.parse(localStorage.getItem("loginUserInfo"));

function Assigner() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvedPaintings, setApprovedPaintings] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [target, setTarget] = useState(null);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowProfileOptions(!showProfileOptions);
    setTarget(event.target);
  };
  const [selectedApprovedPainting, setSelectedApprovedPainting] = useState(undefined);
  const handleSignout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const getSelectedPainting = () => {
    return _.find(approvedPaintings, (eachPainting) => eachPainting.id === _.get(selectedApprovedPainting, "value"));
  };

  const getApprovedPaintingsQuery = () => {
    setLoading(true);
    setError(false);
    getApprovedPaintings()
      .then((res) => {
        return res.data;
      })
      .then((result) => {
        setLoading(false);
        setError(false);
        const firstData = _.get(result, "data")[1];
        setSelectedApprovedPainting({ label: _.get(firstData, "name"), value: _.get(firstData, "id") });
        setApprovedPaintings(
          _.filter(_.get(result, "data", []), (eachResult) => eachResult.isAvailable && eachResult.status === "approve")
        );
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getApprovedPaintingsQuery();
  }, []);
  // if (error) {
  //   return (
  //     <div className="vh-100 d-flex align-items-center">
  //       <h3 className="text-danger text-center">Something went wrong</h3>{" "}
  //     </div>
  //   );
  // }

  return (
    <div className="art-enroll-wrapper">
      <div className="art-enroll-content">
        <div className="art-enroll-header">
          <div className="art-enroll-logo">
            <img src={logo} alt="Art enRoll Logo" />
          </div>
          <div className="art-enroll-details">
            <div ref={ref}>
              <Overlay
                onHide={() => setShowProfileOptions(false)}
                rootClose={true}
                rootCloseEvent="mousedown"
                trigger="click"
                show={showProfileOptions}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={10}
              >
                <Popover id="popover-basic">
                  <Popover.Body className="cursor_pointer text-danger" onClick={handleSignout}>
                    Logout
                  </Popover.Body>
                </Popover>
              </Overlay>
              <img src={notificationImage} alt="Notification" className="cursor_pointer" onClick={handleClick} />
            </div>
            <p>{_.get(currentLoginUser, "name")}</p>
            <h4>
              Art enRoll <br />
              <span>Assigner v1.1.0</span>
            </h4>
          </div>
        </div>
        {error ? (
          <div className="d-flex align-items-center justify-content-center error-box">
            <h3 className="text-danger text-center">Something went wrong</h3>{" "}
          </div>
        ) : (
          <Fragment>
            {selectedApprovedPainting ? (
              <Select
                id="art_approval"
                value={selectedApprovedPainting}
                onChange={(e) => {
                  setIsFlipped(false);
                  setSelectedApprovedPainting(e);
                }}
                options={_.map(approvedPaintings, (eachPainting) => {
                  return {
                    value: eachPainting.id,
                    label: eachPainting.name,
                  };
                })}
              />
            ) : null}
            <div className="art-enroll-card mt-4">
              <div className="art-enroll-card-heading">
                <div>
                  <span>1</span>
                </div>
                <div>
                  <p>Select an item from the list above.</p>
                </div>
              </div>
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
                        <p className="art-enroll-sub">{_.get(getSelectedPainting(), "name", "")}</p>
                        <ImageComponent selectedPainting={getSelectedPainting()} />
                        <p>
                          Image ID :{" "}
                          <span>
                            {/* <tr /> */}
                            {_.get(getSelectedPainting(), "id")}
                          </span>
                        </p>
                      </div>
                      <div className="art-enroll-card-content-right">
                        <button className="original">Original</button>
                        <div className="art-enroll-date">
                          <p className="mb-2">
                            Enrolled:
                            <br /> Oct 19, 2021 7:10:15 PM
                          </p>
                        </div>
                        <p className="artist">
                          Artist: <span>{_.get(getSelectedPainting(), "artistName", "")}</span>
                        </p>
                        <button className="more" onClick={() => setIsFlipped(true)}>
                          More.
                        </button>
                      </div>
                    </div>
                    <div className="art-enroll-card-content-back">
                      <div className="art-enroll-card-content-left">
                        <div className="art-enroll-card-content-left-inside">
                          <p>
                            <b>Original Registry:</b> Martinez Gallery, BOGOTOA ,COLOMBIA
                          </p>
                          <p>
                            <b>Currently Owned By:</b> Margaret Anne Smith New York, NY 10016 USA
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
                          Artist: <span>{_.get(getSelectedPainting(), "artistName", "")}</span>
                        </p>
                        <p className="artist">
                          Enrolled: <span>April 15, 2018</span>
                        </p>
                        <button className="more" onClick={() => setIsFlipped(false)}>
                          Back
                        </button>
                      </div>
                    </div>
                  </ReactCardFlip>
                ) : null}
              </div>
            </div>
            <div className="art-enroll-card mt-4">
              <div className="art-enroll-card-heading">
                <div>
                  <span>2</span>
                </div>
                <div>
                  <p>
                    Using an Android or IoS SmartPhone, scan the NFC tag at the back of the artwork.{" "}
                    <b>This can be done only once.</b>
                  </p>
                </div>
              </div>
              <div className="art-enroll-scan">
                {loading ? (
                  <div className="loader_container">
                    <div className="loader"></div>
                  </div>
                ) : _.size(approvedPaintings) ? (
                  <ImageComponent selectedPainting={getSelectedPainting()} />
                  
                ) : null}
                <p className="artenroll-id">ArtEnroll ID BA323EV6</p>
                <p>
                  Success! Your artwork has been authenticated, validated and enrolled in the the Art enRoll global
                  network.
                </p>
              </div>
            </div>
            <div className="enquiry-block">
              <div className="enquiry-block-left">Offered at: $ {_.get(getSelectedPainting(), "price", "")}</div>
              <div className="enquiry-block-right">
                <button>Inquire</button>
                <button className="green-text">Acquire</button>
              </div>
            </div>
            <div className="enquiry-block">
              <div className="enquiry-block-left">For more info</div>
              <div className="enquiry-block-right">
                <button>Call</button>
                <button className="green-text">Email</button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
export default Assigner;
