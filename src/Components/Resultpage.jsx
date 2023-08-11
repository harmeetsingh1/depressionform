import React, { useContext, useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

import { useLocation, useNavigate } from "react-router-dom";
import TotalScoreContext from "./TotalScoreContext";
import { useTotalScore } from "./TotalScoreContext";
import ResultInfo from "./ResultInfo";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import ContactUs from "./ContactUs";
import Fade from "react-reveal/Fade";

function Resultpage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const updatedTotalScore = parseInt(queryParams.get("score"));
  console.log("Total Score:", updatedTotalScore);

  const { setTotalScore1 } = useContext(TotalScoreContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentColor, setCurrentColor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted && isNaN(updatedTotalScore)) {
      setTotalScore1(updatedTotalScore);
      navigate(`/result?score=${updatedTotalScore}`);
    }
  }, [isSubmitted, navigate, setTotalScore1, updatedTotalScore]);

  const totalScoreValue = isNaN(updatedTotalScore) ? 0 : updatedTotalScore;

  useEffect(() => {
    if (updatedTotalScore !== null) {
      const index = Math.floor(updatedTotalScore / 20);
      const colorNames = ["Green", "Yellow", "Orange", "Red"];
      setCurrentColor(colorNames[index]);
    }
  }, [updatedTotalScore]);

  const getAnxietyLevel = () => {
    if (updatedTotalScore >= 0 && updatedTotalScore < 20) {
      return "Normal";
    } else if (updatedTotalScore >= 20 && updatedTotalScore < 40) {
      return "Mild";
    } else if (updatedTotalScore >= 40 && updatedTotalScore < 60) {
      return "Moderate";
    } else if (updatedTotalScore >= 60 && updatedTotalScore <= 80) {
      return "Severe";
    } else {
      return "Unknown";
    }
  };

  const normal = `- Your score on Depression Level Test suggests that your Depression level is perfectly normal.<br/> <br> 
  - It means you may generally experience a positive and stable mood, with minimal feelings of sadness or despair. <br/> <br>
  - Your emotional resilience may allow you to navigate life's challenges with a sense of optimism and hope. <br/> <br>
  - You may enjoy a healthy balance of emotions.<br/>
  - Keep this up with mindfulness techniques!<br/>

  `;
  const mild = `- Your score on Depression Level Test suggests that you may have mild Depression levels.<br/> <br> 
  - It means you may experience occasional feelings of sadness and low energy that impact your daily life to some extent. <br/> <br>
  - While you may find it challenging to muster enthusiasm at times, you can still function relatively well in most aspects of your life.<br/> <br> 
  - It's essential to be kind to yourself during these periods.<br/> <br>
  - Try treating your depression with mindfulness techniques and counselling sessions.<br/> <br> 
  - Remember that you are not alone in this journey!<br/> <br>

  `;

  const moderate = `- Your score on Depression Level Test suggests that you may have moderate Depression levels. <br/> <br>
  - Means you may be overwhelmed by persistent feelings of deep sadness, hopelessness, and emotional pain. <br/> <br>
  - Your energy levels may be reduced, making even simple tasks feel like insurmountable challenges. <br/> <br>
  - It may be difficult to find joy or interest in things you once enjoyed, and you may withdraw from social interactions. <br/> <br>
  - Try treating your depression with counseling sessions and professional help. <br/> <br>
  - Remember that you are not alone in this journey!<br/> <br>

  `;
  const severe = `- Your score on Depression Level Test suggests that you may have severe Depression levels. <br/> <br>
  - It means you may be experiencing an unrelenting sense of despair and emptiness. <br/> <br>
  - It may be challenging to find any motivation or joy in life, and even getting through each day might feel like an insurmountable task.<br/> <br>
   - Your emotional and physical well-being might be severely impacted.<br/> <br>
  -Try improving your depression management with professional help and clinical treatment. <br/> <br> 
  - Remember that you are not alone in this journey!<br/> <br> 

  `;
  const getAnxietyLevelText = () => {
    if (updatedTotalScore >= 0 && updatedTotalScore < 20) {
      return (
        <div className="container">
          <p
            className="flex max-w-lg md:max-w-md lg"
            dangerouslySetInnerHTML={{ __html: normal }}
          ></p>
        </div>
      );
    } else if (updatedTotalScore >= 20 && updatedTotalScore < 40) {
      return (
        <div className="container">
          <p
            className="flex max-w-lg md:max-w-md lg"
            dangerouslySetInnerHTML={{ __html: mild }}
          ></p>
        </div>
      );
    } else if (updatedTotalScore >= 40 && updatedTotalScore < 60) {
      return (
        <div className="container">
          <p
            className="flex max-w-lg md:max-w-md lg"
            dangerouslySetInnerHTML={{ __html: moderate }}
          ></p>
        </div>
      );
    } else if (updatedTotalScore >= 60 && updatedTotalScore <= 80) {
      return (
        <div className="container">
          <p
            className="flex max-w-lg md:max-w-md lg"
            dangerouslySetInnerHTML={{ __html: severe }}
          ></p>
        </div>
      );
    } else {
      return "Unknown";
    }
  };

  const anxietyLevel = getAnxietyLevel();
  const anxietyLevelText = getAnxietyLevelText();
  return (
    <div className="flex  bg-[#e0ffff]">
      <article class="container flex flex-col md:flex-row bg-[#e0ffff] mb-10 ">
        <Card className="flex flex-grow-1 md:mr-4  md:mb-0 shadow-2xl shadow-teal-500 pt-3 mb-3">
          <Card.Body>
            <h4 className="flex justify-center m-4 pt-2">
              DEPRESSION LEVEL TEST RESULT
            </h4>
            <div className="flex justify-center pt-1">
              <ReactSpeedometer
                maxValue={80}
                value={totalScoreValue}
                height={200}
                needleHeightRatio={0.7}
                needleColor="red"
                // startColor="green"
                segments={5}
                // endColor="red"
                customSegmentStops={[0, 20, 40, 60, 80]}
                segmentColors={["green", "gold", "orange", "tomato"]}
                currentValueText="Anxiety Level"
                customSegmentLabels={[
                  {
                    text: "NORMAL",
                    position: "OUTSIDE",
                  },
                  {
                    text: "MILD",
                    position: "OUTSIDE",
                    //fontSize: "19px",
                  },
                  {
                    text: "MODERATE",
                    position: "OUTSIDE",
                  },
                  {
                    text: "SEVERE",
                    position: "OUTSIDE",
                  },
                ]}
                className="flex justify-center "
              />
            </div>
            <div>
              <p className="italic p-3 m-3 max-w-md fw-bold cong text-[#2755a3]">
                Congratulations on completing the Depression Test!! It was
                really Quick and Interesting !!!
              </p>
            </div>
            <div className="relative flex flex-col items-baseline ">
              <ResultInfo
                className="titles"
                updatedTotalScore={updatedTotalScore}
                currentColor={currentColor}
              />

              <p className="flex fw-bold " id="level">
                Your Depression Level Is {anxietyLevel}
              </p>

              <p className="flex justify-center p-3 m-3 " id="details">
                {anxietyLevelText}
              </p>

              <div className="container flex  align-center justify-evenly flex-col md:flex-row ">
                <Button
                  href="https://www.positivemindcare.com/"
                  className=" text-sm  font-medium flex-grow-1 md:w-1/4 m-4 rounded-full but"
                >
                  Know More
                </Button>

                <Button
                  variant="primary"
                  href="https://www.positivemindcare.com/contact-us/"
                  className=" text-sm font-medium flex-grow-1  md:w-1/4 m-4 mb-4 but"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="conatiner flex flex-grow-1 items-center shadow-2xl shadow-teal-500 mb-3">
          <Card.Body className="m-4 p-4">
            <div className="flex justify-center container">
              <h4 className="">OUR PACKAGES</h4>
            </div>
            <div className="relative container flex flex-col md:flex-row justify-center">
              {anxietyLevel === "Normal" && (
                <>
                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/5184243.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Mindfulness Package
                      </Card.Title>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text>
                      <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Rs. 300
                      </Card.Text>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text>

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            Monthly Plan - 04 Sessions - Rs 2,500
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Quarterly Plan - 12 Sessions - Rs. 5,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 15,000
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/positive-mind-care"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}
              {anxietyLevel === "Mild" && (
                <>
                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/Woman characters having business conversation or meeting.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Psychological Counselling
                      </Card.Title>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text>
                      <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Upto Rs. 400
                      </Card.Text>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text>

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            Single Session Charge - Rs 1,200
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Monthly Plan - 04 Sessions - Rs 4,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Quarterly Plan - 12 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 15,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 20,000
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/positive-mind-care"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/5184243.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Mindfulness Package
                      </Card.Title>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text>
                      <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Rs. 300
                      </Card.Text>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text>

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            Monthly Plan - 04 Sessions - Rs 2,500
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Quarterly Plan - 12 Sessions - Rs. 5,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 15,000
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/positive-mind-care"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}

              {anxietyLevel === "Moderate" && (
                <>
                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/doctors.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center ">
                        Psychiatrist Consultation
                      </Card.Title>
                      {/* <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text> */}
                      {/* <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Rs. 300
                      </Card.Text> */}
                      {/* <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text> */}

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            In Clinic - Rs 1000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Online - Rs 700
                          </ListGroup.Item>
                          {/* <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 15,000
                          </ListGroup.Item> */}
                          <div className="conatiner m-4 ">
                            <p className="flex justify-center text-[11px] ">
                              Book Now, And Avail offer upto 20% off
                            </p>
                          </div>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://www.positivemindcare.com/appointments/"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/Woman characters having business conversation or meeting.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Psychological Counselling
                      </Card.Title>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text>
                      <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Upto Rs. 400
                      </Card.Text>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text>

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            Single Session Charge Rs 1,200
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Monthly Plan - 04 Sessions - Rs 4,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Quarterly Plan - 12 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 15,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 20,000
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/positive-mind-care"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}

              {anxietyLevel === "Severe" && (
                <>
                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/doctors.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Psychiatrist Consultation
                      </Card.Title>
                      {/* <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text> */}
                      {/* <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Rs. 300
                      </Card.Text> */}
                      {/* <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text> */}

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            In Clinic - Rs 1000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Online - Rs 700
                          </ListGroup.Item>
                          {/* <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 15,000
                          </ListGroup.Item> */}
                          <div className="conatiner m-4 ">
                            <p className="flex justify-center text-[11px]">
                              Book Now, And Avail offer upto 20% off
                            </p>
                          </div>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://www.positivemindcare.com/appointments/"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    style={{ width: "20rem" }}
                    className="flex m-4 p-3 flex-grow-1 md:mr-4 mb-4 md:mb-0 "
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover h-48 w-24"
                      src="/Assets/Woman characters having business conversation or meeting.jpg"
                    />
                    <Card.Body>
                      <Card.Title className="flex justify-center tex">
                        Psychological Counselling
                      </Card.Title>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (45 minutes to 1-hour session)
                      </Card.Text>
                      <Card.Text className="text-[#d59438] text-lg fw-bold m-0 flex justify-center tex">
                        Upto Rs. 400
                      </Card.Text>
                      <Card.Text className="text-[#6b7280] text-sm flex justify-center tex">
                        (Per session charge)
                      </Card.Text>

                      <Card.Text>
                        <ListGroup className="flex text-xs" as="ul" id="">
                          <ListGroup.Item as="li">
                            Single Session Charge - Rs 1,200
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Monthly Plan - 04 Sessions - Rs 4,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Quarterly Plan - 12 Sessions - Rs. 10,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Half Yearly Plan - 25 Sessions - Rs. 15,000
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            Yearly Plan - 50 Sessions - Rs. 20,000
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                      <div className="flex justify-center">
                        <Button
                          href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/positive-mind-care"
                          variant="primary"
                          className="tex but"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* <ContactUs/> */}

        {console.log({ updatedTotalScore })}
        {console.log({ currentColor })}
      </article>
    </div>
  );
}

export default Resultpage;
