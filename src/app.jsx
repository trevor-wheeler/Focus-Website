import React, { useContext, useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { delay } from 'motion';
import { div } from 'motion/react-client';

export default function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home2 />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const word = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const AnimatedText = ({ text, delay }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      variants={sentence}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      style={{ display: "block" }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span 
          key={i} 
          variants={word}
          style={{ display: "inline" }}
        >
          {w + " "}
        </motion.span>
      ))}
    </motion.div>
  );
};

function GetUserCount({ count2 }) {
  const count1 = useMotionValue(Number(count2) - 25);
  const rounded = useTransform(() => Math.round(count1.get()));

  const text = {
    color: '#000',
    fontSize: '1.3rem',
  }

    useEffect(() => {
        const controls = animate(count1, Number(count2), { duration: 3 })
        return () => controls.stop()
    }, []);

    return <motion.h4 style={text}>{rounded}</motion.h4>
}

function Home2() {
  const scrollRef = useRef(null);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {

    const getUserCount = async () => {
      try {
        const response = await fetch('https://api.getfocus.cc/user_count'); // CHANGE THIS LATER IMPORTANT !!!
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        console.log(data.userCount);
        setUserCount(data.userCount);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    }

    getUserCount();
  }, []);

  return (
    <div className='home2-container'>
      <motion.div className='home2-header'
        initial={{ height: '0px' }}
        animate={{ height: '400px' }}
        transition={{ height: { type: "spring", bounce: 0.2 } }}
      >
        <motion.div className='home2-title-container'
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
          <h4 className='home2-title'>Short-Form Content Blocker</h4>
        </motion.div>
        
        <motion.div className='mockup-bg' 
          style={{top: '35px', pointerEvents: 'none'}}
          initial={{ y: 100, scale: 0.5 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ y: { type: "spring", bounce: 0.2 } }}
        >
          <div className='mockup-header'>
            <svg className='mockup-logo' width="30" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#ececec" fillRule="evenodd"></path></g></svg>
            <svg width="75" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path className="logo" id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#ececec" fillRule="evenodd"></path></g></svg>
          </div>

          <div className='mockup-main'>
            <div className='mockup-page-container'>
              <div className="mockup-page">
                <span className="mockup-title">
                  <div className="mockup-back-btn"><i className="bi bi-caret-left-fill mockup-back"></i>Back</div>
                  <i className="bi bi-youtube mockup-label-icon"></i>
                </span>
                <ul className="mockup-options-list">
                  <li className="mockup-option-tile">
                    <div className="form-check form-switch form-check-mockup form-switch-mockup">
                      <div className="mockup-toggle-btn"></div>
                      <input className="form-check-input form-check-input-mockup" data-option="yt-shorts-home" type="checkbox" role="switch" checked readOnly></input>
                    </div>
                    Shorts
                  </li>
                  <li className="mockup-option-tile">
                    <div className="form-check form-switch form-check-mockup form-switch-mockup">
                      <div className="mockup-toggle-btn"></div>
                      <input className="form-check-input form-check-input-mockup" data-option="yt-shorts-home" type="checkbox" role="switch" checked readOnly></input>
                    </div>
                    Shorts Page
                  </li>
                  <li className="mockup-option-tile mockup-option-disabled">
                    <div className="form-check form-switch form-check-mockup form-switch-mockup">
                      <div className="mockup-toggle"></div>
                      <input className="form-check-input form-check-input-mockup" data-option="yt-shorts-home" type="checkbox" role="switch"></input>
                    </div>
                    Shorts in Search
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className='mockup-label'>More <i className="bi bi-three-dots-vertical mockup-label-icon"></i></div>
              <ul className="mockup-more-list">
                <li className="mockup-more-tile donate"><i className="bi bi-piggy-bank-fill"></i>Tips</li>
                <li className="mockup-more-tile"><i className="bi bi-envelope-fill mockup-more-btn"></i></li>
                <li className="mockup-more-tile"><i className="bi bi-gear-fill mockup-more-btn"></i></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <main className='home2-main' ref={scrollRef}>
        <div className='home2-content'>
          <section className='home2-download-links'>
            <motion.span className='home2-heading-alt text1'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ scale: { type: "spring", bounce: 0.35, delay: 0.4 }, opacity: { delay: 0.4} }}
            >
              { userCount ? <><GetUserCount count2={userCount}/><h4 style={{fontSize: '1.3rem'}}>&nbsp;active users</h4></> : ""}
            </motion.span>
            <motion.img
              className='home2-download-btn'
              src="/chrome_128x128.png" 
              alt="Download for Chrome"
              onClick={() => window.open("https://chromewebstore.google.com/detail/focus-short-form-content/bbobcnmcegmkheaimcepkmcmnaaomagn", "_blank")}
              initial={{ y: 50, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ y: { type: "spring", bounce: 0.5, delay: 0.2 }, opacity: { duration: 0.1, delay: 0.2 }, scale: {duration: 0.1} }}
              whileHover={{ 
                scale: 1.07,
                transition: { duration: 0.1 }
              }}
              whileTap={{ 
                scale: 1.03,
              }}
            />
            <motion.img
              className='home2-download-btn'
              src="/firefox_128x128.png" 
              alt="Download for Firefox"
              onClick={() => alert("Coming soon!")}
              initial={{ y: 50, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ y: { type: "spring", bounce: 0.5, delay: 0.3 }, opacity: { duration: 0.1, delay: 0.3 }, scale: {duration: 0.1} }}
              style={{ width: '92px', height: '92px' }}
              whileHover={{ 
                scale: 1.07,
                transition: { duration: 0.1 }
              }}
              whileTap={{ 
                scale: 1.03,
              }}
            />
            <motion.img
              className='home2-download-btn'
              src="/edge_128x128.png" 
              alt="Download for Edge"
              onClick={() => alert("Coming soon!")}
              initial={{ y: 50, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ y: { type: "spring", bounce: 0.5, delay: 0.4 }, opacity: { duration: 0.1, delay: 0.4 }, scale: {duration: 0.1} }}
              whileHover={{ 
                scale: 1.07,
                transition: { duration: 0.1 }
              }}
              whileTap={{ 
                scale: 1.03,
              }}
            />
          </section>
          <section className='home2-section'>
          <motion.h4 className='home2-heading text1'
            initial={{ x: -50, opacity: 0, width: '0px' }}
            animate={{ x: 0, opacity: 1, width: 'fit-content' }}
            transition={{ x: {delay: 0.3}, opacity: {delay: 0.3}, width: { delay: 0.5, duration: 0.2 } }}
          >
            What is Focus?
          </motion.h4>
          
          <div className='home2-paragraph text2'><AnimatedText delay={300} text="Focus is a browser extension that lets you hide Reels and Shorts from YouTube, Instagram, and FaceBook, directing your focus  toward more meaningful, long-form content. Whether you're looking to remove Reels, hide Shorts, or just spend less time on social media, Focus can do it all across multiple websites." /></div>
          </section>
          
          <section className='home2-section'>
          <motion.h4 className='home2-heading text1'
            initial={{ x: -50, opacity: 0, width: '0px' }}
            animate={{ x: 0, opacity: 1, width: 'fit-content' }}
            transition={{ x: {delay: 0.5}, opacity: {delay: 0.5}, width: { delay: 0.7, duration: 0.2 } }}
          >
            Included Features
          </motion.h4>

          <div className='home2-features-container'>
            <motion.div className='home2-feature'
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ x: { type: "spring", bounce: 0.5, delay: 0.6 }, opacity: { duration: 0.1, delay: 0.6 } }}
            >
              <h4 className='feature-heading text1'><i className="feature-icon bi bi-youtube"></i>YouTube</h4>
              <ul className='feature-list home2-feature-list text2'>
                <li className='home2-feature-label'>Block Shorts</li>
                <li className='home2-feature-label'>Hide Shorts page</li>
                <li className='home2-feature-label'>Remove Shorts from search results</li>
              </ul>
            </motion.div>
            <div className='feature-spacer'></div>
            <motion.div className='home2-feature'
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ x: { type: "spring", bounce: 0.5, delay: 0.7 }, opacity: { duration: 0.1, delay: 0.7 } }}
            >
              <h4 className='feature-heading text1'><span className='gradient'><i className="feature-icon bi bi-instagram"></i></span>Instagram</h4>
              <ul className='feature-list home2-feature-list text2'>
                <li className='home2-feature-label'>Block Reels</li>
                <li className='home2-feature-label'>Hide Reels page</li>
                <li className='home2-feature-label'>Hide Explore page</li>
                <li className='home2-feature-label'>Blur Reels in DMs</li>
              </ul>
            </motion.div>
            <div className='feature-spacer'></div>
            <motion.div className='home2-feature'
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ x: { type: "spring", bounce: 0.5, delay: 0.8 }, opacity: { duration: 0.1, delay: 0.8 } }}
            >
              <h4 className='feature-heading text1'><i className="feature-icon bi bi-facebook"></i>Facebook</h4>
              <ul className='feature-list home2-feature-list text2'>
                <li className='home2-feature-label'>Block Reels</li>
                <li className='home2-feature-label'>Hide Reels page</li>
                <li className='home2-feature-label'>Blur Reels in Facebook Messenger</li>
              </ul>
            </motion.div>
          </div>

          </section>

          <section className='home2-section'>
          <motion.h4 className='home2-heading text1'
            initial={{ x: -50, opacity: 0, width: '0px' }}
            animate={{ x: 0, opacity: 1, width: 'fit-content' }}
            transition={{ x: {delay: 0.7}, opacity: {delay: 0.7}, width: { delay: 0.9, duration: 0.2 } }}
          >
            Privacy policy
          </motion.h4>
          <div className='home2-paragraph text2'><AnimatedText delay={700} text="Focus does not collect any personally identifiable information from it's users. It only records whether a user has opted in to certain features by sending simple true/false values to a server. This data is used solely to track an anonymous opt-in status and improve user experience. No other data is collected, stored, or shared." /></div>
          </section>
        </div>
      </main>
    </div>
  )
}

function openchromepage() {
  window.open("https://chromewebstore.google.com/detail/focus-short-form-content/bbobcnmcegmkheaimcepkmcmnaaomagn", "_blank");
}

function Home() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 900; // your design width
      const screenWidth = window.innerHeight;
      const newScale = Math.min(screenWidth / baseWidth);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch('https://chromewebstore.google.com/detail/focus-short-form-content/bbobcnmcegmkheaimcepkmcmnaaomagn')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const usercount = doc.querySelector('.F9iKBc').children[2];
      console.log(usercount);
    })
    .catch(err => console.error('Failed to fetch:', err));
  }, []);

  return (
    <>
        <motion.div 
        className='home-container'
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        
        >
          <motion.div
            className='home-title-container'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#000" fillRule="evenodd"></path></g></svg>
            <h4 className='tos-title2 text1'>Short-Form Content Blocker</h4>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              scale: { type: "spring", bounce: 0.35, delay: 0.3 },
            }}
          >
            <motion.div 
              className='home-btn-border'
              transition={{
                duration: 0.1
              }}
              whileHover={{ 
                scale: 1.07,
                transition: { duration: 0.1 }
              }}
              whileTap={{ 
                scale: 1.03,
              }}
            >
              <button onClick={openchromepage} className='download-btn'><span className='gradient-text'>Download for Chrome</span></button>
            </motion.div>
          </motion.div>
          <div className='feature-spacer'></div>
          <motion.div 
            className='paragraph-heading-container'
            initial={{ right: 25, opacity: 0}}
            animate={{ right: 0, opacity: 1}}
            transition={{
              duration: 2,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h4 className='paragraph-heading text1'>What is Focus?</h4>
          </motion.div>
          <motion.div 
            style={{ position: 'relative' }}
            initial={{ left: 25, opacity: 0}}
            animate={{ left: 0, opacity: 1}}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <p className='home-paragraph text2'>Focus is a browser extension that lets you hide Reels and Shorts from YouTube, Instagram, and FaceBook, directing your focus toward more meaningful, long-form content. Whether you're looking to remove Reels, hide Shorts, or just spend less time on social media, Focus can do it all across multiple websites.</p>
          </motion.div>
          <div className='feature-spacer'></div>
          <motion.div 
            className='paragraph-heading-container'
            initial={{ right: 25, opacity: 0}}
            animate={{ right: 0, opacity: 1}}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h4 className='paragraph-heading text1'>Included Features</h4>
          </motion.div>
          <div className='features-container'>
            <motion.div 
              className='feature'
              style={{ position: 'relative' }}
              initial={{ left: 100, opacity: 0}}
              animate={{ left: 0, opacity: 1}}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h4 className='feature-heading text1'><i className="feature-icon bi bi-youtube"></i>YouTube</h4>
              <ul className='feature-list text2'>
                <li className='feature-label'>Block Shorts</li>
                <li className='feature-label'>Hide Shorts page</li>
                <li className='feature-label'>Remove Shorts from search results</li>
              </ul>
            </motion.div>
            <div className='feature-spacer'></div>
            <motion.div 
              className='feature'
              style={{ position: 'relative' }}
              initial={{ left: 100, opacity: 0}}
              animate={{ left: 0, opacity: 1}}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h4 className='feature-heading text1'><span className='gradient'><i className="feature-icon bi bi-instagram"></i></span>Instagram</h4>
              <ul className='feature-list text2'>
                <li className='feature-label'>Block Reels</li>
                <li className='feature-label'>Hide Reels page</li>
                <li className='feature-label'>Hide Explore page</li>
                <li className='feature-label'>Blur Reels in DMs</li>
              </ul>
            </motion.div>
            <div className='feature-spacer'></div>
            <motion.div 
              className='feature'
              style={{ position: 'relative' }}
              initial={{ left: 100, opacity: 0}}
              animate={{ left: 0, opacity: 1}}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h4 className='feature-heading text1'><i className="feature-icon bi bi-facebook"></i>Facebook</h4>
              <ul className='feature-list text2'>
                <li className='feature-label'>Block Reels</li>
                <li className='feature-label'>Hide Reels page</li>
                <li className='feature-label'>Blur Reels in Facebook Messenger</li>
              </ul>
            </motion.div>
          </div>
          <div className='feature-spacer'></div>
        </motion.div>
    </>
  );
}

function Nav() {
  return (
    <nav>
      <ul className='nav-icons'>
        <li><svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#212529" fillRule="evenodd"></path></g></svg></li>
        <li></li>
      </ul>
    </nav>
  );
}

function toggle() {
    const btn = document.querySelector('.form-check-input');
    btn.checked = !btn.checked;
}

function changePage(page) {
  const settingsPage = document.querySelectorAll('.settings-page');
  const TOSPage = document.querySelectorAll('.tos-page');

  if (page === 'settings') {
    TOSPage.forEach(section => {
      section.style.transform = 'translateX(-422px)';
    });
    settingsPage.forEach(section => {
      section.style.transform = 'translateX(-422px)';
    })
  }
  else if (page === 'tos') {
    TOSPage.forEach(section => {
      section.style.transform = 'translateX(0)';
    });
    settingsPage.forEach(section => {
      section.style.transform = 'translateX(0)';
    })
  }
}

function TOS() {

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.title = "Terms of Service";
  }, []);



  return (
    <div className='tos-container'>
      <motion.div
        className='tos-title-container text1'
        style={{ position: 'relative' }}
        initial={{ opacity: 0, scale: 0.5, x: 0 }}
        animate={
          agreed
            ? {
                opacity: [1, 1, 0],       // stays 1, then fades
                x: [0, 50, -600],         // bounce right, then left
                scale: 1,
              }
            : {
                opacity: 1,
                x: 0,
                scale: 1,
              }
        }
        transition={
          agreed
            ? {
                x: {
                  duration: 0.8,
                  times: [0, 0.2, 1],
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.8,
                  times: [0, 0.5, 1], // opacity stays at 1 until halfway
                  ease: 'easeInOut',
                },
              }
            : {
                duration: 1,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
              }
        }
      >
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#000" fillRule="evenodd"></path></g></svg>
        <h4 className='tos-title2'>Short-Form Content Blocker</h4>
      </motion.div>
      <motion.div 
        className='tos-border'
        style={{ position: 'relative' }}
        initial={{ opacity: 0.5, scale: 0.5, x: 0 }}
        animate={
          agreed
            ? {
                opacity: [1, 1, 0],       // stays 1, then fades
                x: [0, 50, -600],         // bounce right, then left
                scale: 1,
              }
            : {
                opacity: 1,
                x: 0,
                scale: 1,
              }
        }
        transition={
          agreed
            ? {
                x: {
                  delay: 0.075,
                  duration: 0.8,
                  times: [0, 0.2, 1],
                  ease: 'easeInOut',
                },
                opacity: {
                  delay: 0.075,
                  duration: 0.8,
                  times: [0, 0.5, 1], // opacity stays at 1 until halfway
                  ease: 'easeInOut',
                },
              }
            : {
                scale: { type: "spring", bounce: 0.35 },
              }
        }
      >
        <div className='tos-background'>
          <div className='tos-page tos'>
            <h4 className='tos-heading text1'>Terms of Service</h4>
            <div className='tos-paragraphs text2'>
              <p className='tos-paragraph'>This extension includes the open-source Mellowtel library. Mellowtel helps keep this service free and accessible to everyone.</p>
              <p className='tos-paragraph'>Before proceeding, please take a moment to review and agree to the following terms of service.</p>
              <p className='tos-paragraph'>By clicking "Agree and continue" you are permitting this exstension to share a small fraction of your unused internet bandwidth with trusted start ups and non profits who use it to access the internet. A portion of the revenue generated is allocated to this extension to maintain its free availability.</p>
              <p className='tos-paragraph'>Mellowtel shares internet bandwidth only. Security, privacy and speed of browsing are guaranteed. If you wish to opt out, you can do so at any time from the settings page.</p>
              <p className='tos-last-paragraph'>For more information, or if you wish to view the Mellowtel source code click <a  className='tos-link' href='https://www.mellowtel.com/' target="_blank">here.</a></p>
            </div>
          </div>
          <div className='settings-page tos'>
            <h4 className='tos-heading text1'>Manage Settings</h4>
            <div className='tos-paragraphs text2'>
              <p className='tos-paragraph'>Mellowtel helps keep this extension free and available. You can decide to opt in or out whenever you want.</p>
              <div className='settings-paragraph'><i className="bi bi-router settings-icon text1"></i><p>Mellowtel shares a fraction of your unused bandwidth with trusted companies that use it to access the internet. A portion of the revenue is shared with this extension to keep it free and available.</p></div>
              <div className='settings-paragraph'><i className="bi bi-shield-lock settings-icon text1"></i><p>Security, privacy and speed of browsing are guaranteed. You can opt in or opt out by using the toggle button on the settings page.</p></div>
              <div className='settings-paragraph tos-last-paragraph'><i className="bi bi-stars settings-icon text1"></i><p>Mellowtel is used by hundreds of thousands of users. By opting in you will join this growing network. If you choose to opt out, you will no longer be a part of the network and no requests will be sent to you.</p></div>
            </div>    
          </div>        
        </div>
        <div className='tos-btn-container-background'>
          <div className='tos-btn-container tos-page'>
            <button className='tos-btn settings-btn' onClick={() => changePage('settings')}><i className="tos-btn-icon bi bi-gear-fill"></i> <span className='tos-btn-text'>Manage settings</span></button>
            <motion.div
              style={{ flexGrow: 1 }}
              transition={{
                duration: 0.1
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ 
                scale: 1.01,
              }}
            >
              <button onClick={() => setAgreed(true)} id='agree-btn' className='tos-btn'><i className=" tos-btn-icon bi bi-shield-fill-check"></i> <span className='tos-btn-text'>Agree and continue</span></button>
            </motion.div>
          </div>
          <div className='tos-btn-container settings-page'>
            <button className='back-btn' onClick={() => changePage('tos')}><span className='tos-btn-text'>Back</span></button>
            <div className='toggle-container'>
              <span className='opt-in-label text2'>Opt in</span>
              <div className="form-check form-switch form-check-tos form-switch-tos">
                <div id='toggle-btn' onClick={toggle}>
                  <input id='tos-optin-checkbox' className="form-check-input form-check-input-tos" data-option="focus-mellowtel" type="checkbox" role="switch" checked readOnly></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Contact() {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <div className='container'>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc7HMKELJrEmwo5dwksi-O_M1d3cwbFF4lFo-qydnjz3wYm3A/viewform?embedded=true" width="640" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </div>
  );
}

function Privacy() {
  return (
    <div className='tos-container'>
      <motion.div
        className='tos-title-container text1'
        style={{ position: 'relative' }}
        initial={{ opacity: 0, scale: 0.5, x: 0 }}
        animate={
          {
            opacity: 1,
            x: 0,
            scale: 1,
          }
        }
        transition={
          {
            duration: 1,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }
        }
      >
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#000" fillRule="evenodd"></path></g></svg>
        <h4 className='tos-title2'>Short-Form Content Blocker</h4>
      </motion.div>
      <motion.div 
        className='privacy-border'
        style={{ position: 'relative', background: 'transparent'}}
        initial={{ opacity: 0.5, scale: 0.5, x: 0 }}
        animate={
          {
            opacity: 1,
            x: 0,
            scale: 1,
          }
        }
        transition={
          {
            scale: { type: "spring", bounce: 0.35 },
          }
        }
      >
        <div className='privacy-background'>
          <div className='tos-page tos privacy-page'>
            <h4 className='tos-heading text1'>Privacy Policy</h4>
            <div className='tos-paragraphs text2'>
              <p className='tos-paragraph'>This extension does not collect any personally identifiable information.</p>
              <p className='tos-paragraph'>It only records whether a user has opted in to certain features by sending a simple true/false value to a server.</p>
              <p className='tos-paragraph'>This data is used solely to track anonymous opt-in status and improve user experience.</p>
              <p className='tos-last-paragraph'>No other data is collected, stored, or shared.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Media() {
  return (
    <div className='media-page' style={{backgroundColor: '#fff', height: '3000px'}}>
      <div className='small-promo-tile-bg'>
          <div className='store-icon small-promo-tile-icon'>
            <svg width="86" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
          </div>
        <div className='small-promo-tile-container text1'>
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#2b2b2b" fillRule="evenodd"></path></g></svg>
          <h4 className='tos-title2' style={{textAlign: 'center'}}>Short-Form Content Blocker</h4>
        </div>
      </div>

      <div className='store-icon'>
        <svg width="110" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
      </div>

      <div className='store-icon' style={{position: "relative", transform: 'scale(0.5)'}}>
        <svg width="110" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
      </div>

      <div className='store-icon' style={{position: "relative", transform: 'scale(0.375)'}}>
        <svg width="110" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
      </div>

      <div className='store-icon' style={{position: "relative", transform: 'scale(0.25)'}}>
        <svg width="110" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
      </div>

      <div className='store-icon' style={{position: "relative", transform: 'scale(0.125)'}}>
        <svg width="110" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
      </div>

    <svg width="48" viewBox="0, 0, 400,402.6845637583893">
      <defs>
        <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="50%" stopColor="#ee2a7b" />
          <stop offset="100%" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="url(#instaGradient)" fillRule="evenodd"></path></g>



    </svg>
      <svg width="48" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>

      <div className='screenshot-promo-bg'>
        <div className='screenshot-title'>
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#fff" fillRule="evenodd"></path></g></svg>
          <h4 className='tos-title2' style={{textAlign: 'center', color: '#fff', marginBottom: '40px'}}>Short-Form Content Blocker</h4>
          <div className='mockup-bg'>
        <div className='mockup-header'>
          <svg className='mockup-logo' width="30" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#ececec" fillRule="evenodd"></path></g></svg>
          <svg width="75" viewBox="0, 0, 400,153.23383084577114"><g id="svgg"><path className="logo" id="path0" d="M122.536 1.751 C 119.829 6.131,99.987 8.306,84.354 5.936 C 65.317 3.051,38.718 3.047,28.018 5.928 C 5.864 11.893,-5.028 36.921,8.338 51.148 C 16.919 60.282,33.216 55.653,25.776 46.194 C 13.029 29.989,29.038 11.142,52.282 14.987 C 63.665 16.871,64.138 17.353,60.318 23.185 C 57.917 26.849,56.752 34.211,56.111 49.779 C 55.330 68.735,54.778 71.424,51.493 72.283 C 46.243 73.656,46.591 81.659,51.961 83.063 C 55.938 84.103,56.120 85.176,55.380 103.275 C 53.958 138.099,39.219 154.948,23.728 139.457 C 14.742 130.471,18.933 113.433,30.129 113.433 C 34.812 113.433,33.641 106.208,28.274 101.990 C 16.153 92.461,-0.008 105.599,0.007 124.969 C 0.022 143.833,10.929 153.234,32.801 153.234 C 63.088 153.234,79.602 133.093,79.602 96.156 L 79.602 81.592 91.329 81.592 C 100.324 81.592,103.346 80.838,104.299 78.355 C 106.682 72.145,101.841 69.576,90.312 70.931 L 79.602 72.190 79.602 47.332 L 79.602 22.474 89.986 25.167 C 114.446 31.512,130.627 24.190,128.975 7.524 C 128.356 1.277,124.799 -1.912,122.536 1.751 M345.205 51.570 C 338.706 54.325,337.159 57.459,330.593 81.165 C 315.821 134.506,308.809 136.179,307.947 86.567 L 307.463 58.706 297.724 58.706 L 287.986 58.706 284.484 76.005 C 273.121 132.129,260.553 137.802,263.875 85.308 C 265.394 61.290,264.839 59.792,254.392 59.732 C 243.561 59.670,242.786 60.883,242.786 77.904 C 242.786 113.200,210.640 139.872,202.872 111.022 C 199.909 100.019,202.131 83.448,207.673 75.225 C 215.510 63.595,222.449 69.103,216.070 81.890 C 212.444 89.158,214.607 93.532,221.826 93.532 C 239.202 93.532,236.167 61.826,218.408 57.823 C 197.421 53.092,184.136 65.088,178.119 94.201 C 176.941 99.902,168.982 109.453,165.408 109.453 C 164.263 109.453,163.909 105.185,164.542 99.005 C 168.250 62.810,134.951 43.537,114.680 70.147 C 100.369 88.934,104.126 125.802,121.390 136.000 C 133.865 143.369,154.083 136.383,158.246 123.265 C 158.919 121.146,161.872 118.900,164.809 118.275 C 167.746 117.649,171.991 116.402,174.241 115.504 C 177.763 114.097,178.924 115.157,182.573 123.104 C 192.318 144.330,217.371 145.533,235.345 125.638 L 242.530 117.685 243.756 123.269 C 248.086 142.985,271.415 143.419,281.300 123.968 L 286.016 114.689 288.339 121.728 C 293.864 138.467,310.045 143.579,320.493 131.886 C 324.613 127.275,326.335 126.395,327.139 128.492 C 332.734 143.073,366.773 142.253,375.855 127.319 C 377.947 123.879,382.883 118.874,386.823 116.197 C 394.818 110.764,400.000 102.281,400.000 94.626 C 400.000 86.676,392.906 87.862,390.129 96.277 C 386.324 107.807,380.861 111.149,379.312 102.893 C 378.544 98.799,373.780 91.222,367.192 83.614 L 356.338 71.080 361.253 65.238 C 369.773 55.114,358.829 45.793,345.205 51.570 M141.145 73.910 C 137.253 81.181,139.808 100.047,145.938 109.310 L 151.350 117.488 146.412 122.426 C 131.377 137.460,122.652 95.205,136.444 74.155 C 140.272 68.313,144.251 68.106,141.145 73.910 M153.970 82.090 C 154.630 84.552,155.155 90.597,155.136 95.522 C 155.093 107.225,151.577 101.909,149.879 87.574 C 148.670 77.365,151.637 73.386,153.970 82.090 M358.209 107.456 C 358.209 108.649,336.363 105.885,334.747 104.487 C 334.430 104.213,335.688 98.531,337.543 91.860 L 340.915 79.732 349.562 92.897 C 354.318 100.138,358.209 106.690,358.209 107.456 M355.001 120.398 C 354.494 124.911,345.562 127.341,341.845 123.977 C 336.246 118.910,337.657 117.137,346.766 117.796 C 351.418 118.133,355.123 119.303,355.001 120.398 " stroke="none" fill="#ececec" fillRule="evenodd"></path></g></svg>
        </div>

        <div className='mockup-main'>
          <div className='mockup-page-container'>
            <div className="mockup-page">
              <span className="mockup-title">
                <div className="mockup-back-btn"><i className="bi bi-caret-left-fill mockup-back"></i>Back</div>
                <i className="bi bi-youtube mockup-label-icon"></i>
              </span>
              <ul className="mockup-options-list">
                <li className="mockup-option-tile">
                  <div className="form-check form-switch">
                    <div className="mockup-toggle-btn"></div>
                    <input className="form-check-input" data-option="yt-shorts-home" type="checkbox" role="switch" checked></input>
                  </div>
                  Shorts
                </li>
                <li className="mockup-option-tile">
                  <div className="form-check form-switch">
                    <div className="mockup-toggle-btn"></div>
                    <input className="form-check-input" data-option="yt-shorts-home" type="checkbox" role="switch" checked></input>
                  </div>
                  Shorts Page
                </li>
                <li className="mockup-option-tile mockup-option-disabled">
                  <div className="form-check form-switch">
                    <div className="mockup-toggle"></div>
                    <input className="form-check-input" data-option="yt-shorts-home" type="checkbox" role="switch"></input>
                  </div>
                  Shorts in Search
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className='mockup-label'>More <i className="bi bi-three-dots-vertical mockup-label-icon"></i></div>
            <ul className="mockup-more-list">
              <li className="mockup-more-tile donate"><i className="bi bi-piggy-bank-fill"></i>Tips</li>
              <li className="mockup-more-tile"><i className="bi bi-envelope-fill mockup-more-btn"></i></li>
              <li className="mockup-more-tile"><i className="bi bi-gear-fill mockup-more-btn"></i></li>
            </ul>
          </div>
        </div>
      </div>
        </div>
        
      </div>

      <div className='screenshot-promo-bg-white'>
        <h4 className='paragraph-heading included-features' style={{textAlign: 'center'}}>Included Features</h4>
        <div className='features-container-ss'>
          <div className='feature-ss'>
            <h4 className='feature-heading text1'><i className="feature-icon bi bi-youtube"></i>YouTube</h4>
            <ul className='feature-list feature-list-ss text2'>
              <li className='feature-label'>Block Shorts</li>
              <li className='feature-label'>Hide Shorts page</li>
              <li className='feature-label'>Remove Shorts from search results</li>
            </ul>
          </div>
          <div className='feature-spacer'></div>
          <div className='feature-ss'>
            <h4 className='feature-heading text1'><span className='gradient'><i className="feature-icon bi bi-instagram"></i></span>Instagram</h4>
            <ul className='feature-list feature-list-ss text2'>
              <li className='feature-label'>Block Reels</li>
              <li className='feature-label'>Hide Reels page</li>
              <li className='feature-label'>Hide Explore page</li>
              <li className='feature-label'>Blur Reels in DMs</li>
            </ul>
          </div>
          <div className='feature-spacer'></div>
          <div className='feature-ss'>
            <h4 className='feature-heading text1'><i className="feature-icon bi bi-facebook"></i>Facebook</h4>
            <ul className='feature-list feature-list-ss text2'>
              <li className='feature-label'>Block Reels</li>
              <li className='feature-label'>Hide Reels page</li>
              <li className='feature-label'>Blur Reels in Facebook Messenger</li>
            </ul>
          </div>
        </div>
        <div className='background-image-ss'>
          <svg width="500" viewBox="0, 0, 400,402.6845637583893"><g id="svgg"><path className="logo" id="path0" d="M98.409 1.321 C 51.683 8.366,14.219 43.572,3.130 90.858 C -1.063 108.738,-0.538 299.468,3.747 314.765 C 15.506 356.751,45.886 387.135,87.919 398.948 C 104.766 403.683,295.234 403.683,312.081 398.948 C 354.223 387.105,384.429 356.897,396.262 314.765 C 401.036 297.765,401.032 106.700,396.257 87.919 C 386.058 47.804,356.480 17.012,316.107 4.481 L 304.027 0.731 204.698 0.501 C 150.067 0.375,102.237 0.744,98.409 1.321 M245.132 65.436 L 266.916 102.013 218.916 102.013 L 170.915 102.013 149.216 66.059 C 137.281 46.284,127.517 29.665,127.517 29.129 C 127.517 28.593,149.079 28.313,175.432 28.507 L 223.348 28.859 245.132 65.436 M302.685 30.200 C 334.978 36.957,370.470 73.929,370.470 100.813 C 370.470 101.489,354.981 102.013,335.033 102.013 L 299.596 102.013 278.321 66.243 C 266.620 46.569,256.846 29.958,256.600 29.330 C 255.837 27.383,292.530 28.076,302.685 30.200 M116.886 66.779 L 138.235 102.013 83.882 102.013 C 50.515 102.013,29.530 101.522,29.530 100.740 C 29.530 78.602,56.784 45.444,84.352 34.042 C 95.012 29.634,93.390 28.001,116.886 66.779 M371.765 211.074 C 371.716 296.785,371.278 304.033,365.229 319.216 C 355.391 343.906,332.415 364.127,305.857 371.465 C 292.505 375.155,107.065 375.063,93.960 371.361 C 69.326 364.401,49.250 348.011,38.291 325.912 C 28.442 306.052,28.289 304.302,28.235 211.074 L 28.188 130.201 200.000 130.201 L 371.812 130.201 371.765 211.074 M191.275 155.110 C 189.799 155.452,185.268 156.377,181.208 157.167 C 119.990 169.071,88.385 249.486,124.817 300.650 C 127.327 304.175,127.470 305.213,126.085 309.837 C 122.790 320.834,132.819 330.913,143.787 327.627 C 148.614 326.180,149.702 326.453,161.379 332.041 C 242.219 370.722,325.151 288.019,286.516 207.249 L 280.674 195.035 283.407 189.511 C 290.003 176.179,277.503 163.693,264.167 170.291 C 258.645 173.023,258.620 173.023,254.904 170.377 C 239.761 159.594,206.446 151.601,191.275 155.110 M218.448 185.798 C 226.150 187.849,237.584 193.002,237.584 194.423 C 237.584 197.509,148.810 283.721,147.529 281.879 C 116.137 236.750,164.372 171.402,218.448 185.798 M263.287 226.253 C 282.565 279.972,228.554 329.403,175.224 306.848 L 169.911 304.601 214.113 260.384 C 238.424 236.065,258.789 216.642,259.370 217.222 C 259.950 217.802,261.713 221.866,263.287 226.253 " stroke="none" fill="#f0f4f9" fillRule="evenodd"></path></g></svg>
        </div>
      </div>

    </div>
  );
}