import React, { useEffect, useState } from "react";
import "../pages/Project.css";
import logo from "../Images/TestLogo.svg";
import home from "../Images/home_FILL0_wght300_GRAD0_opsz24.svg";
import group from "../Images/group_FILL0_wght300_GRAD0_opsz24.svg";
import calendar from "../Images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import message from "../Images/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import transaction from "../Images/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import woman from "../Images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";
import settings from "../Images/settings_FILL0_wght300_GRAD0_opsz24.svg";
import more from "../Images/more_vert_FILL0_wght300_GRAD0_opsz24.svg";
import search from "../Images/search_FILL0_wght300_GRAD0_opsz24.svg";
import moree from "../Images/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";
import emily from "../Images/Layer 8.png";
import respiratory from "../Images/respiratory rate.jpg";
import heart from "../Images/HeartBPM.jpg";
import temp from "../Images/temperature.jpg";
import arrowdown from "../Images/ArrowDown.svg";
import layer1 from "../Images/Layer 1.png";
import layer10 from "../Images/Layer 10.png";
import layer12 from "../Images/Layer 12.png";
import layer2 from "../Images/Layer 2-1.png";
import layer3 from "../Images/Layer 3.png";
import layer14 from "../Images/Layer 2.png";
import birthicon from "../Images/BirthIcon.svg";
import femaleIcon from "../Images/FemaleIcon.svg";
import phoneIcon from "../Images/PhoneIcon.svg";
import insurance from "../Images/InsuranceIcon.svg";
const Project = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = "coalition";
      const password = "skills-test";
      const encodedEntry = btoa(`${username}:${password}`);

      try {
        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${encodedEntry}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length < 4) {
    return <div>Loading...</div>;
  }

  const taylor = data[3]

  const diagHistory = data[3].diagnosis_history

  const marchHis = diagHistory[0].heart_rate.value

  const marchTemp = diagHistory[0].heart_rate.levels

  const tempe = diagHistory[0].temperature.value

  const tempeLevel = diagHistory[0].temperature.levels

  const repirateRate = diagHistory[0].respiratory_rate.value

  const respirateValue = diagHistory[0].respiratory_rate.levels
 


  return (
    <div className="page-container">
      <div className="inner-container">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="overview-div">
            <div className="overview-content">
              <img src={home} alt="overview"></img>
              <span>Overview</span>
            </div>

            <div className="  overview-content">
              <img src={group} alt="overview"></img>
              <span>Patient</span>
            </div>

            <div className="overview-content">
              <img src={calendar} alt="overview"></img>
              <span>Schedule</span>
            </div>

            <div className="overview-content">
              <img src={message} alt="overview"></img>
              <span>Message</span>
            </div>

            <div className="overview-content">
              <img src={transaction} alt="overview"></img>
              <span>Transactions</span>
            </div>
          </div>
          <div className="contact">
            <div className="contact-img">
              <div>
                <img src={woman} alt="woman"></img>
              </div>
              <div>
                <div className="woman-details">
                  <h5>Dr. Jose Simmons</h5>
                  <p>General Practitioner</p>
                </div>
              </div>
            </div>
            <div className="contact-icon">
              <img src={settings} alt="settings"></img>
              <img src={more} alt="more "></img>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="patient-contact">
            <div className="patient-header">
              <h3>Patients</h3>
              <img src={search} alt="search"></img>
            </div>
            <div className="contact-list-container">
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={emily} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Emilly Williams</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">18</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer1} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Ryan Johnson</h5>
                      <span className="sex-age">Male, </span>
                      <span className="sex-age">45</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer3} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Brandon Mitchell</h5>
                      <span className="sex-age">Male, </span>
                      <span className="sex-age">36</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer2} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Jesical Taylor </h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">28</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer10} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Samantha Johnson</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">56</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer12} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Ashey Martinez</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">54</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={layer10} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Olivia Brown</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">32</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={emily} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Emilly Williams</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">18</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={emily} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Emilly Williams</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">18</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-img">
                  <div>
                    <img src={emily} alt="woman"></img>
                  </div>
                  <div>
                    <div className="woman-details">
                      <h5>Emilly Williams</h5>
                      <span className="sex-age">Female, </span>
                      <span className="sex-age">18</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img className="moreimg" src={moree} alt="more"></img>
                </div>
              </div>
            </div>
          </div>
          <div className="history">
            <h2>Diagnosis History</h2>
            <div className="chart-section"></div>
            <div className="chart-card-container">
              <div className="chart-card">
                <div className="img-div">
                  <img src={respiratory} alt="respirator"></img>
                  <div className="card-details">
                    <p>Respiratory Rate</p>
                    <h4>{repirateRate} bpm</h4>
                  </div>
                  <div className="normal">{respirateValue}</div>
                </div>
              </div>

              <div className="chart-card second">
                <div className="img-div">
                  <img src={temp} alt="respirator"></img>
                  <div className="card-details">
                    <p>Temperature</p>
                    <h4>{tempe}  °F</h4>
                  </div>
                  <div className="normal">{tempeLevel}</div>
                </div>
              </div>

              <div className="chart-card third">
                <div className="img-div">
                  <img src={heart} alt="respirator"></img>
                  <div className="card-details">
                    <p>Heart Rate</p>
                    <h4>{marchHis} bpm</h4>
                  </div>
                  <div className="lower">
                    <img src={arrowdown} alt="lower"></img>
                    <span className="normal"> {marchTemp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile">
            <div className="profile-wrapper">
              <div className="imgprofile-div">
                <img src={taylor.profile_picture} alt="profile-img"></img>
                <div>{taylor.name}</div>
              </div>

              <div className="details-container">
                <div className="details-wrapperr">
                  <div className="details-list">
                    <div className="contact-img">
                      <div className="icon-img">
                        <img src={birthicon} alt="woman"></img>
                      </div>
                      <div>
                        <div className="woman-detailss">
                          <p>Date of Birth</p>
                          <h3 className="sex-agee">
                        
                            {taylor.date_of_birth}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-wrapperr">
                  <div className="details-list">
                    <div className="contact-img">
                      <div className="icon-img">
                        <img src={femaleIcon} alt="woman"></img>
                      </div>
                      <div>
                        <div className="woman-detailss">
                          <p>Gender</p>
                          <h3 className="sex-agee">{data[3].gender} </h3>
                          <span className="sex-age"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-wrapperr">
                  <div className="details-list">
                    <div className="contact-img">
                      <div className="icon-img">
                        <img src={phoneIcon} alt="woman"></img>
                      </div>
                      <div>
                        <div className="woman-detailss">
                          <p>Contact Info</p>
                          <h3 className="sex-agee">
                            {data[3].phone_number}
                          </h3>
                          <span className="sex-age"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 
                <div className="details-wrapperr">
                  <div className="details-list">
                    <div className="contact-img">
                      <div className="icon-img">
                        <img src={phoneIcon} alt="woman"></img>
                      </div>
                      <div>
                        <div className="woman-detailss">
                          <p>Emmergency Contact</p>
                          <h3 className="sex-agee">{taylor.emergency_contact}</h3>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-wrapperr">
                  <div className="details-list">
                    <div className="contact-img">
                      <div className="icon-img">
                        <img src={insurance} alt="woman"></img>
                      </div>
                      <div>
                        <div className="woman-detailss">
                          <p>Insurance Provider</p>
                          <h3 className="sex-agee">
                       {taylor.insurance_type}
                          </h3>
                          <span className="sex-age"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
