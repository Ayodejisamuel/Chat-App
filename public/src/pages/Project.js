// import React from "react";
// import "../pages/Project.css";

// const Transaction = () => {
//   // if i want to display it dynamically..diferent transactions
//   const transactions = [
//     {
//       service: "mtn Airtime VTU",
//       mobilenumber: '09068562949',
//       amount: "₦100.00",
//       totalAmount: "₦100.00",
//       status: "Successful",
//       paymentMethod: "Transfer",
//       transactionNo: "17045621860850336938179613",
//       transactioDate: '6th January, 2024, 06:29PM'
//     },
//     // Add more sample data as needed
//   ];

//   return (
//     <div className="transaction-container">
//       <div className="transaction-header">
//         <span className="header-item">Service</span>
//         <div className="header-item">Amount</div>
//         <div className="header-item">Total Amount</div>
//         <span className="header-item">Status</span>
//         <span className="header-item">Payment Method</span>
//         <span className="header-item">Transaction No</span>
//         <span className="header-item">Actions</span>
//       </div>
//       {transactions.map((transaction, index) => (
//         <div key={index} className="transaction-details">
//           <div className="details-item">{transaction.service}<br /><span>{transaction.mobilenumber}</span></div>
//           <div className="details-item">{transaction.amount}</div>
//           <div className="details-item">{transaction.totalAmount}</div>
//           <div className="details-item">{transaction.status}</div>
//           <div className="details-item">{transaction.paymentMethod}</div>
//           <div className="details-item">{transaction.transactionNo}<br /><span>{transaction.transactioDate}</span></div>
//           <div className="details-item">
//             <button className="action-button">Open</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Transaction

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
 

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [firstMonth, setFirstMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "coalition";
        const password = "skills-test";

        const encodedEntry = btoa(`${username}:${password}`);

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
          console.log("Error loading response");

          return;
        }

        const data = await response.json();

        const jessica = data.find(
          (patient) => patient.name === "Jessica Taylor"
        );

        setSelectedPatient(jessica);

        console.log(jessica);
        if (data) {
        } else {
          console.log("Jessica Taylor contact is  not found");
        }
      } catch (error) {
        console.log("Error showing request for Jessica", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      selectedPatient &&
      selectedPatient.diagnosis_history &&
      selectedPatient.diagnosis_history.length > 0
    ) {
      const [firstMonth] = selectedPatient.diagnosis_history;

      setFirstMonth(firstMonth);
    }
  }, [selectedPatient]);

  const dateFormat = (dateString) => {
    const values = new Date(dateString);
    return values.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
              <span>Patients</span>
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

              {selectedPatient ? (
                <div className="contact-list">
                  <div className="contact-img">
                    <div>
                      <img src={layer12} alt="woman"></img>
                    </div>
                    <div>
                      <div className="woman-details">
                        <h5>{selectedPatient.name}</h5>
                        <span class Name="sex-age">
                          {selectedPatient.gender},{" "}
                        </span>
                        <span className="sex-age">{selectedPatient.age}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img className="moreimg" src={moree} alt="more"></img>
                  </div>
                </div>
              ) : (
                <div>No patient data found</div>
              )}
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
            <div className="">
              {firstMonth ? (
                <div className="chart-card-container">
                  <div className="chart-card">
                    <div className="img-div">
                      <img src={respiratory} alt="respirator"></img>
                      <div className="card-details">
                        <p>Respiratory Rate</p>
                        <h4>{firstMonth.respiratory_rate.value} bpm</h4>
                      </div>
                      <div className="normal">
                        {firstMonth.respiratory_rate.levels}
                      </div>
                    </div>
                  </div>

                  <div className="chart-card second">
                    <div className="img-div">
                      <img src={temp} alt="respirator"></img>
                      <div className="card-details">
                        <p>Temperature</p>
                        <h4>{firstMonth.temperature.value} °F</h4>
                      </div>
                      <div className="normal">
                        {firstMonth.temperature.levels}
                      </div>
                    </div>
                  </div>

                  <div className="chart-card third">
                    <div className="img-div">
                      <img src={heart} alt="respirator"></img>
                      <div className="card-details">
                        <p>Heart Rate</p>
                        <h4>{firstMonth.heart_rate.value} bpm</h4>
                      </div>
                      <div className="lower">
                        <img src={arrowdown} alt="lower"></img>
                        <span className="normal">
                          {firstMonth.heart_rate.levels}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>No Data found</div>
              )}
            </div>
          </div>

          <div className="profile">
            {selectedPatient ? (
              <div>
                <div className="profile-wrapper">
                  <div className="imgprofile-div">
                    <img
                      src={selectedPatient.profile_picture}
                      alt="profile-img"
                    ></img>
                    <div></div>
                  </div>

                  <div className="details-container">
                    <div className="details-wrapper">
                      <div className="details-list">
                        <div className="contact-img">
                          <div className="icon-img">
                            <img src={birthicon} alt="woman"></img>
                          </div>
                          <div>
                            <div className="woman-details">
                              <p>Date of Birth</p>
                              <span className="sex-agee">
                                {dateFormat(selectedPatient.date_of_birth)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="details-wrapper">
                      <div className="details-list">
                        <div className="contact-img">
                          <div className="icon-img">
                            <img src={femaleIcon} alt="woman"></img>
                          </div>
                          <div>
                            <div className="woman-details">
                              <p>Gender</p>
                              <span className="sex-agee">
                                {selectedPatient.gender}
                              </span>
                              <span className="sex-age"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="details-wrapper">
                      <div className="details-list">
                        <div className="contact-img">
                          <div className="icon-img">
                            <img src={phoneIcon} alt="woman"></img>
                          </div>
                          <div>
                            <div className="woman-details">
                              <p>Contact Info</p>
                              <span className="sex-agee">
                                {selectedPatient.phone_number}
                              </span>
                              <span className="sex-age"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="details-wrapper">
                      <div className="details-list">
                        <div className="contact-img">
                          <div className="icon-img">
                            <img src={phoneIcon} alt="woman"></img>
                          </div>
                          <div>
                            <div className="woman-details">
                              <p>Emmergency Contact</p>
                              <span className="sex-agee">
                                {selectedPatient.emergency_contact}
                              </span>
                              <span className="sex-age"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="details-wrapper">
                      <div className="details-list">
                        <div className="contact-img">
                          <div className="icon-img">
                            <img src={insurance} alt="woman"></img>
                          </div>
                          <div>
                            <div className="woman-details">
                              <p>Insurance Provider</p>
                              <span className="sex-agee">
                                {selectedPatient.insurance_type}
                              </span>
                              <span className="sex-age"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>No data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
